---
id: action-api-update-action
sidebar_position: 4
title: Update Action
description: Update an existing action.
hide_title: true
---

## Update Action

**Purpose:** Update an existing action.

### Signature:

```kotlin
updateAction(action: Action): Action?
```

#### Parameters:
`action`: The [`Action`](../models/models-action#action) object to update.

#### Returns:
`Action?`: Updated [`Action`](../models/models-action#action), or `null` if the operation fails.

#### Error Handling:
Returns `null` on error.

### Example Usage:
```kotlin
  fun updateActionMethod(action: Action) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val updatedAction = actionConnector.updateAction(action)

                withContext(Dispatchers.Main) {
                    updatedAction?.let { onActionUpdated(it) }
                }
            } catch (e: Exception) {
                Log.e("CorePOS", "Failed to update action: ${e.message}")
            }
        }
    }
```