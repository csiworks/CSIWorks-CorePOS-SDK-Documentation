---
id: installation
sidebar_position: 2
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation Guide

This guide will help you integrate the CorePOS Android SDK into your project.

## Prerequisites

Make sure your project meets these requirements:

- **Android Studio:** Latest stable
- **Android Gradle Plugin (AGP):** 8.x recommended
- **JDK:** 17 recommended (AGP 8+), SDK targets **Java 11** bytecode
- **Minimum SDK:** 21 (Android 5.0)
- **Target SDK:** 35
- **Kotlin:** 1.9.24+
- **CorePOS App:** Installed on the device and signed in

> **Note:** Use `compileOptions` / `kotlinOptions` to target Java 11 even if your build JDK is 17.

```kotlin title="android/build.gradle"
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = '11'
    }
}
```

## Installation Steps

### 1. Add Dependencies

Add the CorePOS SDK to your `app/build.gradle` file:

<Tabs>

<TabItem value="kts" label="Gradle (Kotlin)" default>

```kotlin title="android/build.gradle"
dependencies {
  implementation("com.coreposnow:sdk:0.1.4-RC1")
}
```
</TabItem> 

<TabItem value="```gradle" label="Gradle (Groovy)">

```gradle title="android/build.gradle"
dependencies {
  implementation 'com.coreposnow:sdk:0.1.4-RC1'
}
```

</TabItem> 

</Tabs>

### 2. Configure Build Variants

The SDK supports multiple build variants to connect to different CorePOS environments:

```kotlin title="android/build.gradle"
android {
    flavorDimensions "default"
    productFlavors {
        prod {
            dimension "default"
            // Connects to production CorePOS app
        }
        sandbox {
            dimension "default"
            // Connects to sandbox CorePOS app
        }
    }
}
```

### 3. Add Permissions

Add the following permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.BIND_SERVICE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### 4. Initialize SDK

Initialize the SDK in your Application class or main activity:

```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize CorePOS connectors
        val inventoryConnector = InventoryConnector(this)
        val orderConnector = OrderConnector(this)
        val merchantConnector = MerchantConnector(this)
        val tenderConnector = TenderConnector(this)
        val printerConnector = PrinterConnector(this)
    }
}
```

## Configuration

### Environment Selection

Choose the appropriate build variant based on your needs:

- **prod**: Production environment
- **sandbox**: Testing environment
- **dev**: Development environment

### Service Package Names

The SDK automatically connects to the correct CorePOS service based on the build variant:

- Production: `com.csiworks.corepos`
- Sandbox: `com.csiworks.corepos.sandbox`
- Development: `com.csiworks.corepos.dev`

## Verification

To verify the installation, run this simple test:

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Test connection
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val merchantConnector = MerchantConnector(this@MainActivity)
                val merchant = merchantConnector.getMerchant()
                Log.d("CorePOS", "Connection successful: ${merchant?.name}")
            } catch (e: Exception) {
                Log.e("CorePOS", "Connection failed: ${e.message}")
            }
        }
    }
}
```

## Troubleshooting

### Common Issues

1. **Service Not Found**: Ensure the CorePOS app is installed
2. **Permission Denied**: Check that all required permissions are granted
3. **Connection Timeout**: Verify network connectivity and service availability

### Next Steps

- [Quick Start Guide](quick-start/quick-guide-core-concepts)
- [API Reference](api-reference)