---
id: practices-security
sidebar_position: 4
title: Security Practices
description: Validation and safe data.
hide_title: true
---

## Security Best Practices

Guidelines for secure development: validate all input and handle data safely.

### Input Validation

Always validate input before passing to SDK:

```kotlin
object InputValidator {
    fun validateItem(item: Item): ValidationResult {
        return when {
            item.name.isBlank() -> ValidationResult.Error("Item name is required")
            item.unitCash != null && item.unitCash < 0 -> ValidationResult.Error("Price cannot be negative")
            item.priceType !in 0..2 -> ValidationResult.Error("Invalid price type")
            else -> ValidationResult.Success
        }
    }
    
    fun validateOrderParameters(orderId: String?, itemId: String?, quantity: Double): ValidationResult {
        return when {
            orderId.isNullOrBlank() -> ValidationResult.Error("Order ID is required")
            itemId.isNullOrBlank() -> ValidationResult.Error("Item ID is required")
            quantity <= 0 -> ValidationResult.Error("Quantity must be positive")
            else -> ValidationResult.Success
        }
    }
}

sealed class ValidationResult {
    object Success : ValidationResult()
    data class Error(val message: String) : ValidationResult()
}
```

### Secure Data Handling

Implement secure data handling practices:

```kotlin
class SecureDataManager {
    fun sanitizeItemData(item: Item): Item {
        return item.copy(
            name = item.name.trim(),
            productCode = item.productCode?.trim(),
            unitType = item.unitType?.trim()
        )
    }
    
    fun validateImageUri(uri: String?): Boolean {
        if (uri.isNullOrBlank()) return true
        
        return try {
            val parsedUri = Uri.parse(uri)
            parsedUri.scheme in listOf("content", "file")
        } catch (e: Exception) {
            false
        }
    }
}
```