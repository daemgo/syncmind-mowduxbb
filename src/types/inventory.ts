// Inventory module type definitions

export interface Warehouse {
  id: string
  code: string
  name: string
  address: string
  manager: string
  phone: string
  status: WarehouseStatus
  capacity: number
  currentStock: number
  createdAt: string
}

export type WarehouseStatus = "active" | "inactive" | "maintenance"

export interface Product {
  id: string
  code: string
  name: string
  category: ProductCategory
  unit: string
  spec?: string
  costPrice: number
  salePrice: number
  safetyStock: number
  currentStock: number
  warehouseId: string
  warehouseName: string
  status: ProductStatus
  createdAt: string
}

export type ProductCategory = "原材料" | "半成品" | "成品" | "包材" | "辅料"
export type ProductStatus = "active" | "discontinued" | "out_of_stock"

export interface StockRecord {
  id: string
  code: string // ST-YYYYMMDDNNN format
  type: StockRecordType
  productId: string
  productName: string
  warehouseId: string
  warehouseName: string
  quantity: number
  beforeQty: number
  afterQty: number
  orderCode?: string // related order number
  operator: string
  remark?: string
  createdAt: string
}

export type StockRecordType = "purchase_in" | "purchase_return" | "sale_out" | "sale_return" | "transfer" | "adjustment" | "inventory"
