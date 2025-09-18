---
id: models-order
sidebar_position: 3
title: Order
description: Order models.
hide_title: true
---

## Order Models

This section covers all order models (entities) used in the API

## LineItemDiscount
```kotlin
data class LineItemDiscount
```
The `LineItemDiscount` model represents a discount, applied to a single line item, containing the following fields:

### Values
- `lineItemDiscountId`: A unique **UUID** identifier for the line item discount.
- `name`: The name of the discount (e.g., "Holiday Sale").
- `discountType`: The type of discount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount discount.  
  - **PERCENTAGE**, Represents a percentage discount.  
- `amount`: The discount amount.
- `isActive`: A flag indicating whether the discount is currently active.

## LineItemCharge
```kotlin
data class LineItemCharge
```
The `LineItemCharge` model represents taxes and fees, applied to a single line item, containing the following fields:

### Values
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

## LineItem
```kotlin
data class LineItem
```
The `LineItem` model represents a purchased or selected item within an order, containing the following fields:

:::note Line Item Introduction
The LineItem can be thought of as an item placed on the checkout conveyor belt at a store.
:::

### Values
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
- `lineItemPayment`: The payment method associated with this line item.  
- `isEBT`: A flag indicating whether the line item is eligible for Electronic Benefit Transfer (EBT).  
- `devNotes`: A map of developer notes or metadata for debugging and custom usage.  
- `binName`: A specific identifier for categorizing items in an order. This is the general name of a specific group of items, united by some logic (e.g., "EBT Items").  
- `taxable`: A flag indicating whether the line item is subject to taxes.

## LineItemBuilder
```kotlin
class LineItemBuilder
```
The `LineItemBuilder` class provides a fluent interface for creating and modifying `LineItem` objects with validation and utility methods.

### Factory Methods
- `create()` - Creates a new empty builder instance
- `from(lineItem)` - Creates a builder from an existing LineItem
- `variablePrice(itemId, name, cashPrice, devNotes?, binName?)` - Creates a variable price line item
- `perUnit(itemId, name, quantity, unitPrice, devNotes?, binName?)` - Creates a per-unit line item
- `fixedPrice(itemId, name, devNotes?, binName?)` - Creates a fixed price line item

### Builder Methods
**Basic Setters:**
- `setLineItemId(String?)` - Set line item ID
- `setQuantity(Double)` - Set item quantity
- `setTotalCash(Long?)` - Set total cash price
- `setTotalCard(Long?)` - Set total card price
- `setItemId(String?)` - Set item reference ID
- `setName(String)` - Set item name
- `setPriceType(Int)` - Set pricing type
- `setLineItemPayment(String?)` - Set payment method
- `setEBT(Boolean)` - Set EBT eligibility
- `setBinName(String?)` - Set category identifier
- `setTaxable(Boolean)` - Set tax eligibility

**Collection Methods:**
- `addDiscount(LineItemDiscount)` - Add a discount
- `addTax(LineItemCharge)` - Add a tax
- `addFee(LineItemCharge)` - Add a fee
- `addDevNote(String, String)` - Add developer note
- `removeDiscount(String)` - Remove discount by ID
- `removeTax(String)` - Remove tax by ID
- `removeFee(String)` - Remove fee by ID
- `clearDiscounts()` - Remove all discounts
- `clearTaxes()` - Remove all taxes
- `clearFees()` - Remove all fees

**Build Methods:**
- `build()` - Build and validate LineItem (throws on error)
- `buildOrNull()` - Build LineItem, return null on error
- `isValid()` - Check if current state is valid
- `getValidationErrors()` - Get list of validation errors

## OrderDiscount
```kotlin
data class OrderDiscount
```
The `OrderDiscount` model represents a discount applied at the **order level** (as opposed to line-item level), containing the following fields:

### Values
- `orderDiscountId`: A unique **UUID** identifier for the order discount.  
- `discountId`: A unique **UUID** identifier for the discount. Reference to the corresponding inventory [**Discount**](models-inventory#discount). 
- `name`: The name of the discount (e.g., "Holiday Promo", "Employee Discount").  
- `discountType`: The type of discount. Can be `FIXED (0)` or `PERCENTAGE (1)`.
  - **FIXED**, Represents a fixed amount discount.  
  - **PERCENTAGE**, Represents a percentage discount.  
- `amount`: The discount amount.
- `isActive`: A flag indicating whether the discount is currently active.

## Order
```kotlin
data class Order
```
The `Order` model represents a order, containing the following fields:

### Values
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

## Transaction
```kotlin
data class Transaction
```
The `Transaction` model represents a financial operation related to an order, containing the following fields:

### Values
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

## LineItemUtils
```kotlin
object LineItemUtils
```
The `LineItemUtils` object provides utility functions for common LineItem operations.

### Available Methods
- `updateQuantity(lineItem, newQuantity)` - Updates quantity and recalculates totals
- `updateUnitPrice(lineItem, newUnitPrice)` - Updates unit price and recalculates totals
- `addDiscount(lineItem, name, amount, type)` - Adds a discount to the line item
- `removeDiscount(lineItem, discountName)` - Removes a discount by name
- `addTax(lineItem, name, amount, type)` - Adds a tax to the line item
- `updateName(lineItem, newName)` - Updates the item name
- `updateEBTStatus(lineItem, isEBT)` - Updates EBT eligibility
- `addDevNote(lineItem, key, value)` - Adds or updates a developer note
- `removeDevNote(lineItem, key)` - Removes a developer note
- `createUpdateCopy(lineItem)` - Creates a copy for updates
- `validateForUpdate(lineItem)` - Validates item for update operations
