import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users,
  ArrowUpRight, ArrowDownRight, Activity
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

// Stats cards data
const statsData = [
  {
    title: "本月销售",
    value: "¥689,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "emerald",
  },
  {
    title: "销售订单",
    value: "128",
    change: "+8.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    title: "采购入库",
    value: "¥412,000",
    change: "-3.2%",
    trend: "down",
    icon: Package,
    color: "violet",
  },
  {
    title: "活跃客户",
    value: "1,247",
    change: "+5.1%",
    trend: "up",
    icon: Users,
    color: "amber",
  },
];

// Revenue trend chart data
const revenueData = [
  { month: "1月", revenue: 420000, target: 400000 },
  { month: "2月", revenue: 380000, target: 400000 },
  { month: "3月", revenue: 520000, target: 450000 },
  { month: "4月", revenue: 480000, target: 450000 },
  { month: "5月", revenue: 610000, target: 500000 },
  { month: "6月", revenue: 689500, target: 550000 },
];

const revenueChartConfig = {
  revenue: { label: "实际营收", color: "var(--color-chart-1)" },
  target: { label: "目标营收", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

// Sales by category chart data
const categoryData = [
  { name: "成品", value: 420000, color: "var(--color-chart-1)" },
  { name: "设备", value: 156000, color: "var(--color-chart-2)" },
  { name: "包材", value: 68000, color: "var(--color-chart-3)" },
  { name: "服务", value: 45500, color: "var(--color-chart-4)" },
];

// Recent orders
const recentOrders = [
  { code: "SO-2026050801", customer: "华东贸易有限公司", amount: 158000, status: "processing" },
  { code: "SO-2026050701", customer: "北京科技有限公司", amount: 85600, status: "shipped" },
  { code: "PO-2026050801", customer: "联想（北京）有限公司", amount: 125000, status: "approved" },
  { code: "SO-2026050501", customer: "深圳创新实业集团", amount: 320500, status: "completed" },
  { code: "PO-2026050701", customer: "华为技术有限公司", amount: 68000, status: "processing" },
];

// Activity timeline
const activities = [
  { time: "10:30", action: "新订单", desc: "华东贸易有限公司 提交销售订单 SO-2026050801", type: "sale" },
  { time: "10:15", action: "采购审批", desc: "联想采购订单 PO-2026050801 已审批通过", type: "purchase" },
  { time: "09:45", action: "库存入库", desc: "企业级服务器 入库 5 台至主仓库", type: "inventory" },
  { time: "09:30", action: "客户收款", desc: "收到深圳创新实业集团货款 ¥320,500", type: "payment" },
  { time: "09:00", action: "订单发货", desc: "北京科技订单 SO-2026050701 已发货", type: "ship" },
];

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <p className="text-sm text-muted-foreground mt-1">欢迎回来，查看您的业务概览</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          const colorClass = {
            emerald: "bg-emerald-50 text-emerald-600",
            blue: "bg-blue-50 text-blue-600",
            violet: "bg-violet-50 text-violet-600",
            amber: "bg-amber-50 text-amber-600",
          }[stat.color];
          
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs 上月</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">营收趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="h-[280px] w-full">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8}
                  tickFormatter={(value) => `¥${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-revenue)", strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="var(--color-target)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">销售品类分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[280px] w-full">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8}
                  width={60}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">最近订单</CardTitle>
              <Badge variant="outline" className="text-xs">今日 5 条</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.code} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      {order.code.startsWith("SO") ? (
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Package className="h-4 w-4 text-violet-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.code}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">¥{order.amount.toLocaleString()}</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        order.status === "completed" ? "bg-emerald-50 text-emerald-600" :
                        order.status === "processing" ? "bg-amber-50 text-amber-600" :
                        order.status === "shipped" ? "bg-violet-50 text-violet-600" :
                        "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {order.status === "completed" ? "已完成" :
                       order.status === "processing" ? "处理中" :
                       order.status === "shipped" ? "已发货" : "已确认"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" /> 活动时间线
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, idx) => {
                const typeColors = {
                  sale: "bg-blue-500",
                  purchase: "bg-violet-500",
                  inventory: "bg-emerald-500",
                  payment: "bg-amber-500",
                  ship: "bg-cyan-500",
                };
                return (
                  <div key={idx} className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${typeColors[activity.type as keyof typeof typeColors]}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          {activity.action}
                        </Badge>
                      </div>
                      <p className="text-sm mt-0.5">{activity.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
