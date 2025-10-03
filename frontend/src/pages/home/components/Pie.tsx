import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Pie = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "value",
        categoryField: "category",
      })
    );

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0xffffff),
    });

    // Increased label padding for better visibility with larger chart
    series.labelsContainer.set("paddingTop", 40);

    // Slice radius adapters
    series.slices.template.adapters.add("radius", (radius, target) => {
      const high = (series.getPrivate("valueHigh") as number) ?? 1;
      const value =
        ((target.dataItem as any)?.get("valueWorking") as number) ?? 0;
      return ((radius ?? 0) * value) / high;
    });

    // Set data
    series.data.setAll([
      { value: 10, category: "One" },
      { value: 9, category: "Two" },
      { value: 6, category: "Three" },
      { value: 5, category: "Four" },
      { value: 4, category: "Five" },
      { value: 3, category: "Six" },
    ]);

    // Create legend with better positioning for larger chart
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 25,
        marginBottom: 25,
      })
    );

    legend.data.setAll(series.dataItems);

    // Make chart responsive
    root.resize();

    // Animate
    series.appear(1000, 100);

    // Cleanup when component unmounts
    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-full" />;
};

export default Pie;
