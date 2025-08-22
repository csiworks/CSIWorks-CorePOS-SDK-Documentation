---
id: merchant-api
sidebar_position: 6
title: MerchantConnector
description: How to utilize all MerchantConnector functionality.
hide_title: true
---

## Introduction
The `MerchantConnector` provides methods to interact with merchant data in the CorePOS system. The primary functionality includes retrieving merchant information through callbacks.

### Class Overview

```kotlin
class MerchantConnector(context: Context) : ServiceConnector<IMerchantService>(context) {

    override fun getServiceInterface(iBinder: IBinder?): IMerchantService { /* ... */ }

    fun getMerchant(): Merchant? = /* ... */
}
```

**Purpose:** Manages merchant operations like retrieving merchant details.

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
`Merchant?`: The inventory [`Merchant`](models/models-merchant#merchant), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
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

### Best Practice with Repository Pattern::
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