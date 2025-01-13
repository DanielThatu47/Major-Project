
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const NotificationsSection = ({ notifications, setNotifications }) => {
  const { toast } = useToast();

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    toast({
      title: "Notification Settings Updated",
      description: `${type} notifications have been ${!notifications[type] ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email updates about your account activity
            </p>
          </div>
          <Switch
            checked={notifications.email}
            onCheckedChange={() => handleNotificationToggle('email')}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your devices
            </p>
          </div>
          <Switch
            checked={notifications.push}
            onCheckedChange={() => handleNotificationToggle('push')}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive text messages for important updates
            </p>
          </div>
          <Switch
            checked={notifications.sms}
            onCheckedChange={() => handleNotificationToggle('sms')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;