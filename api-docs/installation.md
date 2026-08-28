---
id: api-installation
sidebar_position: -1
title: Installation
description: Add the generated Kotlin/Java API client to a Gradle or Maven project and make an authenticated call.
hide_title: true
---

## Installation

The API client is generated from the same specification this documentation is built from and published to
Maven Central as `net.csiworks.corepos:corepos-api-client-kotlin`. Its version tracks the API release:
final versions such as `1.8.1` come from production, `-rcN` versions from sandbox.

### Gradle (Kotlin DSL)

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    implementation("net.csiworks.corepos:corepos-api-client-kotlin:1.8.1-rc6")
}
```

### Gradle (Groovy)

```groovy
repositories {
    mavenCentral()
}

dependencies {
    implementation 'net.csiworks.corepos:corepos-api-client-kotlin:1.8.1-rc6'
}
```

### Maven

```xml
<dependency>
    <groupId>net.csiworks.corepos</groupId>
    <artifactId>corepos-api-client-kotlin</artifactId>
    <version>1.8.1-rc6</version>
</dependency>
```

Retrofit, OkHttp, Gson and the Kotlin coroutines runtime come in transitively; no other setup is needed.

### Creating a client

`ApiClient` builds the service interfaces. It defaults to production
(`https://api.coreposnow.com`), so a production integration only supplies the merchant's access token:

```kotlin
import com.coreposnow.sdk.rest.api.ItemsApi
import com.coreposnow.sdk.rest.infrastructure.ApiClient

val client = ApiClient(authName = "bearerAuth", bearerToken = accessToken)

val itemsApi = client.createService(ItemsApi::class.java)
```

To work against sandbox, pass the base URL explicitly:

```kotlin
val client = ApiClient(
    baseUrl = "https://api-sandbox.coreposnow.com",
    authName = "bearerAuth",
    bearerToken = accessToken,
)
```

The default can also be overridden without touching the call sites, which is convenient for running a
test suite against sandbox:

```
-Dcom.coreposnow.sdk.rest.baseUrl=https://api-sandbox.coreposnow.com
```

One service interface exists per section of this documentation — `ItemsApi`, `CategoriesApi`,
`OrdersApi`, `TransactionsApi`, `MerchantsApi`, `ChargesApi`, `DiscountsApi`, `TipSettingsApi`,
`DualPricingApi`, `AppsApi` and `OAuth2Api`.

### Making a call

Every operation is a `suspend` function returning a Retrofit `Response`, so calls belong in a coroutine
and the HTTP status is yours to inspect:

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

suspend fun loadItems(): List<ItemDto> = withContext(Dispatchers.IO) {
    val response = itemsApi.listItems(page = 0, size = 50)
    if (!response.isSuccessful) {
        error("Failed to list items: ${response.code()}")
    }
    response.body()?.content.orEmpty()
}
```

Refreshing an expired token is the caller's job: when a request comes back `401`, call
[Refresh access token](./refresh-access-token.api.mdx) and rebuild the client — or call
`client.setBearerToken(newToken)` — before retrying.

### Using it from Java

The artifact is an ordinary JVM library and its model classes are usable from Java directly. The service
interfaces, however, are generated as Kotlin `suspend` functions, which Java cannot call idiomatically —
each would require passing a `Continuation` by hand. For a Java codebase, either keep the call sites in
Kotlin (the two languages mix freely in one module) or call the REST endpoints directly with your own
HTTP client, using this documentation as the contract.
