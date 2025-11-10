---
id: practices-error-handling
sidebar_position: 3
title: Error Handling
description: Centralized handling and retries.
hide_title: true
---

## Error Handling Best Practices

Guidelines for managing errors: use centralized handling and implement robust retry logic.

:::caution Important Notes
- Always wrap SDK calls in try-catch blocks
- Handle specific exceptions: `PermissionDeniedException`, `BindingException`, `IllegalArgumentException`
- Implement retry logic for transient errors
:::

### Centralized Error Handling

Create a centralized error handling system:

```kotlin
sealed class CorePOSResult<out T> {
    data class Success<T>(val data: T) : CorePOSResult<T>()
    data class Error(val exception: Throwable) : CorePOSResult<Nothing>()
}

class CorePOSErrorHandler {
    companion object {
        fun handleError(throwable: Throwable, context: Context) {
            when (throwable) {
                is PermissionDeniedException -> {
                    showPermissionDialog(context)
                }
                is BindingException -> {
                    showConnectionDialog(context)
                }
                is IllegalArgumentException -> {
                    showValidationDialog(context, throwable.message)
                }
                else -> {
                    Log.e("CorePOS", "Unexpected error: ${throwable.message}")
                    showGenericError(context)
                }
            }
        }
        
        private fun showPermissionDialog(context: Context) {
            // Show permission request dialog
        }
        
        private fun showConnectionDialog(context: Context) {
            // Show connection error dialog
        }
        
        private fun showValidationDialog(context: Context, message: String?) {
            // Show validation error dialog
        }
        
        private fun showGenericError(context: Context) {
            // Show generic error dialog
        }
    }
}
```

### Retry Logic

Implement robust retry logic:

```kotlin
class RetryManager {
    suspend fun <T> retry(
        maxAttempts: Int = 3,
        initialDelay: Long = 1000L,
        maxDelay: Long = 10000L,
        factor: Double = 2.0,
        block: suspend () -> T
    ): T {
        var currentDelay = initialDelay
        repeat(maxAttempts) { attempt ->
            try {
                return block()
            } catch (e: Exception) {
                if (attempt == maxAttempts - 1) throw e
                
                if (e is BindingException || e is PermissionDeniedException) {
                    delay(currentDelay)
                    currentDelay = (currentDelay * factor).toLong().coerceAtMost(maxDelay)
                } else {
                    throw e // Don't retry for non-transient errors
                }
            }
        }
        throw IllegalStateException("Retry exhausted")
    }
}
```