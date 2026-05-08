import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, Building, User, Clock } from "lucide-react";
import { stockRecordMock } from "@/mock/inventory";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
import type { StockRecord } from "@/types/inventory";

export const Route = createFileRoute("/inventory/$id")({
  component: InventoryDetail,
});

function InventoryDetail() {
  const { id } = Route.useParams();
  const item = stockRecordMock.find((d) => d.id === id);
  
  if (!item) {
    return <div className="p-6 text-center text-muted-foreground">未找到该记录</div>;
  }

  const isPositive = item.quantity > 0;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/inventory"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{item.code}</h1>
          <p className="text-sm text-muted-foreground">业务类型：{getDictLabel("dict-stock-record-type", item.type)}</p>
        </div>
        <Badge className={getBadgeClassName(item.type)}>
          {isPositive ? "+" : ""}{item.quantity}
        </Badge>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">详细信息</TabsTrigger>
          <TabsTrigger value="timeline">操作记录</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4" /> 商品信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">商品名称</span>
                  <span className="font-medium">{item.productName}</span>
                  <span className="text-muted-foreground">仓库</span>
                  <span>{item.warehouseName}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building className="h-4 w-4" /> 库存变动
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">变动前</p>
                    <p className="text-lg font-semibold">{item.beforeQty}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${isPositive ? "bg-emerald-50" : "bg-red-50"}`}>
                    <p className={`text-xs mb-1 ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                      {isPositive ? "入库" : "出库"}
                    </p>
                    <p className={`text-lg font-bold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                      {isPositive ? "+" : ""}{item.quantity}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">变动后</p>
                    <p className="text-lg font-semibold">{item.afterQty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" /> 操作信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">操作人</span>
                  <p className="font-medium">{item.operator}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">关联单据</span>
                  <p className="font-medium">{item.orderCode || "-"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">创建时间</span>
                  <p className="font-medium">{item.createdAt}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">备注</span>
                  <p className="font-medium">{item.remark || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" /> 操作时间线
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4 pl-4 border-l-2 border-muted ml-2">
                <div className="relative">
                  <div className="absolute -left-[21px] w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">库存变动完成</p>
                    <p className="text-xs text-muted-foreground">{item.createdAt}</p>
                    <p className="text-sm">
                      {item.operator} 将 <strong>{item.productName}</strong> {isPositive ? "入库" : "出库"} {Math.abs(item.quantity)} 件
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] w-4 h-4 rounded-full bg-muted-foreground border-2 border-background" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">系统记录</p>
                    <p className="text-xs text-muted-foreground">{item.createdAt.split(" ")[0]} 00:00</p>
                    <p className="text-sm">系统自动生成库存流水记录，编号：{item.code}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
