---
id: api-introduction
sidebar_position: -2
title: Introduction
description: What the CorePOS third-party API offers and how to authenticate against it.
hide_title: true
pagination_prev: null
---

## Introduction

The CorePOS API lets a third-party application read and modify a merchant's CorePOS data over HTTPS —
inventory items, categories, charges and discounts, orders and their line items, payment transactions,
merchant details and tipping configuration.

Use it for anything that runs off the register: back-office tools, e-commerce synchronisation, reporting
and reconciliation. For integrations that run **on** the POS device — custom tender buttons, action
buttons, receipt printing — use the [Android SDK](/) instead.

### Base URLs

| Environment | Base URL |
|---|---|
| Production | `https://api.coreposnow.com` |
| Sandbox | `https://api-sandbox.coreposnow.com` |

Every endpoint on this site is documented relative to that host and lives under `/third-party-api/v1`.

### Authentication

The API uses OAuth2. A merchant grants your application access, you exchange the resulting authorization
code for a token pair, and every subsequent request carries the access token as a bearer token:

```http
Authorization: Bearer <access token>
```

Three endpoints cover the whole flow:

- [Authorize application](./authorize-application.api.mdx) — starts the flow and returns an authorization code.
- [Issue access token](./issue-access-token.api.mdx) — exchanges that code for an access/refresh token pair.
- [Refresh access token](./refresh-access-token.api.mdx) — issues a new pair from a valid refresh token.

### Authorities

Access is scoped per merchant and per capability. Each endpoint states the authority it requires — for
example **ITEM READ** to list items or **ITEM WRITE** to create one. A request made with a token that
lacks the authority is rejected, so request only the capabilities your integration actually uses.

### Client libraries

A generated Kotlin/Java client is published to Maven Central and tracks the API release, so you do not
have to hand-write request and response types. See [Installation](./installation.md).
