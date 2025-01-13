
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BillingSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Demo Money</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Current Balance</h3>
          <p className="text-2xl font-bold">$10,000</p>
          <p className="text-sm text-gray-600">Demo Money</p>
        </div>
        <div className="space-y-4">
          <Button className="w-full" variant="outline">
            Request Demo Money
          </Button>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Transaction History</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Demo Money Added</span>
                <span className="text-green-600">+$10,000</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSection;