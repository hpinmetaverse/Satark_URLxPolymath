import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const XY = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);

    // Generate data from Sep 1, 2025 to Oct 5, 2025
    const startDate = new Date(2025, 8, 1); // month is 0-based → 8 = Sep
    const endDate = new Date(2025, 9, 5); // 9 = Oct
    let value = 100;

    const generateDatas = () => {
      const data = [];
      let date = new Date(startDate);
      while (date <= endDate) {
        value = Math.round(Math.random() * 10 - 5 + value);
        data.push({
          date: date.getTime(),
          attempts: value,
          success: Math.max(0, value - Math.round(Math.random() * 20)),
        });
        am5.time.add(date, "day", 1);
      }
      return data;
    };

    // Axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 10,
      rotation: -45, // optional for readability
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    // Series
    const series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "attempts",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, { labelText: "Attempts: {valueY}" }),
        stroke: am5.color(0xe74c3c),
      })
    );

    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "success",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, { labelText: "Successful: {valueY}" }),
        stroke: am5.color(0x27ae60),
        fill: am5.color(0x27ae60),
      })
    );

    series2.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );

    const legend = chart.children.push(
      am5.Legend.new(root, {
        layout: root.verticalLayout,
        centerX: am5.p50,
        x: am5.p50,
        y: am5.p100,
        dy: -20,
      })
    );
    legend.data.setAll(chart.series.values);

    // Set data
    const data = generateDatas();
    series1.data.setAll(data);
    series2.data.setAll(data);

    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
        <h3 className="text-lg font-semibold text-red-700 ">
          Network Attack Monitoring Dashboard
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing attack attempts and their success rate
        </p>
      </div>

      {/* Chart Container */}
      <div
        ref={chartRef}
        className="w-full"
        style={{ minHeight: "700px", height: "700px" }}
      />
    </div>
  );
};

export default XY;
