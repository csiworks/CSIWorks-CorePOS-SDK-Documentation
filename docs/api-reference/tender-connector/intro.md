---
id: tender-api-introduction
sidebar_position: 1
title: Introduction
description: Introduction to TenderConnector.
hide_title: true
pagination_prev: null
---

## Introduction

#### At a Glance
- **What it is:** A way to add a custom tender button to the CorePOS checkout screen that launches your app to process a payment.
- **Use cases:** EBT flows, external gateway integrations, loyalty/redemption, or any bespoke tender not covered by built‑in methods.
- **How it works:** CorePOS calls your app via an intent; your app triggers payment processing with parameters provided by your app in extras
  and returns a result with required extras. CorePOS then records the payment appropriately.


:::tip
Keep your payment Activity lightweight. Do SDK call on background threads and return promptly to avoid ANRs.
:::

### Integration Steps
#### Implement a Payment Activity
Create an Activity that will be launched by CorePOS to handle the payment. Register it in **AndroidManifest.xml** with the required intent filter:

```xml
<activity
    android:name=".YourPaymentActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="com.corepos.intent.action.MERCHANT_TENDER" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

:::note
`android:exported="true"` is required on Android 12+ for Activities with intent filters.
:::

In `YourPaymentActivity`, read the incoming extras from the launch intent, run your payment flow, and then return an **Activity result** with the appropriate response extras.

**Incoming extras (from CorePOS to your app)**
- `Intents.EXTRA_CASH_AMOUNT`(Long) — Total cash amount in the smallest currency unit (e.g., cents).
- `Intents.EXTRA_CARD_AMOUNT`(Long) — Total card amount in the smallest currency unit (e.g., cents).
- `Intents.EXTRA_CASH_TAX_AMOUNT`(Long) — Portion of the amount that is cash tax, in smallest unit.
- `Intents.EXTRA_CARD_TAX_AMOUNT`(Long) — Portion of the amount that is card tax, in smallest unit.
- `Intents.EXTRA_ORDER_ID`(String) — CorePOS order **UUID**.
- `Intents.EXTRA_TENDER`(Tender) — The [`Tender`](../models/models-tender#tender) record configured in CorePOS.
- `Intents.EXTRA_NOTE`(String, optional) —	Optional order notes.


#### Return Results to CorePOS
After executing your specific logic, finish your Activity with a result intent. CorePOS will then continue processing the payment. If successful, include the required and optional extras shown below. If cancelled or failed, return `RESULT_CANCELED` and (optionally) an error code/message.

**Outgoing extras (from your app back to CorePOS)**
##### Required:
- `Intents.EXTRA_AMOUNT`(Long) — Final amount in the smallest unit.
##### Optional:
- `Intents.EXTRA_TENDER_TYPE`(TenderType, enum) — Specify a concrete [`TenderType`](../models/models-tender#tendertype) (e.g., EBT). 
  - If omitted, CorePOS records it as a Custom Tender.
- `Intents.EXTRA_CLIENT_ID`(String) — Unique ID from your system (e.g., a payment or transaction ID).
- `Intents.EXTRA_NOTE`(String) — Notes about the payment.
- `Intents.EXTRA_TIP_AMOUNT`(Long) — Tip in smallest unit.
- `Intents.EXTRA_LINE_ITEM_IDS`(List(String)) — List of line item UUIDs.

**Success example:**
```kotlin
val resultIntent = Intent().apply {
    // Required
    putExtra(Intents.EXTRA_AMOUNT, amountApproved)

    // Optional
    putExtra(Intents.EXTRA_TENDER_TYPE, TenderType.EBT)
    putExtra(Intents.EXTRA_CLIENT_ID, UUID.randomUUID().toString())
    putExtra(Intents.EXTRA_NOTE, "Processed via custom tender")
    putExtra(Intents.EXTRA_TIP_AMOUNT, tipAmount)
}
setResult(Activity.RESULT_OK, resultIntent)
finish()
```

**Cancelled example:**
```kotlin
setResult(Activity.RESULT_CANCELED, Intent())
finish()
```

**(Optional) Failure with reason:**
```kotlin
val error = Intent().apply {
    putExtra(Intents.EXTRA_ERROR_CODE, "DECLINED")
    putExtra(Intents.EXTRA_ERROR_MESSAGE, "Issuer declined")
}
setResult(Activity.RESULT_CANCELED, error)
finish()
```

:::tip Recomended
Standardise your error codes/messages so merchants and support can quickly diagnose issues
::: 

#### Creating the Tender Button in CorePOS
Once your app is ready, create a corresponding [`Tender`](../models/models-tender#tender) in CorePOS using the SDK. This exposes a button on the checkout screen that launches your Activity.
```kotlin
val tenderConnector = TenderConnector(context)

val tender = tenderConnector.createTender(
    buttonTitle = "EBT",
    tenderName = "External EBT",
    packageName = "com.example.partnerapp",
    enabled = true,
    openCashDrawer = false
)
```

:::note
The `packageName` must match your Android application ID that contains `YourPaymentActivity`.
:::

####  API Reference
```kotlin
class TenderConnector(context: Context) : ServiceConnector<ITenderService>(context) {
    override fun getServiceInterface(iBinder: IBinder?): ITenderService

    fun createTender(
        buttonTitle: String,
        tenderName: String,
        packageName: String,
        enabled: Boolean,
        openCashDrawer: Boolean,
    ): Tender?

    fun getTenders(packageName: String): List<Tender>?

    fun updateTender(tender: Tender): Tender?
}
```

### TenderConnector Methods:
- [`Create Tender`](tender-api-create-tender) - Creates a custom tender button.
- [`Get Tenders`](tender-api-get-tenders) - Retrieves a list of available tenders for a given package name.
- [`Update Tender`](tender-api-update-tender) - Updates an existing tender's configuration.