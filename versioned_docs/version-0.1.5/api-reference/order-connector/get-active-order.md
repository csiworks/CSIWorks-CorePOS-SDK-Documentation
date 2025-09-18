---
id: order-api-get-active-order
sidebar_position: 3
title: Get Active Order
description: Retrieve the currently active order.
hide_title: true
---

## Get Active Order

**Purpose:** Retrieve the order currently active in the POS session.

### Signature:

```kotlin
fun getActiveOrder(): Order?
```

#### Parameters:
None.

#### Returns:
`Order?`: The [`Order`](../models/models-order#order), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
private fun loadActiveOrder() {
    lifecycleScope.launch(Dispatchers.IO) {
        val active = orderConnector.getActiveOrder()
        withContext(Dispatchers.Main) {
            updateActiveOrderUI(active)
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
    suspend fun getActiveOrder(): Order?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun getActiveOrder(): Order? =
        try { orderConnector.getActiveOrder() } 
        catch (_: Exception) { null }
}
```