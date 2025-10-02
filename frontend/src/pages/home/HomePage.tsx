import IncomeExpensesChart from "./components/Bar";
import Pie from "./components/Pie";
import XY from "./components/XY";

const HomePage = () => {
  return (
    <div className="text-red-400">
      <span>
        <IncomeExpensesChart />
      </span>
      <Pie />
      <XY />
    </div>
  );
};

export default HomePage;
