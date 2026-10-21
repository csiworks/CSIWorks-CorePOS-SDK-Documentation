---
id: common-issues-connecting
sidebar_position: 1
title: Connection Issues
description: Common connection-related errors and fixes.
pagination_prev: null
hide_title: true
---

## Connection Issues

Troubleshooting guide for typical connection-related problems, including main thread calls, binding errors, and permission issues.

:::caution Important Notes
- **All SDK operations must be called from background threads**
- The SDK will throw `IllegalStateException` if called from the main thread
- Use `lifecycleScope.launch(Dispatchers.IO)` for SDK operations
:::

### Issue: "Cannot call service methods from the main thread"

**Symptoms:**
- App crashes with `IllegalStateException`
- Error message: "Cannot call service methods from the main thread"

**Cause:**
SDK methods are being called from the main/UI thread.

**Solution:**
Always call SDK methods from a background thread:

```kotlin
// ❌ Wrong - Called from main thread
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val items = inventoryConnector.getItems() // This will crash!
}

// ✅ Correct - Called from background thread
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    lifecycleScope.launch(Dispatchers.IO) {
        val items = inventoryConnector.getItems()
    }
}
```

### Issue: "Could not bind to Android service"

**Symptoms:**
- `BindingException` thrown
- Error message: "Could not bind to Android service"

**Causes:**
1. CorePOS app not installed
2. CorePOS service not running
3. Incorrect package name configuration

**Solutions:**

1. **Check if CorePOS app is installed:**
```kotlin
private fun isCorePOSInstalled(): Boolean {
    return try {
        packageManager.getPackageInfo("com.csiworks.corepos", 0)
        true
    } catch (e: PackageManager.NameNotFoundException) {
        false
    }
}
```

2. **Verify package name configuration:**
```kotlin
// Check your build.gradle configuration
android {
    productFlavors {
        prod {
            buildConfigField "String", "COREPOS_PACKAGE", "\"com.csiworks.corepos\""
        }
        sandbox {
            buildConfigField "String", "COREPOS_PACKAGE", "\"com.csiworks.corepos.sandbox\""
        }
    }
}
```

3. **Implement retry logic:**
```kotlin
private suspend fun connectWithRetry(maxAttempts: Int = 3): Boolean {
    repeat(maxAttempts) { attempt ->
        try {
            val merchant = merchantConnector.getMerchant()
            return true
        } catch (e: BindingException) {
            if (attempt == maxAttempts - 1) throw e
            delay(1000L * (attempt + 1)) // Exponential backoff
        }
    }
    return false
}
```

### Issue: "Permission denied" errors

**Symptoms:**
- `PermissionDeniedException` thrown
- Error message: "Permission denied"

**Causes:**
1. Missing `BIND_SERVICE` permission
2. User denied permissions
3. App not authorized to access CorePOS

**Solutions:**

1. **Add required permissions to AndroidManifest.xml:**
```xml
<uses-permission android:name="android.permission.BIND_SERVICE" />
<uses-permission android:name="android.permission.INTERNET" />
```

2. **Request permissions at runtime:**
```kotlin
private fun requestPermissions() {
    if (ContextCompat.checkSelfPermission(this, 
        Manifest.permission.BIND_SERVICE) != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(this, 
            arrayOf(Manifest.permission.BIND_SERVICE), PERMISSION_REQUEST_CODE)
    }
}

override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == PERMISSION_REQUEST_CODE) {
        if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            // Permission granted, proceed with SDK operations
            initializeCorePOS()
        } else {
            // Permission denied, show explanation
            showPermissionExplanationDialog()
        }
    }
}
```