---
id: merchant-api
sidebar_position: 7
title: MerchantConnector
description: MerchantConnector reference for the CorePOS Android SDK.
hide_title: true
---

## Introduction

The `MerchantConnector` provides methods to interact with merchant data in the CorePOS system. The primary functionality includes retrieving merchant information through callbacks.

### Class Overview

```kotlin
class MerchantConnector(context: Context) : ServiceConnector<IMerchantService>(context)
```

### Initialization:

```kotlin
val merchantConnector = MerchantConnector(context)
```

## Get Merchant

**Purpose:** Retrieves the current merchant’s details from the CorePOS system.

### Signature:

```kotlin
fun getMerchant(): Merchant?
```

#### Parameters:

None.

#### Returns:

`Merchant?`: the [Merchant](models/merchant.md#merchant), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var merchantConnector: MerchantConnector
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        merchantConnector = MerchantConnector(this)
        
        // Get merchant info in background thread
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val merchant = merchantConnector.getMerchant()
                merchant?.let {
                    Log.d("CorePOS", "Store: ${it.name}")
                    Log.d("CorePOS", "Address: ${it.address1}")
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to get merchant: ${e.message}")
            }
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface MerchantRepository {
    suspend fun getMerchant(): Merchant?
}

class MerchantRepositoryImpl(
    private val merchantConnector: MerchantConnector
) : MerchantRepository {
    override suspend fun getMerchant(): Merchant? =
        try { merchantConnector.getMerchant() } 
        catch (_: Exception) { null }
}
```

