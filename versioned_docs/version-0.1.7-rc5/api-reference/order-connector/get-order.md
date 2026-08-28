---
id: order-api-get-order
sidebar_position: 2
title: Get Order
description: Retrieve a single order by its unique identifier.
hide_title: true
---

## Get Order

**Purpose:** Retrieve a single order by its unique identifier.

### Signature:

```kotlin
fun getOrder(orderId: String): Order?
```

#### Parameters:

- `orderId` (String): UUID of the [Order](../models/order.md#order).

#### Returns:

`Order?`: the matching [Order](../models/order.md#order), or `null` if not found or on error.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
private fun loadOrder(orderId: String) {
    lifecycleScope.launch(Dispatchers.IO) {
        val order = orderConnector.getOrder(orderId)
        withContext(Dispatchers.Main) {
            if (order != null) {
                showOrderDetails(order)
            } else {
                showError("Order not found or failed to load")
            }
        }
    }
}
```

### Best Practice with Repository Pattern

```kotlin
interface OrderRepository {
    suspend fun getOrder(orderId: String): Order?
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun getOrder(orderId: String): Order? =
        try { orderConnector.getOrder(orderId) } 
        catch (_: Exception) { null }
}
```

