---
id: order-api-get-active-order
sidebar_position: 3
title: Get Active Order
description: Retrieve the order currently active in the POS session.
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

`Order?`: the active [Order](../models/order.md#order), or `null` if there is none or on error.

#### Error Handling:

Returns `null` on error.

### Example Usage

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

### Best Practice with Repository Pattern

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

