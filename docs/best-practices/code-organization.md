---
id: practices-code-organization
sidebar_position: 6
title: Code Organization
description: Packages and naming.
hide_title: true
---

## Code Organization

Guidelines for structuring code: organize packages logically and follow consistent naming conventions.

### Package Structure

Organize code into logical packages:

```
com.yourapp.corepos/
├── data/
│   ├── repository/
│   │   ├── InventoryRepository.kt
│   │   ├── OrderRepository.kt
│   │   └── MerchantRepository.kt
│   ├── model/
│   │   ├── Item.kt
│   │   ├── Order.kt
│   │   └── Merchant.kt
│   └── local/
│       └── CorePOSDatabase.kt
├── domain/
│   ├── usecase/
│   │   ├── GetItemsUseCase.kt
│   │   ├── CreateOrderUseCase.kt
│   │   └── ProcessPaymentUseCase.kt
│   └── model/
│       └── CorePOSResult.kt
├── presentation/
│   ├── viewmodel/
│   │   ├── InventoryViewModel.kt
│   │   └── OrderViewModel.kt
│   ├── ui/
│   │   ├── InventoryActivity.kt
│   │   └── OrderActivity.kt
│   └── adapter/
│       └── ItemAdapter.kt
└── di/
    └── CorePOSModule.kt
```

### Naming Conventions

Follow consistent naming conventions:

```kotlin
// Connectors
val inventoryConnector: InventoryConnector
val orderConnector: OrderConnector
val merchantConnector: MerchantConnector

// Repositories
val inventoryRepository: InventoryRepository
val orderRepository: OrderRepository

// ViewModels
val inventoryViewModel: InventoryViewModel
val orderViewModel: OrderViewModel

// Use cases
val getItemsUseCase: GetItemsUseCase
val createOrderUseCase: CreateOrderUseCase

// Constants
const val CORE_POS_TAG = "CorePOS"
const val INVENTORY_SYNC_WORK_NAME = "inventory_sync"
```