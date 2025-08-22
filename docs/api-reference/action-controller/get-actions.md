---
id: action-api-get-actions
sidebar_position: 3
title: Get Actions
description: Retrieve the list of actions.
hide_title: true
---

## Get Actions

**Purpose:** Retrieve all actions created by the specified package (or that package is associated with).

### Signature:

```kotlin
getActions(packageName: String): List<Action>?
```

#### Parameters:
`packageName`(String): Application package to filter actions by.

#### Returns:
`List<Action>?`: The list of [`Action`](../models/models-action#action), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
    private fun loadActionMethods() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val actions = actionConnector.getActions(context.packageName)
                withContext(Dispatchers.Main) {
                    displayActions(actions ?: emptyList())
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to load actions: ${e.message}")
            }
        }
    }
```