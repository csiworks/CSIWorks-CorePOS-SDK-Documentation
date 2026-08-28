---
title: ActionConnector
sidebar_label: ActionConnector
---

# ActionConnector

```kotlin
class ActionConnector(context: Context) : ServiceConnector<…>
```

Connector for managing custom merchant actions registered in the CorePOS application.

Actions appear as custom buttons/behaviors inside CorePOS and are associated with the registering app's package name. All methods must be called from a background thread.

```kotlin
lifecycleScope.launch(Dispatchers.IO) {
    val action = ActionConnector(context).createAction(
        actionName = "Loyalty check",
        packageName = context.packageName,
        enabled = true,
    )
}
```

When the merchant triggers the action, CorePOS broadcasts [com.coreposnow.sdk.utils.Intents.ACTION_MERCHANT_ACTION](../utils/intents.md).

**See also:**

- [Action](../action/action.md)
- [Intents](../utils/intents.md)

| Constructor parameter | Description |
|---|---|
| `context` | context used to bind to the CorePOS action service. |

## Functions

### createAction

```kotlin
fun createAction(actionName: String, packageName: String, enabled: Boolean): Action?
```

Registers a new custom action in CorePOS.

| Parameter | Description |
|---|---|
| `actionName` | display name of the action. |
| `packageName` | package name of the app that owns the action. |
| `enabled` | whether the action is initially enabled. |

**Returns:** the created [Action](../action/action.md), or `null` on failure.

### getActions

```kotlin
fun getActions(packageName: String): List<Action>?
```

Retrieves all actions registered by the given app.

| Parameter | Description |
|---|---|
| `packageName` | package name of the app whose actions to fetch. |

**Returns:** the list of matching actions, or `null` on failure.

### updateAction

```kotlin
fun updateAction(action: Action): Action?
```

Updates an existing action (e.g., its name or enabled state).

| Parameter | Description |
|---|---|
| `action` | action with updated values; matched by its identifier. |

**Returns:** the updated [Action](../action/action.md), or `null` on failure.

