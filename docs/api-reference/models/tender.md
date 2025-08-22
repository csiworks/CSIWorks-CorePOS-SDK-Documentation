---
id: models-tender
sidebar_position: 4
title: Tender
description: Tender models.
hide_title: true
---

## Tender Models

## Tender
The `Tender` model represents a **custom tender button** that appears on the checkout screen below the default payment methods, containing the following fields:  

- `uuid`: A unique **UUID** identifier for the tender.  
- `buttonTitle`: The text displayed on the tender button.  
- `tenderName`: An internal name for the tender (not currently in use, reserved for internal reference).  
- `packageName`: The package name of the 3rd-party app that created this tender (i.e., tender button owner).  
- `enabled`: Determines whether the tender button is visible (`true`) or hidden/disabled (`false`).  
- `openCashDrawer`: Flag to indicate whether the cash drawer should be opened when this tender is used.  

```kotlin
@Parcelize
data class Tender(
    val uuid: String,
    val buttonTitle: String,
    val tenderName: String,
    val packageName: String,
    val enabled: Boolean,
    val openCashDrawer: Boolean
) : Parcelable
```

## TenderType
The `TenderType` enum defines the available payment method types that can be used with custom tenders, containing the following fields:

- `CREDIT(0)`: Credit card payments
- `DEBIT(1)`: Debit card payments
- `CASH(2)`: Cash payments
- `EBT(3)`: Electronic Benefits Transfer (food stamps/SNAP) payments
- `CHECK(4)`: Check payments
- `GIFT(5)`: Gift card payments
- `LOYALTY(6)`: Loyalty points or rewards payments

```kotlin
enum class TenderType(val code: Int) {
    CREDIT(0), DEBIT(1), CASH(2), EBT(3), CHECK(4), GIFT(5), LOYALTY(6);
    
    companion object {
        infix fun from(code: Int): TenderType? = TenderType.entries.associateBy { it.code }[code]
    }
}
```

## Tender Intents:
### Incoming Intents: 
- `Intents.EXTRA_CASH_AMOUNT`(Long) — Total cash amount in the smallest currency unit (e.g., cents).
- `Intents.EXTRA_CARD_AMOUNT`(Long) — Total card amount in the smallest currency unit (e.g., cents).
- `Intents.EXTRA_CASH_TAX_AMOUNT`(Long) — Portion of the amount that is cash tax, in smallest unit.
- `Intents.EXTRA_CARD_TAX_AMOUNT`(Long) — Portion of the amount that is card tax, in smallest unit.
- `Intents.EXTRA_ORDER_ID`(String) — CorePOS order **UUID**.
- `Intents.EXTRA_TENDER`(Tender) — The [`Tender`](#tender) record configured in CorePOS.
- `Intents.EXTRA_NOTE`(String, optional) —	Optional order notes.

### Result Intent (what your Activity should return)
##### Required:
- `Intents.EXTRA_AMOUNT`(Long) — Final amount in the smallest unit.
##### Optional:
- `Intents.EXTRA_TENDER_TYPE`(TenderType, enum) — Specify a concrete [`TenderType`](../models/models-tender#tendertype) (e.g., EBT). 
  - If omitted, CorePOS records it as a Custom Tender.
- `Intents.EXTRA_CLIENT_ID`(String) — Unique ID from your system (e.g., a payment or transaction ID).
- `Intents.EXTRA_NOTE`(String) — Notes about the payment.
- `Intents.EXTRA_TIP_AMOUNT`(Long) — Tip in smallest unit.
