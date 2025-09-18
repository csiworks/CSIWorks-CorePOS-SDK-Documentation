---
id: action-api-introduction
sidebar_position: 1
title: Introduction
description: Introduction to ActionConnector.
hide_title: true
pagination_prev: null
---

## Introduction

The `ActionConnector` provides methods for managing **action buttons in the CorePOS system.
An [`Action`](../models/models-action#action) represents a custom button that appears on the CorePOS home screen.
These buttons allow third-party applications to launch their own logic when pressed.
Unlike **Tender Buttons, Action Buttons are one-way triggers** — they do **not** return data back to CorePOS.

### Integration Steps
#### Create and Register an Activity
Create an `Activity` in your app that will handle the custom logic. Register it in **AndroidManifest.xml** with the required intent filter:

```xml
<activity android:name=".YourActionActivity">
    <intent-filter>
        <action android:name="com.corepos.intent.action.MERCHANT_ACTION" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

#### Implement Logic
Inside `YourActionActivity`, implement the specific logic that should run when the action button is pressed.
No result data needs to be sent back to CorePOS — the action ends inside your app.

#### Creating Action Buttons with the SDK
After setting up your third-party app, you can create the corresponding action button in CorePOS using the `ActionConnector` API.

**Initialization**
```kotlin
val actionConnector = ActionConnector(context)
```

**Example: Create Action**
```kotlin
val action = actionConnector.createAction(
    actionName = "My Custom Action",
    packageName = context.packageName,
    enabled = true)
```

### ActionConnector Methods:
- [`Create Action`](action-api-create-action) - Creates a custom action button.
- [`Get Actions`](action-api-get-actions) - Retrieves a list of available actions for a given package name.
- [`Update Action`](action-api-update-action) - Updates an existing action's configuration.