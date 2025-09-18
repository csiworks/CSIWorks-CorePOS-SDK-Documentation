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
fun createAction(
        actionName: String,
        packageName: String,
        enabled: Boolean
    ): Action?
```

#### Parameters:
- `actionName`: The text displayed on the action button.  
- `packageName`: The package name of the 3rd-party app that created this action (i.e., action button owner).  
- `enabled`: Determines whether the action button is visible (`true`) or hidden/disabled (`false`).  


#### Returns:
`Action?`: The [`Action`](../models/models-action#action), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
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