---
id: common-issues-debugging-tips
sidebar_position: 4
title: Debugging Tips
description: Logging, status checks, and diagnostics.
hide_title: true
---

## Debugging Tips

Practical tips to debug CorePOS integration: enable logging, check service status, and run network diagnostics.

:::info Look at this first

### Threading
- **All SDK operations must be called from background threads**
- The SDK will throw `IllegalStateException` if called from the main thread
- Use `lifecycleScope.launch(Dispatchers.IO)` for SDK operations

### Error Handling
- Always wrap SDK calls in try-catch blocks
- Handle specific exceptions: `PermissionDeniedException`, `BindingException`, `IllegalArgumentException`
- Implement retry logic for transient errors

### Lifecycle Management
- Store connectors as class properties
- Call `disconnect()` when done to clean up resources
- Handle configuration changes properly

:::

### Enable Debug Logging

Add debug logging to track SDK operations:

```kotlin
object CorePOSDebug {
    private const val TAG = "CorePOS"
    private var isDebugEnabled = BuildConfig.DEBUG
    
    fun log(message: String) {
        if (isDebugEnabled) {
            Log.d(TAG, message)
        }
    }
    
    fun logError(message: String, throwable: Throwable? = null) {
        if (isDebugEnabled) {
            Log.e(TAG, message, throwable)
        }
    }
    
    fun enableDebug(enabled: Boolean) {
        isDebugEnabled = enabled
    }
}
```

### Check Service Status

Create a utility to check CorePOS service status:

```kotlin
object CorePOSStatusChecker {
    fun checkServiceStatus(context: Context): ServiceStatus {
        return try {
            // Try to get merchant info as a health check
            val merchantConnector = MerchantConnector(context)
            val merchant = merchantConnector.getMerchant()
            if (merchant != null) {
                ServiceStatus.Connected
            } else {
                ServiceStatus.NoData
            }
        } catch (e: BindingException) {
            ServiceStatus.NotConnected
        } catch (e: PermissionDeniedException) {
            ServiceStatus.NoPermission
        } catch (e: Exception) {
            ServiceStatus.Unknown(e.message)
        }
    }
}

sealed class ServiceStatus {
    object Connected : ServiceStatus()
    object NotConnected : ServiceStatus()
    object NoPermission : ServiceStatus()
    object NoData : ServiceStatus()
    data class Unknown(val message: String?) : ServiceStatus()
}
```