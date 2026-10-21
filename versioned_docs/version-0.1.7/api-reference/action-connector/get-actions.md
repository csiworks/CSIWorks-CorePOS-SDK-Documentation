---
id: action-api-get-actions
sidebar_position: 3
title: Get Actions
description: Retrieve all actions created by the specified package (or that package is associated with).
hide_title: true
---

## Get Actions

**Purpose:** Retrieve all actions created by the specified package (or that package is associated with).

### Signature:

```kotlin
fun getActions(packageName: String): List<Action>?
```

#### Parameters:

- `packageName` (String): package name of the app whose actions to fetch.

#### Returns:

`List<Action>?`: the list of matching actions, or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

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

