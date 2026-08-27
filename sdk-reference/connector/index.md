---
title: com.coreposnow.sdk.connector
sidebar_label: connector
sidebar_position: 1
---

# com.coreposnow.sdk.connector

| Type | Description |
|---|---|
| [ActionConnector](action-connector.md) | Connector for managing custom merchant actions registered in the CorePOS application. |
| [InventoryConnector](inventory-connector.md) | Connector for managing the merchant's inventory in the CorePOS application: items, categories, charges, EBT flags, stock quantities and dual-pricing settings. All methods must be called from a background thread. |
| [MerchantConnector](merchant-connector.md) | Connector for reading merchant information from the CorePOS application. All methods must be called from a background thread. |
| [OrderConnector](order-connector.md) | Connector for working with orders and their line items in the CorePOS application. |
| [PaymentConnector](payment-connector.md) | Connector for processing payments through the CorePOS application. |
| [PrinterConnector](printer-connector.md) | Connector for printing through the receipt printer managed by the CorePOS application. All methods must be called from a background thread. |
| [ServiceConnector](service-connector.md) | Base class for all CorePOS connectors. |
| [TenderConnector](tender-connector.md) | Connector for managing custom tenders (payment methods) registered by third-party apps in the CorePOS application. A custom tender appears as an extra payment button on the CorePOS payment screen. All methods must be called from a background thread. |
| [TokensConnector](tokens-connector.md) | Connector for obtaining OAuth tokens from the CorePOS application, used to authenticate calls to the CorePOS third-party REST API. All methods must be called from a background thread. |
