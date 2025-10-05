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

    // Generate data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        attempts: value,
        success: Math.max(0, value - Math.round(Math.random() * 20)),
      };
    }

    function generateDatas(count: number) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Remove month names, show only day numbers (01, 02, 03…)
    xAxis.get("renderer").labels.template.setAll({
      text: "{value.formatDate('dd')}",
    });

    // Optional: Add X-axis title
    xAxis.children.push(
      am5.Label.new(root, {
        text: "    ",
        fontSize: 14,
        fontWeight: "bold",
        paddingTop: 10,
        centerX: am5.p50,
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    // Series 1 - Total Attempts
    const series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Attack Attempts",
        xAxis,
        yAxis,
        valueYField: "attempts",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, { labelText: "Attempts: {valueY}" }),
        stroke: am5.color(0xe74c3c),
      })
    );

    // Series 2 - Successful Attempts
    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Successful Attempts",
        xAxis,
        yAxis,
        valueYField: "success",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, { labelText: "Successful: {valueY}" }),
        stroke: am5.color(0x27ae60),
        fill: am5.color(0x27ae60),
      })
    );

    // Fill under Successful Attempts
    series2.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    // Scrollbar & Legend
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        y: am5.p100,
        dy: -20,
      })
    );
    legend.data.setAll(chart.series.values);

    // Set data
    const data = generateDatas(120);
    series1.data.setAll(data);
    series2.data.setAll(data);

    // Animate
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full h-full"
      style={{ minHeight: "100%", height: "100%" }}
    />
  );
};

export default XY;
