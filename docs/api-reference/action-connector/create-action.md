---
id: action-api-create-action
sidebar_position: 2
title: Create Action
description: Create a new custom action button.
hide_title: true
---

## Create Action

**Purpose:** Create a new custom action button.

### Signature:

```kotlin
fun createAction(actionName: String, packageName: String, enabled: Boolean): Action?
```

#### Parameters:

- `actionName` (String): display name of the action.
- `packageName` (String): package name of the app that owns the action.
- `enabled` (Boolean): whether the action is initially enabled.

#### Returns:

`Action?`: the created [Action](../models/action.md#action), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

```kotlin
    fun createActionMethod(
        actionName: String,
        enabled: Boolean = true
    ) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val action = actionConnector.createAction(
                    actionName = actionName,
                    packageName = context.packageName,
                    enabled = enabled
                )

                withContext(Dispatchers.Main) {
                    action?.let { onActionCreated(it) }
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to create action: ${e.message}")
            }
        }
    }
```

