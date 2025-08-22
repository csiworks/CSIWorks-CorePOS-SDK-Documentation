---
id: models-order
sidebar_position: 3
title: Order
description: Order models.
hide_title: true
---

## Inventory models

This section covers all order models (entities) used in the API

### LineItemDiscount

The `LineItemDiscount` model represents a discount, applied to a single line item, containing the following fields:

- `lineItemDiscountId`: A unique **UUID** identifier for the line item discount.
- `name`: The name of the discount (e.g., "Holiday Sale").
- `discountType`: The type of discount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount discount.  
  - **PERCENTAGE**, Represents a percentage discount.  
- `amount`: The discount amount.
- `isActive`: A flag indicating whether the discount is currently active.

``` kotlin
@Parcelize
data class LineItemDiscount(
    val lineItemDiscountId: String?,
    val name: String,
    val discountType: Int,
    val amount: Long,
    val isActive: Boolean
) : Parcelable
```

### LineItemCharge

The `LineItemCharge` model represents taxes and fees, applied to a single line item, containing the following fields:

- `lineItemCharge`: A unique **UUID** identifier for the line item charge.
- `chargeId`: A unique **UUID** identifier for the charge. Reference to the corresponding inventory [**Charge**](models-inventory#charge).
- `name`: The name of the charge (e.g., "Sales Tax", "Shipping Fee").
- `chargeAmountType`: The type of charge amount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount, such as a flat fee.  
  - **PERCENTAGE**, Represents a percentage, such as a tax rate.
- `amount`: The amount of the charge.  
  - If the type is **FIXED**, it's a specific amount.  
  - If it's **PERCENTAGE**, it represents the percentage value.
- `isDefault`: A flag indicating whether this charge is the default charge.

```kotlin
@Parcelize
data class LineItemCharge(
    val lineItemChargeId: String?,
    val chargeId: String?, // Reference of Charge
    val name: String,
    val chargeAmountType: Int,
    val amount: Long,
    val isDefault: Boolean
) : Parcelable
```

### LineItem  

The `LineItem` model represents a purchased or selected item within an order, containing the following fields:

:::note Line Item Introduction
The LineItem can be thought of as an item placed on the checkout conveyor belt at a store.
:::

- `lineItemId`: A unique **UUID** identifier for the line item.  
- `quantity`: The quantity of the item in the line item (supports fractional values).  
- `totalCash`: The total cash price for the line item (after adjustments).  
- `totalCard`: The total card price for the line item (after adjustments).  
- `itemId`: A unique **UUID** identifier for the item. Reference to the corresponding inventory [**Item**](models-inventory#item).  
- `imagePath`: A path to the item's image.  
- `thumbnailPath`: A path to the item's thumbnail image.  
- `name`: The name of the item.  
- `priceType`: [**PriceType**](models-inventory#pricetype-enum), the type of pricing applied to this line item.  
- `unitType`: The unit type for the item (e.g., `Lb`, `Oz`, `Kg`).  
- `unitCash`: The cash price per unit of the item.  
- `unitCard`: The card price per unit of the item.  
- `lineItemDiscounts`: A list of [**LineItemDiscount**](#lineitemdiscount) applied to this line item.  
- `lineItemTaxes`: A list of [**LineItemCharge**](#lineitemcharge) with `amountType = Percentage`.  
- `lineItemFees`: A list of [**LineItemCharge**](#lineitemcharge) with `amountType = Fixed`.  
- `isEBT`: A flag indicating whether the line item is eligible for Electronic Benefit Transfer (EBT).  
- `devNotes`: A map of developer notes or metadata for debugging and custom usage.  

```kotlin
@Parcelize
data class LineItem(
    val lineItemId: String? = null, // UUID
    val quantity: Double,
    val totalCash: Long?,
    val totalCard: Long?,
    val itemId: String? = null, // Reference of Item
    val imagePath: String?,
    val thumbnailPath: String?,
    val name: String,
    val priceType: Int,
    val unitType: String?,
    val unitCash: Long?,
    val unitCard: Long?,
    val lineItemDiscounts: List<LineItemDiscount>,
    val lineItemTaxes: List<LineItemCharge>, // amountType = Percentage
    val lineItemFees: List<LineItemCharge>,  // amountType = Fixed
    val isEBT: Boolean,
    val devNotes: Map<String, String>?
) : Parcelable {

    fun getPriceType(): PriceType? {
        return PriceType from priceType
    }
}
```

### OrderDiscount  

The `OrderDiscount` model represents a discount applied at the **order level** (as opposed to line-item level), containing the following fields:

- `orderDiscountId`: A unique **UUID** identifier for the order discoun.  
- `discountId`: A unique **UUID** identifier for the discount. Reference to the corresponding inventory [**Discount**](models-inventory#discount). 
- `name`: The name of the discount (e.g., "Holiday Promo", "Employee Discount").  
- `discountType`: The type of discount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount discount.  
  - **PERCENTAGE**, Represents a percentage discount.  
- `amount`: The discount amount.
- `isActive`: A flag indicating whether the discount is currently active.

```kotlin
@Parcelize
data class OrderDiscount(
    val orderDiscountId: String?,
    val discountId: String?, // Reference of Discount
    val name: String,
    val discountType: Int,
    val amount: Long,
    val isActive: Boolean
) : Parcelable
```

### Order  

The `Order` model represents a order, containing the following fields:

- `orderId`: A unique **UUID** identifier for the order.  
- `customerId`: A unique **UUID** identifier. Reference to the customer who placed the order.  
- `items`: A list of [**LineItem**](#lineitem) objects included in the order.  
- `cashSubtotal`: The subtotal of the order when paid with cash (before discounts and taxes).  
- `cardSubtotal`: The subtotal of the order when paid with card (before discounts and taxes).  
- `ebtSubtotal`: The subtotal of the order eligible for **EBT** (Electronic Benefit Transfer).  
- `orderDiscounts`: A list of [**OrderDiscount**](#orderdiscount) applied to the order.  
- `cashTax`: The total tax applied when paying with cash.  
- `cardTax`: The total tax applied when paying with card.  
- `tipAmount`: The total tip amount added to the order.  
- `fee`: The total fees applied to the order (e.g., service fees).  
- `cashTotal`: The final total amount when paying with cash (subtotal + tax + fees - discounts).  
- `cardTotal`: The final total amount when paying with card (subtotal + tax + fees - discounts).  
- `ebtTotal`: The final total amount eligible for **EBT**.  
- `transactions`: A list of [**Transaction**](#transaction) objects associated with this order.  
- `state`: The current state of the order. Can be:  
  - `OPEN (0)` – Order is open and not yet paid.  
  - `PAID (1)` – Order is fully paid.  
  - `PARTIALLY_PAID (2)` – Order is partially paid.  
  - `PARTIALLY_REFUNDED (3)` – Order has been partially refunded.  
  - `REFUNDED (4)` – Order has been fully refunded.  
- `notes`: Optional notes or comments about the order.  
- `createdAt`: A timestamp (epoch) representing when the order was created.  

```kotlin
@Parcelize
data class Order(
    val orderId: String?,
    val customerId: String?,
    val items: List<LineItem>,
    val cashSubtotal: Long?,
    val cardSubtotal: Long?,
    val ebtSubtotal: Long,
    val orderDiscounts: List<OrderDiscount>?,
    val cashTax: Long?,
    val cardTax: Long?,
    val tipAmount: Long,
    val fee: Long,
    val cashTotal: Long?,
    val cardTotal: Long?,
    val ebtTotal: Long,
    val transactions: List<Transaction>?,
    val state: Int,
    val notes: String?,
    val createdAt: Long
) : Parcelable
```

### Transaction  

The `Transaction` model represents a financial operation related to an order, containing the following fields:

- `transactionId`: A unique **UUID** identifier for the transaction.  
- `orderId`: Reference to the [**Order**](#order) this transaction belongs to.  
- `transactionType`: The type of transaction. Can be: 
  - `SALE (0)` – A completed sale transaction.  
  - `VOID (1)` – A voided transaction (canceled before settlement).  
  - `REFUND (2)` – A refund transaction.  
- `paymentMethod`: The method of payment used. Can be: 
  - `CASH (0)` – Cash payment.  
  - `CREDIT_CARD (1)` – Credit card payment.  
  - `DEBIT_CARD (2)` – Debit card payment.  
  - `EBT_CARD (3)` – Electronic Benefit Transfer (EBT) card payment.  
- `amount`: The total transaction amount.  
- `taxAmount`: The portion of the transaction that is tax.  
- `cardNumber`: The masked card number (if applicable).  
- `cardType`: The type of card used if applicable.  
- `date`: A timestamp (epoch) representing when the transaction occurred.  

```kotlin
@Parcelize
data class Transaction(
    val transactionId: String?,
    val orderId: String?,
    val transactionType: Int,
    val paymentMethod: Int,
    val amount: Long,
    val taxAmount: Long,
    val cardNumber: String?,
    val cardType: String?,
    val date: Long
) : Parcelable
```