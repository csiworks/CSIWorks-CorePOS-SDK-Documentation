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
fun updateAction(action: Action): Action?
```

#### Parameters:

- `action` (Action): action with updated values; matched by its identifier.

#### Returns:

`Action?`: the updated [Action](../models/action.md#action), or `null` on failure.

#### Error Handling:

Returns `null` on error.

### Example Usage

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

