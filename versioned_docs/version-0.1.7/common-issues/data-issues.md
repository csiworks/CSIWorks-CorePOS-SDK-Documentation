---
id: common-issues-data
sidebar_position: 2
title: Data Issues
description: Invalid values and empty results.
hide_title: true
---

## Data Issues

Troubleshooting guide for common data-related problems, such as invalid values, null results, or overly restrictive filters.

### Issue: Invalid price type errors

**Symptoms:**
- `IllegalArgumentException` thrown
- Error message: "Invalid price type"

**Cause:**
Invalid price type value passed to SDK methods.

**Solution:**
Use the `PriceType` enum to ensure valid values:

```kotlin
// ❌ Wrong - Using raw integer
val item = Item(
    name = "Product",
    priceType = 5, // Invalid value
    // ... other properties
)

// ✅ Correct - Using enum
val item = Item(
    name = "Product",
    priceType = PriceType.FIXED.code, // Valid value (0)
    // ... other properties
)

// Or validate before creating
val priceType = when (userInput) {
    "fixed" -> PriceType.FIXED.code
    "variable" -> PriceType.VARIABLE.code
    "per_unit" -> PriceType.PER_UNIT.code
    else -> throw IllegalArgumentException("Invalid price type: $userInput")
}
```

### Issue: Null or empty data returned

**Symptoms:**
- Methods return `null` or empty lists
- No error thrown but no data received

**Causes:**
1. No data available
2. Filter criteria too restrictive
3. Service connection issues

**Solutions:**

1. **Check for empty results:**
```kotlin
val items = inventoryConnector.getItems()
if (items.isNullOrEmpty()) {
    // Handle empty state
    showEmptyState()
} else {
    // Process items
    displayItems(items)
}
```

2. **Verify filter criteria:**
```kotlin
// Check if category exists before filtering
val categories = inventoryConnector.getCategories()
val targetCategory = categories?.find { it.name == "Electronics" }

if (targetCategory != null) {
    val filter = ItemFilter(categoryId = targetCategory.categoryId)
    val items = inventoryConnector.getItems(filter)
} else {
    // Category not found, show error
    showError("Category not found")
}
```

3. **Implement fallback logic:**
```kotlin
private suspend fun getItemsWithFallback(filter: ItemFilter?): List<Item> {
    return try {
        inventoryConnector.getItems(filter) ?: emptyList()
    } catch (e: Exception) {
        Log.e("Inventory", "Failed to get items with filter: ${e.message}")
        // Fallback to all items
        inventoryConnector.getItems() ?: emptyList()
    }
}
```