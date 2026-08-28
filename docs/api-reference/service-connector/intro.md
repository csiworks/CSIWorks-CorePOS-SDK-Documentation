---
id: service-api-introduction
sidebar_position: 1
title: Introduction
description: Overview of ServiceConnector and its operations.
hide_title: true
pagination_prev: null
---

## Introduction

### ServiceConnector Methods:

- [`Connect`](connect.md) - Binds to the CorePOS service if not already connected.
- [`Disconnect`](disconnect.md) - Unbinds from the CorePOS service. Safe to call when not connected. Call this when the connector is no longer needed to release the binding.
- [`On Service Connected`](on-service-connected.md)
- [`On Service Disconnected`](on-service-disconnected.md)

