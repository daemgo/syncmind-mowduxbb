import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { stockRecordMock, productMock, warehouseMock } from "@/mock/inventory";
import type { StockRecord } from "@/types/inventory";

export const Route = createFileRoute("/inventory/")({
  component: InventoryPage,
});

// Configuration area
const columns: ColumnConfig<StockRecord>[] = [
  { key: "code", label: "单据编号", type: "mono" },
  { key: "type", label: "业务类型", type: "badge", dictId: "dict-stock-record-type" },
  { key: "productName", label: "商品名称" },
  { key: "warehouseName", label: "仓库" },
  { key: "quantity", label: "变动数量", type: "number", align: "right" },
  { key: "afterQty", label: "结存数量", type: "number", align: "right" },
  { key: "operator", label: "操作人" },
  { key: "createdAt", label: "时间", type: "date" },
]

const filterFields: FilterField[] = [
  { key: "type", label: "业务类型", type: "select", dictId: "dict-stock-record-type" },
  { key: "productName", label: "商品名称", type: "text" },
  { key: "warehouseName", label: "仓库", type: "text" },
]

const formFields: FormField[] = [
  { key: "type", label: "业务类型", type: "select", dictId: "dict-stock-record-type", required: true },
  { key: "productName", label: "商品名称", type: "text", required: true },
  { key: "warehouseName", label: "仓库", type: "text", required: true },
  { key: "quantity", label: "变动数量", type: "number" },
  { key: "operator", label: "操作人", type: "text" },
  { key: "remark", label: "备注", type: "textarea" },
]

// Page component
function InventoryPage() {
  const navigate = useNavigate();
  const [data] = useState(stockRecordMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockRecord | undefined>();
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
        <h1 className="text-2xl font-bold">库存流水</h1>
        <Button onClick={() => { setEditingItem(undefined); setDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />新建记录
        </Button>
      </div>
      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        data={filtered}
        onView={(item) => navigate({ to: "/inventory/$id", params: { id: item.id } })}
        onEdit={(item) => { setEditingItem(item); setDialogOpen(true) }}
      />
      <FormDialog
        entityName="库存记录"
        fields={formFields}
        data={editingItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
