import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Phone, MapPin, User, Calendar, DollarSign, Package } from "lucide-react";
import { purchaseOrderMock } from "@/mock/purchase";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
import type { PurchaseOrder } from "@/types/purchase";

export const Route = createFileRoute("/purchase/$id")({
  component: PurchaseOrderDetail,
});

function PurchaseOrderDetail() {
  const { id } = Route.useParams();
  const item = purchaseOrderMock.find((d) => d.id === id);
  
  if (!item) {
    return <div className="p-6 text-center text-muted-foreground">未找到该订单</div>;
  }

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/purchase"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{item.code}</h1>
          <p className="text-sm text-muted-foreground">订单日期：{item.orderDate}</p>
        </div>
        <Badge className={getBadgeClassName(item.status)}>
          {getDictLabel("dict-purchase-order-status", item.status)}
        </Badge>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">订单信息</TabsTrigger>
          <TabsTrigger value="items">商品明细</TabsTrigger>
          <TabsTrigger value="payment">收付款</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" /> 供应商信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">供应商名称</span>
                  <span className="font-medium">{item.supplierName}</span>
                  <span className="text-muted-foreground">联系人</span>
                  <span>{item.contact}</span>
                  <span className="text-muted-foreground">联系电话</span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />{item.phone}
                  </span>
                  <span className="text-muted-foreground">收货地址</span>
                  <span className="flex items-start gap-1">
                    <MapPin className="h-3 w-3 mt-0.5" />
                    {item.address}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> 交期信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">订单日期</span>
                  <span>{item.orderDate}</span>
                  <span className="text-muted-foreground">预计交货</span>
                  <span>{item.deliveryDate}</span>
                  <span className="text-muted-foreground">创建时间</span>
                  <span>{item.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {item.remark && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">备注</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.remark}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">商品明细</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">商品名称</th>
                      <th className="px-4 py-3 text-right font-medium">数量</th>
                      <th className="px-4 py-3 text-right font-medium">单价</th>
                      <th className="px-4 py-3 text-right font-medium">金额</th>
                      <th className="px-4 py-3 text-right font-medium">已到货</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.items.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="px-4 py-3">{row.productName}</td>
                        <td className="px-4 py-3 text-right">{row.quantity}</td>
                        <td className="px-4 py-3 text-right">¥{row.unitPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-medium">¥{row.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={row.receivedQty === row.quantity ? "text-emerald-600" : "text-amber-600"}>
                            {row.receivedQty}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-medium">
                      <td colSpan={4} className="px-4 py-3 text-right">合计</td>
                      <td className="px-4 py-3 text-right text-base">¥{item.totalAmount.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> 收付款信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">订单金额</p>
                  <p className="text-2xl font-bold text-primary">¥{item.totalAmount.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">已付款</p>
                  <p className="text-2xl font-bold text-emerald-600">¥{item.paidAmount.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">应付账款</p>
                  <p className="text-2xl font-bold text-amber-600">¥{(item.totalAmount - item.paidAmount).toLocaleString()}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-sm">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-muted-foreground">付款进度</span>
                    <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${(item.paidAmount / item.totalAmount) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {((item.paidAmount / item.totalAmount) * 100).toFixed(1)}%
                    </span>
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
