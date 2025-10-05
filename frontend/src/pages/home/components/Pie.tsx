import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Pie = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // --- Create Pie Chart ---
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // --- Data ---
    const data = [
      { attackType: "SQL Injection", attempts: 156, successful: 23 },
      { attackType: "XSS", attempts: 234, successful: 18 },
      { attackType: "Directory Traversal", attempts: 89, successful: 12 },
      { attackType: "Command Injection", attempts: 67, successful: 8 },
      { attackType: "SSRF", attempts: 45, successful: 5 },
      { attackType: "File Inclusion", attempts: 78, successful: 9 },
      { attackType: "Brute Force", attempts: 345, successful: 45 },
      { attackType: "Web Shell Upload", attempts: 23, successful: 3 },
    ].map((item) => ({
      ...item,
      successRate: Math.round((item.successful / item.attempts) * 100),
    }));

    // --- Pie Series ---
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Attack Types",
        categoryField: "attackType",
        valueField: "attempts",
        alignLabels: false,
      })
    );

    series.data.setAll(data);
    series.labels.template.set("forceHidden", true);

    // --- Tooltip ---
    series.set(
      "tooltip",
      am5.Tooltip.new(root, {
        labelText:
          "{attackType}\n\nAttempts: {attempts}\nSuccessful: {successful}\nSuccess Rate: {successRate}%",
      })
    );

    series
      .get("tooltip")!
      .get("background")!
      .setAll({
        fill: am5.color(0x000000),
        fillOpacity: 0.9,
        strokeWidth: 1,
        stroke: am5.color(0xffffff),
      });

    series.get("tooltip")!.label.setAll({
      fill: am5.color(0xffffff),
      fontSize: 14,
      textAlign: "center",
    });

    // --- Legend ---
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 25,
        marginBottom: 25,
      })
    );

    legend.labels.template.setAll({
      fontSize: 10,
      fill: am5.color(0x666666),
    });

    legend.data.setAll(series.dataItems);

    // --- Animations ---
    series.appear(1000, 100);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div className="flex flex-col h-full w-full mt-1">
      {/* Header */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
        <h3 className="text-lg font-semibold text-red-700 ">
          Network Attack Dashboard
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing attack frequency and success rates for different attack types
        </p>
      </div>

      {/* Chart Area */}
      <div ref={chartRef} className="flex-1 w-full min-h-[350px]" />
    </div>
  );
};

export default Pie;
