---
id: models-action
sidebar_position: 5
title: Action
description: Action models.
hide_title: true
---

## Action Models

## Action
```kotlin
data class Action
```
The `Action` model represents a **custom action button** that appears on the checkout screen below the default payment methods, containing the following fields:  

### Values
- `uuid`: A unique **UUID** identifier for the action button.  
- `actionName`: The text displayed on the action button.  
- `packageName`: The package name of the 3rd-party app that created this action (i.e., action button owner).  
- `enabled`: Determines whether the action button is visible (`true`) or hidden/disabled (`false`).  