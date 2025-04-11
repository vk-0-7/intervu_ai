import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { Bell, Shield } from "lucide-react";
import { toast } from "sonner";

const AccountSettings: React.FC = () => {
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings({ ...settings, [setting]: value });

    toast("Settings updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Bell size={18} />
          Notification Settings
        </h3>
        <p className="text-sm text-muted-foreground">
          Configure how and when you receive notifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about your account activity
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={settings.emailNotifications}
            onCheckedChange={(checked) =>
              handleSettingChange("emailNotifications", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing-emails">Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new features and offers
            </p>
          </div>
          <Switch
            id="marketing-emails"
            checked={settings.marketingEmails}
            onCheckedChange={(checked) =>
              handleSettingChange("marketingEmails", checked)
            }
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Shield size={18} />
          Security Settings
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security preferences
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            id="two-factor"
            checked={settings.twoFactorAuth}
            onCheckedChange={(checked) =>
              handleSettingChange("twoFactorAuth", checked)
            }
          />
        </div>
      </div>

      <div className="pt-4">
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
};

export default AccountSettings;
