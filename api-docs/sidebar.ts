import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Apps",
      link: {
        type: "doc",
        id: "apps",
      },
      items: [
        {
          type: "doc",
          id: "get-merchant-billing-info-for-app",
          label: "Get merchant billing info for app",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-the-app",
          label: "Get the app",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Categories",
      link: {
        type: "doc",
        id: "categories",
      },
      items: [
        {
          type: "doc",
          id: "get-category",
          label: "Get category",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-category",
          label: "Update category",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-category",
          label: "Delete category",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "list-categories",
          label: "List categories",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "create-category",
          label: "Create category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "batch-create-categories",
          label: "Batch create categories",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Charges",
      link: {
        type: "doc",
        id: "charges",
      },
      items: [
        {
          type: "doc",
          id: "get-charge",
          label: "Get charge",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-charge",
          label: "Update charge",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-charge",
          label: "Delete charge",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "list-charges",
          label: "List charges",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "create-charge",
          label: "Create charge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "batch-create-charges",
          label: "Batch create charges",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Discounts",
      link: {
        type: "doc",
        id: "discounts",
      },
      items: [
        {
          type: "doc",
          id: "get-discount",
          label: "Get discount",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-discount",
          label: "Update discount",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-discount",
          label: "Delete discount",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "list-discounts",
          label: "List discounts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "create-discount",
          label: "Create discount",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "batch-create-discounts",
          label: "Batch create discounts",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Dual Pricing",
      link: {
        type: "doc",
        id: "dual-pricing",
      },
      items: [
        {
          type: "doc",
          id: "get-dual-pricing-settings",
          label: "Get dual pricing settings",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Employees",
      link: {
        type: "doc",
        id: "employees",
      },
      items: [
        {
          type: "doc",
          id: "get-employee",
          label: "Get employee",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-employee",
          label: "Update employee",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "list-employees",
          label: "List employees",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "add-employee",
          label: "Add employee",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Items",
      link: {
        type: "doc",
        id: "items",
      },
      items: [
        {
          type: "doc",
          id: "get-item",
          label: "Get item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-item",
          label: "Update item",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-item",
          label: "Delete item",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "upload-item-image",
          label: "Upload item image",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "batch-create-items",
          label: "Batch create items",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "list-items",
          label: "List items",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "create-item",
          label: "Create item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "delete-item-image",
          label: "Delete item image",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Merchants",
      link: {
        type: "doc",
        id: "merchants",
      },
      items: [
        {
          type: "doc",
          id: "get-merchant",
          label: "Get merchant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-merchant",
          label: "Update merchant",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "get-app-billing-info",
          label: "Get app billing info",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "OAuth2",
      link: {
        type: "doc",
        id: "o-auth-2",
      },
      items: [
        {
          type: "doc",
          id: "issue-access-token",
          label: "Issue access token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "refresh-access-token",
          label: "Refresh access token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "authorize-application",
          label: "Authorize application",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Orders",
      link: {
        type: "doc",
        id: "orders",
      },
      items: [
        {
          type: "doc",
          id: "get-order",
          label: "Get order",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-order",
          label: "Update order",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-order",
          label: "Delete order",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "list-orders",
          label: "List orders",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "create-order",
          label: "Create order",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "add-transaction",
          label: "Add transaction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "add-line-item-dev-notes",
          label: "Add line item dev notes",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "delete-line-item-dev-notes",
          label: "Delete line item dev notes",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Tip Settings",
      link: {
        type: "doc",
        id: "tip-settings",
      },
      items: [
        {
          type: "doc",
          id: "get-tip-settings",
          label: "Get tip settings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-tip-settings",
          label: "Update tip settings",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "toggle-tipping-enabled",
          label: "Toggle tipping enabled",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Transactions",
      link: {
        type: "doc",
        id: "transactions",
      },
      items: [
        {
          type: "doc",
          id: "list-transactions",
          label: "List transactions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-transaction",
          label: "Get transaction",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Webhook subscription",
      link: {
        type: "doc",
        id: "webhook-subscription",
      },
      items: [
        {
          type: "doc",
          id: "get-webhook-subscription",
          label: "Get webhook subscription",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "set-webhook-subscription",
          label: "Set webhook subscription",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Webhook events",
      items: [
        {
          type: "doc",
          id: "item-created",
          label: "Item created",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "item-updated",
          label: "Item updated",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "item-deleted",
          label: "Item deleted",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "order-created",
          label: "Order created",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "order-updated",
          label: "Order updated",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "order-deleted",
          label: "Order deleted",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "employee-created",
          label: "Employee created",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "employee-updated",
          label: "Employee updated",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "app-installed",
          label: "App installed",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "app-uninstalled",
          label: "App uninstalled",
          className: "api-method event",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
