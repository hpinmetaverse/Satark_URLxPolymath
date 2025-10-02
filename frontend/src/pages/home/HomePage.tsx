import { ScrollArea } from "@/components/ui/scroll-area";
import IncomeExpensesChart from "./components/Bar";
import Pie from "./components/Pie";
import XY from "./components/XY";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollArea className="h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Income & Expenses Chart */}
          <div className="w-full aspect-video min-h-[300px] bg-card rounded-xl border shadow-sm p-4 lg:p-6">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Income vs Expenses
              </h2>
              <div className="flex-1 min-h-0">
                <IncomeExpensesChart />
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="w-full aspect-video min-h-[300px] bg-card rounded-xl border shadow-sm p-4 lg:p-6">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Spending Distribution
              </h2>
              <div className="flex-1 min-h-0">
                <Pie />
              </div>
            </div>
          </div>

          {/* XY Chart - Full width */}
          <div className="w-full aspect-video min-h-[400px] bg-card rounded-xl border shadow-sm p-4 lg:p-6 lg:col-span-2">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Financial Trends
              </h2>
              <div className="flex-1 min-h-0">
                <XY />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
