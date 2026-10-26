---
id: api-webhooks
title: Webhooks
description: Subscribe to changes of a merchant's data and verify the requests CorePOS sends to your app.
hide_title: true
---

## Webhooks

Instead of polling, your app can have CorePOS tell it about changes as they happen. Every committed change to an
item, an order, an employee or the app's own installation becomes one event, whatever made it — the POS device, the
back office, another app or CorePOS itself. Each event is sent to your app's webhook URL as a signed `POST`.

The events, their bodies and the authority each one requires are listed under **Webhook events**, starting with
[Item created](./item-created.api.mdx).

### Subscribing

An app has one subscription, set with [Set webhook subscription](./set-webhook-subscription.api.mdx). It covers every
merchant that installed the app: each event names the merchant in `merchantId`. Call it with the access token of any
merchant that installed the app:

```kotlin
import com.coreposnow.sdk.rest.api.WebhookSubscriptionApi
import com.coreposnow.sdk.rest.model.WebhookSubscriptionSaveDto

val subscriptionApi = client.createService(WebhookSubscriptionApi::class.java)

val subscription = subscriptionApi.setWebhookSubscription(
    WebhookSubscriptionSaveDto(
        url = "https://app.example.com/corepos/webhooks",
        events = setOf(
            WebhookSubscriptionSaveDto.Events.ITEM_UPDATED,
            WebhookSubscriptionSaveDto.Events.ORDER_CREATED,
        ),
        isActive = true,
    )
).body()!!

// Store it with your app's configuration: every request CorePOS sends is signed with it.
val secret = subscription.secret
```

- The URL must use HTTPS.
- Each event needs the authority to read what it is about: **ITEM READ** for item events, **ORDER READ** for order
  events, **EMPLOYEE READ** for employee events. Asking for an event the app lacks the authority for is answered
  with `403`, naming the events. App events need no authority and are only ever about the app itself.
- A new subscription receives the events that happen from then on.
- Setting the subscription again replaces its URL and events and keeps its secret.
  [Get webhook subscription](./get-webhook-subscription.api.mdx) returns it, secret included.
- `isActive = false` pauses delivery. The events that happen meanwhile are sent once the subscription is active again.

### Receiving an event

Each request carries one event as a JSON body, plus three headers:

| Header | Content |
|---|---|
| `X-CorePOS-Event-Id` | The `id` of the event. |
| `X-CorePOS-Timestamp` | When the request was signed, in seconds since the epoch. |
| `X-CorePOS-Signature` | `v1=` and the hex HMAC-SHA256 of `<timestamp>.<raw body>`, keyed with the subscription secret. |

Verify every request before trusting it. Compute the signature over the raw body exactly as received, before any
JSON parsing, and compare in constant time:

```kotlin
import java.security.MessageDigest
import java.time.Instant
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

fun isFromCorePos(secret: String, timestamp: String, signature: String, rawBody: ByteArray): Boolean {
    val signedAt = timestamp.toLongOrNull() ?: return false
    if (Math.abs(Instant.now().epochSecond - signedAt) > 300) return false

    val mac = Mac.getInstance("HmacSHA256")
    mac.init(SecretKeySpec(secret.toByteArray(Charsets.UTF_8), "HmacSHA256"))
    mac.update("$timestamp.".toByteArray(Charsets.UTF_8))
    val expected = "v1=" + mac.doFinal(rawBody).joinToString("") { "%02x".format(it) }

    return MessageDigest.isEqual(expected.toByteArray(Charsets.UTF_8), signature.toByteArray(Charsets.UTF_8))
}
```

The body tells you what happened and to which entity:

```json
{
  "id": "1d3a0e61-f16d-5dfc-ada2-beb4becc1d3a",
  "type": "item.updated",
  "entityType": "item",
  "entityId": "e42c7662-902c-41d7-9c3c-ea8f567e74d2",
  "createdAt": 1793016987864,
  "merchantId": "6aa9a46e-9fea-454f-b52f-05877a569275",
  "source": "ANDROID",
  "data": { "itemId": "e42c7662-902c-41d7-9c3c-ea8f567e74d2", "name": "Coffee, large", "...": "..." }
}
```

- `data` is the entity after the change, in the same shape the API returns it. It is absent when the entity no
  longer exists, such as the second `item.deleted` of an item that was purged.
- `source` says who made the change: `ANDROID`, `WEB`, `THIRD_PARTY_APP`, `SERVER_TO_SERVER`, `ADMIN` or `SYSTEM`.
  Changes your own app made through the API arrive too, with source `THIRD_PARTY_APP`.
- `createdAt` is when the change was committed, in milliseconds since the epoch.

### Answering, retries and ordering

Answer with any `2xx` status within 3 seconds, and do the work afterwards: put the event on a queue rather than
calling back into the API before you answer.

- Any other status, a timeout or a connection error is a failure. The event is sent again after 10 seconds, then
  after a delay that doubles each time, up to an hour.
- Events reach your app in the order they were committed. While an event keeps failing, the events after it wait.
- After 10 failures in a row the subscription is suspended. Setting it again resumes it, from the event that failed.
- An event can arrive more than once, always with the same `id`. Keep the ids you processed and drop repeats.
