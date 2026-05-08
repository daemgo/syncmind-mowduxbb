import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { purchaseOrderMock } from "@/mock/purchase";
import type { PurchaseOrder } from "@/types/purchase";

export const Route = createFileRoute("/purchase/")({
  component: PurchaseOrderPage,
});

// Configuration area
const columns: ColumnConfig<PurchaseOrder>[] = [
  { key: "code", label: "订单编号", type: "mono" },
  { key: "supplierName", label: "供应商" },
  { key: "orderDate", label: "订单日期", type: "date" },
  { key: "deliveryDate", label: "交货日期", type: "date" },
  { key: "status", label: "状态", type: "badge", dictId: "dict-purchase-order-status" },
  { key: "totalAmount", label: "订单金额", type: "money", align: "right" },
  { key: "paidAmount", label: "已付款", type: "money", align: "right" },
]

const filterFields: FilterField[] = [
  { key: "supplierName", label: "供应商", type: "text" },
  { key: "status", label: "状态", type: "select", dictId: "dict-purchase-order-status" },
  { key: "orderDate", label: "订单日期", type: "date" },
]

const formFields: FormField[] = [
  { key: "supplierName", label: "供应商", type: "text", required: true },
  { key: "orderDate", label: "订单日期", type: "date", required: true },
  { key: "deliveryDate", label: "交货日期", type: "date" },
  { key: "status", label: "状态", type: "select", dictId: "dict-purchase-order-status" },
  { key: "totalAmount", label: "订单金额", type: "number" },
  { key: "paidAmount", label: "已付款", type: "number" },
  { key: "contact", label: "联系人", type: "text" },
  { key: "phone", label: "联系电话", type: "text" },
  { key: "address", label: "收货地址", type: "text" },
  { key: "remark", label: "备注", type: "textarea" },
]

// Page component
function PurchaseOrderPage() {
  const navigate = useNavigate();
  const [data] = useState(purchaseOrderMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PurchaseOrder | undefined>();
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = data.filter((item) => {
    return Object.entries(filters).every(([key, val]) => {
      if (!val) return true;
      const fieldVal = String((item as Record<string, unknown>)[key] ?? "");
      return fieldVal.toLowerCase().includes(val.toLowerCase());
    });
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">采购订单</h1>
        <Button onClick={() => { setEditingItem(undefined); setDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />新建订单
        </Button>
      </div>
      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        data={filtered}
        onView={(item) => navigate({ to: "/purchase/$id", params: { id: item.id } })}
        onEdit={(item) => { setEditingItem(item); setDialogOpen(true) }}
      />
      <FormDialog
        entityName="采购订单"
        fields={formFields}
        data={editingItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
