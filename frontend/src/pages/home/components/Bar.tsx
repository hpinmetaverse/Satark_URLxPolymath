import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const IncomeExpensesChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );

    let data = [
      { year: "2016", income: 23.5, expenses: 21.1 },
      { year: "2017", income: 26.2, expenses: 30.5 },
      { year: "2018", income: 30.1, expenses: 34.9 },
      { year: "2019", income: 29.5, expenses: 31.1 },
      {
        year: "2020",
        income: 30.6,
        expenses: 28.2,
        strokeSettings: {
          strokeWidth: 3,
          strokeDasharray: [5, 5],
        },
      },
      {
        year: "2021",
        income: 34.1,
        expenses: 32.9,
        columnSettings: {
          strokeWidth: 1,
          strokeDasharray: [5],
          fillOpacity: 0.2,
        },
        info: "(projection)",
      },
    ];

    // Axes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 60,
    });
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    xRenderer.grid.template.setAll({ location: 1 });
    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
      })
    );

    // Series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis,
        yAxis,
        valueYField: "income",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name} in {categoryX}: {valueY} {info}",
        }),
      })
    );
    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings",
    });
    series1.data.setAll(data);

    let series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Expenses",
        xAxis,
        yAxis,
        valueYField: "expenses",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name} in {categoryX}: {valueY} {info}",
        }),
      })
    );
    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: "strokeSettings",
    });
    series2.data.setAll(data);

    series2.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 3,
          stroke: series2.get("stroke"),
          radius: 5,
          fill: root.interfaceColors.get("background"),
        }),
      })
    );

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);
    series1.appear();

    return () => {
      root.dispose(); // cleanup on unmount
    };
  }, []);

  return <div id="chartdiv" style={{ width: "50%", height: "500px" }}></div>;
};

export default IncomeExpensesChart;
