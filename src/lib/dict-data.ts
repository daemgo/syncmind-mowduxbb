// Dictionary data for ERP system

export interface DictItem {
  label: string
  value: string
  color?: string
}

export const dictionaries: Record<string, DictItem[]> = {
  // Sales Order Status
  "dict-sales-order-status": [
    { label: "草稿", value: "draft", color: "gray" },
    { label: "已确认", value: "confirmed", color: "blue" },
    { label: "处理中", value: "processing", color: "amber" },
    { label: "已发货", value: "shipped", color: "violet" },
    { label: "已完成", value: "completed", color: "green" },
    { label: "已取消", value: "cancelled", color: "red" },
  ],

  // Customer Status
  "dict-customer-status": [
    { label: "潜在客户", value: "potential", color: "blue" },
    { label: "活跃客户", value: "active", color: "green" },
    { label: "非活跃", value: "inactive", color: "gray" },
    { label: "流失客户", value: "lost", color: "red" },
  ],

  // Customer Level
  "dict-customer-level": [
    { label: "A级", value: "A", color: "green" },
    { label: "B级", value: "B", color: "amber" },
    { label: "C级", value: "C", color: "gray" },
  ],

  // Purchase Order Status
  "dict-purchase-order-status": [
    { label: "草稿", value: "draft", color: "gray" },
    { label: "已提交", value: "submitted", color: "blue" },
    { label: "已审批", value: "approved", color: "violet" },
    { label: "处理中", value: "processing", color: "amber" },
    { label: "已到货", value: "received", color: "cyan" },
    { label: "已完成", value: "completed", color: "green" },
    { label: "已取消", value: "cancelled", color: "red" },
  ],

  // Supplier Status
  "dict-supplier-status": [
    { label: "潜在供应商", value: "potential", color: "blue" },
    { label: "合格供应商", value: "active", color: "green" },
    { label: "暂停合作", value: "inactive", color: "gray" },
    { label: "黑名单", value: "blacklist", color: "red" },
  ],

  // Supplier Category
  "dict-supplier-category": [
    { label: "原材料", value: "原材料", color: "blue" },
    { label: "半成品", value: "半成品", color: "violet" },
    { label: "成品", value: "成品", color: "green" },
    { label: "设备", value: "设备", color: "amber" },
    { label: "服务", value: "服务", color: "cyan" },
  ],

  // Warehouse Status
  "dict-warehouse-status": [
    { label: "正常", value: "active", color: "green" },
    { label: "停用", value: "inactive", color: "gray" },
    { label: "维护中", value: "maintenance", color: "amber" },
  ],

  // Product Category
  "dict-product-category": [
    { label: "原材料", value: "原材料", color: "blue" },
    { label: "半成品", value: "半成品", color: "violet" },
    { label: "成品", value: "成品", color: "green" },
    { label: "包材", value: "包材", color: "orange" },
    { label: "辅料", value: "辅料", color: "gray" },
  ],

  // Product Status
  "dict-product-status": [
    { label: "正常", value: "active", color: "green" },
    { label: "已停产", value: "discontinued", color: "gray" },
    { label: "缺货", value: "out_of_stock", color: "red" },
  ],

  // Stock Record Type
  "dict-stock-record-type": [
    { label: "采购入库", value: "purchase_in", color: "green" },
    { label: "采购退货", value: "purchase_return", color: "red" },
    { label: "销售出库", value: "sale_out", color: "blue" },
    { label: "销售退货", value: "sale_return", color: "violet" },
    { label: "调拨", value: "transfer", color: "amber" },
    { label: "调整", value: "adjustment", color: "cyan" },
    { label: "盘点", value: "inventory", color: "purple" },
  ],
}
