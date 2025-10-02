import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const XY = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new(chartRef.current);

    // Custom theme rules
    const myTheme = am5.Theme.new(root);

    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    myTheme.rule("Grid", ["x"]).setAll({
      strokeOpacity: 0.05,
    });

    myTheme.rule("Grid", ["x", "minor"]).setAll({
      strokeOpacity: 0.05,
    });

    // Apply themes
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        maxTooltipDistance: 0,
        pinchZoomX: true,
      })
    );

    // Data helpers
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 4.2 + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count) {
      let data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add multiple line series
    for (let i = 0; i < 10; i++) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series " + i,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          legendValueText: "{valueY}",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}",
          }),
        })
      );

      // reset data per series
      date = new Date();
      date.setHours(0, 0, 0, 0);
      value = 0;

      series.data.setAll(generateDatas(100));
      series.appear();
    }

    // Cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);

    // Scrollbars
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );
    chart.set(
      "scrollbarY",
      am5.Scrollbar.new(root, { orientation: "vertical" })
    );

    // Legend
    let legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 200,
        paddingLeft: 15,
        height: am5.percent(100),
      })
    );

    legend.itemContainers.template.events.on("pointerover", function (e) {
      let series = e.target.dataItem.dataContext;
      chart.series.each(function (chartSeries) {
        if (chartSeries !== series) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000),
          });
        } else {
          chartSeries.strokes.template.setAll({ strokeWidth: 3 });
        }
      });
    });

    legend.itemContainers.template.events.on("pointerout", function () {
      chart.series.each(function (chartSeries) {
        chartSeries.strokes.template.setAll({
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: chartSeries.get("fill"),
        });
      });
    });

    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: "right",
    });

    legend.data.setAll(chart.series.values);

    // Animate chart
    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default XY;
