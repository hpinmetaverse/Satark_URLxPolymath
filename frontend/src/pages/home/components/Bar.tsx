import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface AttackData {
  ip: string;
  attacks: number;
  country: string;
  severity: "High" | "Medium" | "Low";
}

const AttackChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.set("numberFormat", "#");
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    root.interfaceColors.set("grid", am5.color(0x000000));

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );
    // Y-axis label
    chart.leftAxesContainer.children.push(
      am5.Label.new(root, {
        text: "Number of Attacks",
        rotation: -90,
        y: am5.p50,
        centerX: am5.p50,
        fontWeight: "600",
        fontSize: 13,
      })
    );

    // Attack data
    const data: AttackData[] = [
      { ip: "192.168.1.45", attacks: 2345, country: "USA", severity: "High" },
      { ip: "10.0.2.178", attacks: 1876, country: "China", severity: "High" },
      {
        ip: "172.16.8.92",
        attacks: 1543,
        country: "Russia",
        severity: "Medium",
      },
      {
        ip: "203.0.113.45",
        attacks: 987,
        country: "Brazil",
        severity: "Medium",
      },
      {
        ip: "198.51.100.23",
        attacks: 765,
        country: "India",
        severity: "Medium",
      },
      { ip: "192.0.2.156", attacks: 543, country: "Germany", severity: "Low" },
      { ip: "203.0.113.89", attacks: 432, country: "France", severity: "Low" },
      { ip: "198.51.100.67", attacks: 321, country: "Japan", severity: "Low" },
      { ip: "192.0.2.234", attacks: 210, country: "UK", severity: "Low" },
      { ip: "203.0.113.12", attacks: 198, country: "Canada", severity: "Low" },
    ];

    data.sort((a, b) => b.attacks - a.attacks);

    // X Axis
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 50,
      minorGridEnabled: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "ip",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    // ✅ Show IPs with severity below each
    xAxis.get("renderer").labels.template.setAll({
      rotation: -45,
      centerY: am5.p50,
      dy: 10,
      fontSize: 12,
      fill: am5.color(0x333333),
      oversizedBehavior: "wrap",
      textAlign: "center",
    });

    // ✅ Add severity label below IP, color-coded
    xAxis
      .get("renderer")
      .labels.template.adapters.add("text", (text, target) => {
        const dataItem = target.dataItem?.dataContext as AttackData;
        if (dataItem) {
          let color = "#999999";
          if (dataItem.severity === "High") color = "#ff6b6b";
          else if (dataItem.severity === "Medium") color = "#ffa726";
          else if (dataItem.severity === "Low") color = "#42a5f5";

          return `${dataItem.ip}\n[fontSize:10px][${color}]${dataItem.severity}[/]`;
        }
        return text;
      });

    // Y Axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
      })
    );

    // Color set for severity
    const colorSet = am5.ColorSet.new(root, {
      colors: [am5.color(0xff6b6b), am5.color(0xffa726), am5.color(0x42a5f5)],
    });

    // Series
    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Attack Count",
        xAxis,
        yAxis,
        valueYField: "attacks",
        categoryXField: "ip",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText:
            "IP: {categoryX}\nAttacks: {valueY}\nCountry: {country}\nSeverity: {severity}",
        }),
      })
    );

    // Color columns by severity
    series1.columns.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem?.dataContext as AttackData;
      if (!dataItem) return fill;
      switch (dataItem.severity) {
        case "High":
          return colorSet.getIndex(0);
        case "Medium":
          return colorSet.getIndex(1);
        case "Low":
          return colorSet.getIndex(2);
      }
      return fill;
    });

    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      strokeWidth: 2,
      cornerRadiusTL: 3,
      cornerRadiusTR: 3,
    });

    series1.data.setAll(data);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    chart.appear(1000, 100);
    series1.appear();

    return () => root.dispose();
  }, []);

  return (
    <div className="flex flex-col h-full w-full ">
      {/* Header */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
        <h3 className="text-lg font-semibold text-red-700 ">
          IP Based Attack Dashboard
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing attack frequency from different IP addresses
        </p>
      </div>

      {/* Chart Container */}
      <div ref={chartRef} className="w-full h-[500px]" />
    </div>
  );
};

export default AttackChart;
