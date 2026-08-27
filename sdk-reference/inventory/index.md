---
title: com.coreposnow.sdk.inventory
sidebar_label: inventory
sidebar_position: 2
---

# com.coreposnow.sdk.inventory

| Type | Description |
|---|---|
| [AmountType](amount-type.md) | Defines the different types of charge amounts used in the CorePOS SDK inventory, such as the [Charge.chargeAmountType](charge.md) field. |
| [Category](category.md) | Represents a category in the CorePOS inventory. Items may belong to one or more categories via [Item.categories](item.md). |
| [CategoryWithCount](category-with-count.md) | Represents a product category along with the number of items that belong to it. Returned by the CorePOS SDK when listing categories with their item counts. |
| [Charge](charge.md) | Represents taxes and fees associated with inventory items in the CorePOS SDK, such as the charges attached to an [Item](item.md) via [Item.charges](item.md). |
| [Discount](discount.md) | Represents a discount applied to items in the CorePOS inventory. |
| [EbtFlag](ebt-flag.md) | Represents the EBT (Electronic Benefit Transfer) eligibility status for an inventory item in the CorePOS SDK. |
| [Item](item.md) | Represents an inventory item in the CorePOS SDK. Items are the central entity of the inventory API and carry pricing, categorization, charge, and stock information. |
| [ItemFilter](item-filter.md) | Filtering criteria used when retrieving a list of items from the CorePOS inventory. All fields are optional; only the specified criteria are applied. |
| [ItemPageResult](item-page-result.md) | Represents a paginated response returned by the CorePOS SDK when fetching a list of items. Contains both the retrieved items and pagination metadata to manage navigation between pages. |
| [PriceType](price-type.md) | Defines the different types of pricing available for items in the CorePOS SDK inventory, such as the [Item.priceType](item.md) field. |
