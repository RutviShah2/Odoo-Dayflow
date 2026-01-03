import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Wallet,
  Download,
  TrendingUp,
  TrendingDown,
  Banknote,
  FileText,
  Calendar,
  IndianRupee,
} from 'lucide-react';
import { format, subMonths } from 'date-fns';

const Payroll: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const { salary } = user;
  const currentMonth = format(new Date(), 'MMMM yyyy');

  const salaryBreakdown = [
    { label: 'Basic Salary', amount: salary.basic, type: 'earning' },
    { label: 'House Rent Allowance (HRA)', amount: salary.hra, type: 'earning' },
    { label: 'Other Allowances', amount: salary.allowances, type: 'earning' },
    { label: 'Deductions (PF, Tax)', amount: salary.deductions, type: 'deduction' },
  ];

  const totalEarnings = salary.basic + salary.hra + salary.allowances;
  const totalDeductions = salary.deductions;

  const payslipHistory = [
    { month: format(subMonths(new Date(), 0), 'MMMM yyyy'), amount: salary.netSalary, status: 'Paid' },
    { month: format(subMonths(new Date(), 1), 'MMMM yyyy'), amount: salary.netSalary, status: 'Paid' },
    { month: format(subMonths(new Date(), 2), 'MMMM yyyy'), amount: salary.netSalary, status: 'Paid' },
    { month: format(subMonths(new Date(), 3), 'MMMM yyyy'), amount: salary.netSalary, status: 'Paid' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll</h1>
            <p className="text-muted-foreground mt-1">View your salary structure and payslips</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Payslip
          </Button>
        </div>

        {/* Net Salary Card */}
        <div className="relative overflow-hidden bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">Net Salary - {currentMonth}</span>
            </div>
            <p className="text-5xl font-bold mb-2">{formatCurrency(salary.netSalary)}</p>
            <p className="text-sm opacity-80">Credited on 1st of every month</p>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Earnings & Deductions */}
          <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Salary Breakdown</h3>
            </div>
            <div className="p-6 space-y-4">
              {salaryBreakdown.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        item.type === 'earning' ? 'bg-success/10' : 'bg-destructive/10'
                      }`}
                    >
                      {item.type === 'earning' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span
                    className={`font-semibold ${
                      item.type === 'earning' ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {item.type === 'earning' ? '+' : '-'} {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t-2 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Total Earnings</span>
                  <span className="font-semibold text-success">{formatCurrency(totalEarnings)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Total Deductions</span>
                  <span className="font-semibold text-destructive">-{formatCurrency(totalDeductions)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="font-semibold text-lg">Net Salary</span>
                  <span className="font-bold text-lg text-primary">{formatCurrency(salary.netSalary)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
                <div className="flex items-center gap-2 text-success mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Total Earnings</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(totalEarnings)}</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <TrendingDown className="w-5 h-5" />
                  <span className="text-sm font-medium">Deductions</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(totalDeductions)}</p>
              </div>
            </div>

            {/* Payslip History */}
            <div className="bg-card rounded-2xl shadow-card border border-border/50">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Payslip History</h3>
              </div>
              <div className="divide-y divide-border">
                {payslipHistory.map(slip => (
                  <div
                    key={slip.month}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{slip.month}</p>
                        <p className="text-sm text-muted-foreground">{slip.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{formatCurrency(slip.amount)}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
