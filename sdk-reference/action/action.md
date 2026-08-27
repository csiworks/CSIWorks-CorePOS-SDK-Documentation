---
title: Action
sidebar_label: Action
---

# Action

```kotlin
data class Action(
    val uuid: String,
    val actionName: String,
    val packageName: String,
    val enabled: Boolean
) : Parcelable
```

Represents a custom action button that appears on the CorePOS home screen (landscape) and cart screen (portrait) top bar. Custom actions allow 3rd-party applications to be launched directly from the CorePOS UI.

## Properties

| Name | Type | Description |
|---|---|---|
| `actionName` | `String` | The text displayed on the action button. |
| `enabled` | `Boolean` | Determines whether the action button is visible (`true`) or hidden/disabled (`false`). |
| `packageName` | `String` | The package name of the 3rd-party app that created this action (i.e., action button owner). |
| `uuid` | `String` | A unique UUID identifier for the action button. |

