import Pie from "./components/Pie";
import XY from "./components/XY";
import Bar from "./components/Bar";
import Text from "./components/Text";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Text />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <div className="w-full min-h-[450px] lg:min-h-[550px] xl:min-h-[600px] bg-card rounded-xl border shadow-sm p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <Bar />
            </div>
          </div>
        </div>

        {/* Pie Chart - Extra large */}
        <div className="w-full min-h-[450px] lg:min-h-[550px] xl:min-h-[600px] bg-card rounded-xl border shadow-sm p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <Pie />
            </div>
          </div>
        </div>

        {/* XY Chart - Extra large */}
        <div className="w-full min-h-[550px] lg:min-h-[650px] xl:min-h-[700px] bg-card rounded-xl border shadow-sm p-6 lg:col-span-2">
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <XY />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
