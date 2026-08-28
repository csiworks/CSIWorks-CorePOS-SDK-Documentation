---
title: Employee
sidebar_label: Employee
slug: /order/employee
---

# Employee

```kotlin
data class Employee(val employeeId: String?, val name: String?, val email: String) : Parcelable
```

Represents an employee record in the CorePOS SDK, containing identifying and contact information. Used on [Order](order.md) and [Transaction](transaction.md) to indicate the employee who carried out or processed the operation.

## Properties

| Name | Type | Description |
|---|---|---|
| `email` | `String` | The employee's email address. |
| `employeeId` | `String?` | A unique UUID identifier for the employee. |
| `name` | `String?` | The full name of the employee. May be null if not provided. |

