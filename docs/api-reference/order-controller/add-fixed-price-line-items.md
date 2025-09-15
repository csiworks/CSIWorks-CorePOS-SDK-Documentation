---
id: order-api-add-fixed-price-line-items
sidebar_position: 6
title: Add Fixed-Price Line Items
description: Add multiple fixed-price line items to an order in a single operation.
hide_title: true
---

## Add Fixed-Price Line Items

**Purpose:** Add multiple fixed-price line items to an order in a single operation.

### Signature:

```kotlin
fun addFixedPriceLineItems(orderCode: String, items: List<FixedPriceItem>)
```

#### Parameters:
- `orderCode` (String): Unique **UUID** identifier of the [`Order`](../models/models-order#order).
- `items` (List(FixedPriceItem)): List of fixed-price items to add.

#### Data Classes:
```kotlin
data class FixedPriceItem(
    val itemId: String,
    val price: Double,
    val binName: String = ""
)
```

#### Returns:
Void (Unit) No return value is provided. The operation is asynchronous, and a callback is triggered to indicate success or failure.

#### Error Handling:
Triggers error callback on failure.

### Example Usage:
```kotlin
private fun addBulkFixedPriceItems(orderCode: String, itemData: List<Pair<String, Double>>) {
    lifecycleScope.launch(Dispatchers.IO) {
        val fixedPriceItems = itemData.map { (itemId, price) ->
            FixedPriceItem(itemId = itemId, price = price, binName = "BULK_BIN")
        }
        orderConnector.addFixedPriceLineItems(orderCode, fixedPriceItems)
        val updated = orderConnector.getOrder(orderCode)
        withContext(Dispatchers.Main) {
            updateOrderUI(updated)
        }
    }
}
```

### Best Practice with Repository Pattern::
```kotlin
interface OrderRepository {
    fun addFixedPriceLineItems(orderCode: String, items: List<FixedPriceItem>)
}

class OrderRepositoryImpl(
    private val orderConnector: OrderConnector
) : OrderRepository {
    override suspend fun addFixedPriceLineItems(orderCode: String, items: List<FixedPriceItem>): Boolean {
        return try {
            orderConnector.addFixedPriceLineItems(orderCode, items)
            true
        } catch (_: Exception) { false }
    }
}