import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";

interface BillingRecord {
  id: string;
  date: string;
  amount: string;
  status: "success" | "processing" | "failed";
  invoice: string;
}

const billingHistory: BillingRecord[] = [
  {
    id: "INV-001",
    date: "Apr 1, 2023",
    amount: "$19.00",
    status: "success",
    invoice: "#12345",
  },
  {
    id: "INV-002",
    date: "Mar 1, 2023",
    amount: "$19.00",
    status: "success",
    invoice: "#12344",
  },
  {
    id: "INV-003",
    date: "Feb 1, 2023",
    amount: "$19.00",
    status: "success",
    invoice: "#12343",
  },
  {
    id: "INV-004",
    date: "Jan 1, 2023",
    amount: "$19.00",
    status: "success",
    invoice: "#12342",
  },
];

const BillingHistory: React.FC = () => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment Methods</h3>
        <div className="mt-4 p-4 border rounded-lg flex items-center">
          <div className="mr-4">
            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
              VISA
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12/24</p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            + Add Payment Method
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-4">Billing History</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.invoice}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;
