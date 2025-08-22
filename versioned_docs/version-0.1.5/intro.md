---
id: introduction
title: Introduction
sidebar_label: Introduction
sidebar_position: 1
pagination_prev: null
description: CorePOS Android SDK — integrate POS features (inventory, orders, printing) into your app with AIDL-based connectors.
keywords:
  - CorePOS
  - Android POS SDK
---

# CorePOS SDK Documentation

Welcome to the CorePOS Android SDK documentation. This comprehensive guide will help you integrate POS functionality into your Android applications.

:::tip New to the SDK?
Start with **[Installation](installation)**, then **[Quick Start](quick-start/quick-guide-core-concepts)**. When you’re ready, dive into the **[API Reference](api-reference)**.
:::

:::caution Prerequisite
The **CorePOS app must be installed and running** on the device to bind to its services.
:::

## Documentation Overview

### Getting Started
- **[Installation Guide](installation)** - Set up the SDK in your project
- **[Quick Start Guide](quick-start/quick-guide-core-concepts)** - Get up and running in minutes

### API Reference
- **[Models](models)** - About all SDK models (entities)
- **[Inventory API](api-reference/inventory-conector/inventory-api-introduction)** - Manage products and categories
- **[Order API](api-reference/order-controller/order-api-introduction)** - Handle orders and transactions
- **[Tender API](api-reference/tender-controller/tender-api-introduction)** - Manage tender methods
- **[Printer API](api-reference/printer-api)** - Print receipts
- **[Merchant API](api-reference/merchant-api)** - Access store information
- **[Action API](api-reference/action-controller/action-api-introduction)** - Manage action methods

### Guides
- **[Best Practices](best-practices)** - Development guidelines and patterns

### Examples
- **[Basic Usage](quick-start/quick-guide-examples)** - Simple integration examples

### Troubleshooting
- **[Common Issues](common-issues)** - Solutions to frequent problems

## Requirements
- **Android**: Min SDK 21 (5.0), Target SDK 35
- **Language**: Kotlin 1.9.24+ (Java 11 compatible)
- **Device**: CorePOS app installed (production or sandbox variant)
- **Build**: R8/ProGuard enabled (add SDK keep rules — see Installation)

## SDK Features

The CorePOS SDK provides comprehensive POS functionality:

- **Inventory Management** - Products, categories, pricing
- **Order Processing** - Orders, line items, transactions
- **Merchant Information** - Store details and configuration
- **Payment Handling** - Tender methods and cash drawer
- **Receipt Printing** - Print receipts and custom content
- **AIDL Communication** - Reliable inter-process communication
- **Thread Safety** - Built-in background execution
- **Error Handling** - Comprehensive error management
- **Multiple Environments** - Production, sandbox, and development support

:::info Need help?
Start with the [Quick Start Guide](quick-start/quick-guide-core-concepts) or check [Common Issues](common-issues).
:::