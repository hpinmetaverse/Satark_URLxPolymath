import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Bar = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Set data with success rates
    let data = [
      {
        attackType: "SQL Injection",
        attempts: 156,
        successful: 23,
        successRate: Math.round((23 / 156) * 100),
      },
      {
        attackType: "XSS",
        attempts: 234,
        successful: 18,
        successRate: Math.round((18 / 234) * 100),
      },
      {
        attackType: "Directory Traversal",
        attempts: 89,
        successful: 12,
        successRate: Math.round((12 / 89) * 100),
      },
      {
        attackType: "Command Injection",
        attempts: 67,
        successful: 8,
        successRate: Math.round((8 / 67) * 100),
      },
      {
        attackType: "SSRF",
        attempts: 45,
        successful: 5,
        successRate: Math.round((5 / 45) * 100),
      },
      {
        attackType: "File Inclusion",
        attempts: 78,
        successful: 9,
        successRate: Math.round((9 / 78) * 100),
      },
      {
        attackType: "Brute Force",
        attempts: 345,
        successful: 45,
        successRate: Math.round((45 / 345) * 100),
      },
      {
        attackType: "Web Shell Upload",
        attempts: 23,
        successful: 3,
        successRate: Math.round((3 / 23) * 100),
      },
    ];

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Attack Types",
        categoryField: "attackType",
        valueField: "attempts",
        alignLabels: false,
      })
    );

    series.data.setAll(data);

    // Remove slice labels
    series.labels.template.set("forceHidden", true);

    // Configure tooltip using the built-in tooltip functionality
    series.set(
      "tooltip",
      am5.Tooltip.new(root, {
        labelText:
          "{attackType}\n\nAttempts: {attempts}\nSuccessful: {successful}\nSuccess Rate: {successRate}%",
      })
    );

    // Style the tooltip
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

    // Add legend
    let legend = chart.children.push(
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

    series.appear(1000, 100);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-full" />;
};

export default Bar;
