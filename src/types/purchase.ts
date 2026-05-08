// Purchase module type definitions

export interface PurchaseOrder {
  id: string
  code: string // PO-YYYYMMDDNNN format
  supplierId: string
  supplierName: string
  orderDate: string
  deliveryDate: string
  status: PurchaseOrderStatus
  totalAmount: number
  paidAmount: number
  items: PurchaseOrderItem[]
  contact: string
  phone: string
  address: string
  remark?: string
  createdAt: string
}

export type PurchaseOrderStatus = "draft" | "submitted" | "approved" | "processing" | "received" | "completed" | "cancelled"

export interface PurchaseOrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  amount: number
  receivedQty: number
}

export interface Supplier {
  id: string
  code: string // SUP-YYYYMMDDNNN format
  name: string
  contact: string
  phone: string
  email?: string
  address: string
  status: SupplierStatus
  category: SupplierCategory
  creditLimit: number
  totalAmount: number // historical purchase amount
  createdAt: string
}

export type SupplierStatus = "potential" | "active" | "inactive" | "blacklist"
export type SupplierCategory = "原材料" | "半成品" | "成品" | "设备" | "服务"
