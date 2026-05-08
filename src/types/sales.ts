// Sales module type definitions

export interface SalesOrder {
  id: string
  code: string // SO-YYYYMMDDNNN format
  customerId: string
  customerName: string
  orderDate: string
  deliveryDate: string
  status: SalesOrderStatus
  totalAmount: number
  paidAmount: number
  items: SalesOrderItem[]
  contact: string
  phone: string
  address: string
  remark?: string
  createdAt: string
}

export type SalesOrderStatus = "draft" | "confirmed" | "processing" | "shipped" | "completed" | "cancelled"

export interface SalesOrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  amount: number
}

export interface Customer {
  id: string
  code: string // CUS-YYYYMMDDNNN format
  name: string
  contact: string
  phone: string
  email?: string
  address: string
  status: CustomerStatus
  level: CustomerLevel
  creditLimit: number
  totalAmount: number // historical sales amount
  createdAt: string
}

export type CustomerStatus = "potential" | "active" | "inactive" | "lost"
export type CustomerLevel = "A" | "B" | "C"
