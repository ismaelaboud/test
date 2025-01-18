"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import AdminDashboard from "../layout";

export default function SettingsPage() {
  return (
    <AdminDashboard>
        <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your basic system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="EduHub LMS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="support@eduhub.com"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance" />
                <Label htmlFor="maintenance">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="2fa" defaultChecked />
                <Label htmlFor="2fa">
                  Require Two-Factor Authentication
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="session" defaultChecked />
                <Label htmlFor="session">
                  Automatic Session Timeout
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                <Input id="timeout" type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage your API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    defaultValue="sk_live_..."
                    type="password"
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="api-logging" defaultChecked />
                <Label htmlFor="api-logging">Enable API Logging</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure system notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" defaultChecked />
                <Label htmlFor="email-notifications">
                  Email Notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="system-alerts" defaultChecked />
                <Label htmlFor="system-alerts">System Alerts</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-email">
                  Notification Email
                </Label>
                <Input
                  id="notification-email"
                  type="email"
                  defaultValue="admin@eduhub.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </AdminDashboard>
  );
}