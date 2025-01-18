"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Users,
  DollarSign,
  Activity,
  Server,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import AdminLayout from "./layout";

const data = [
  { name: "Jan", users: 400, revenue: 2400, sessions: 1800 },
  { name: "Feb", users: 300, revenue: 1398, sessions: 2200 },
  { name: "Mar", users: 200, revenue: 9800, sessions: 2600 },
  { name: "Apr", users: 278, revenue: 3908, sessions: 2900 },
  { name: "May", users: 189, revenue: 4800, sessions: 2300 },
  { name: "Jun", users: 239, revenue: 3800, sessions: 2500 },
];

const metrics = [
  {
    title: "Total Users",
    value: "12,345",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$54,321",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Sessions",
    value: "2,892",
    change: "-3%",
    trend: "down",
    icon: Activity,
  },
  {
    title: "System Status",
    value: "98.9%",
    change: "+0.2%",
    trend: "up",
    icon: Server,
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
        <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div
                  className={cn(
                    "flex items-center text-sm",
                    metric.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {metric.trend === "up" ? (
                    <ArrowUp className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4" />
                  )}
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AdminLayout>
    
  );
}