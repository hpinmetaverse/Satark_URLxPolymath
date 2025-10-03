import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import { Trash2 } from "lucide-react";
import Footer from "../footer/Footer";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type UploadStatus =
  | "idle"
  | "validating"
  | "uploading"
  | "processing"
  | "done"
  | "error";

type AttackResult = {
  type: string;
  ip: string;
  url: string;
  status: "Attempt" | "Success";
};

// Pie Chart Component
const PieChart = ({
  data,
}: {
  data: { category: string; value: number }[];
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        paddingTop: 20,
        paddingBottom: 20,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: true,
        calculateAggregates: true,
      })
    );

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0xffffff),
    });

    series.labelsContainer.set("paddingTop", 30);
    series.labels.template.set("fontSize", 12);

    series.slices.template.adapters.add("radius", (radius, target) => {
      const high = (series.getPrivate("valueHigh") as number) ?? 1;
      const value = (target.dataItem?.get("valueWorking") as number) ?? 0;
      return (radius * value) / high;
    });

    series.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        layout: root.horizontalLayout,
        marginTop: 15,
        marginBottom: 15,
      })
    );

    // Responsive legend settings
    legend.labels.template.setAll({
      fontSize: 12,
      maxWidth: 120,
      textOverflow: "ellipsis",
    });

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    // Handle resize
    const handleResize = () => {
      if (chartRef.current) {
        const containerWidth = chartRef.current.clientWidth;

        // Adjust legend layout based on container width
        if (containerWidth < 640) {
          // Mobile: horizontal layout with smaller font
          legend.set("layout", root.horizontalLayout);
          legend.labels.template.set("fontSize", 10);
          series.labels.template.set("fontSize", 10);
        } else if (containerWidth < 768) {
          // Tablet: horizontal layout
          legend.set("layout", root.horizontalLayout);
          legend.labels.template.set("fontSize", 11);
          series.labels.template.set("fontSize", 11);
        } else {
          // Desktop: default layout
          legend.set("layout", root.horizontalLayout);
          legend.labels.template.set("fontSize", 12);
          series.labels.template.set("fontSize", 12);
        }

        root.resize();
      }
    };

    // Initial resize
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="w-full">
      <div
        ref={chartRef}
        className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 min-h-[12rem]"
      />
    </div>
  );
};

// Main Component
export default function PcapUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [results, setResults] = useState<AttackResult[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const MAX_SIZE_BYTES = 10 * 1024 * 1024;
  const ALLOWED_EXT = [".pcap", ".pcapng"];

  const humanFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (
      (bytes / Math.pow(1024, i)).toFixed(2) +
      " " +
      ["B", "KB", "MB", "GB", "TB"][i]
    );
  };

  const validateFile = useCallback((f: File) => {
    setError(null);
    const lower = f.name.toLowerCase();
    if (!ALLOWED_EXT.some((ext) => lower.endsWith(ext))) {
      return "Invalid file type. Only .pcap and .pcapng allowed.";
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File too large. Max ${humanFileSize(MAX_SIZE_BYTES)}.`;
    }
    return null;
  }, []);

  const onFile = useCallback(
    (f: File) => {
      const err = validateFile(f);
      if (err) {
        setFile(null);
        setError(err);
        return;
      }
      setFile(f);
      setError(null);
      setProgress(0);
      setStatus("idle");
      setResults([]);
    },
    [validateFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    onFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer.files || !e.dataTransfer.files[0]) return;
    onFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleAnalyze = () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(30);

    setTimeout(() => {
      setStatus("processing");
      setProgress(70);

      setTimeout(() => {
        setStatus("done");
        setProgress(100);

        setResults([
          {
            type: "SQL Injection",
            ip: "192.168.1.2",
            url: "/login.php",
            status: "Success",
          },
          {
            type: "XSS",
            ip: "192.168.1.5",
            url: "/search?q=<script>",
            status: "Attempt",
          },
          { type: "SSRF", ip: "10.0.0.12", url: "/fetch", status: "Success" },
          {
            type: "Brute Force",
            ip: "192.168.1.8",
            url: "/admin",
            status: "Attempt",
          },
          {
            type: "Path Traversal",
            ip: "192.168.1.3",
            url: "/../../etc/passwd",
            status: "Success",
          },
        ]);
      }, 1000);
    }, 1000);
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;
    const csv = [
      ["Type", "IP", "URL", "Status"],
      ...results.map((r) => [r.type, r.ip, r.url, r.status]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pcap_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (results.length === 0) return;
    const jsonStr = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pcap_results.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Prepare pie chart data
  const pieData = results.reduce<{ category: string; value: number }[]>(
    (acc, curr) => {
      const existing = acc.find((a) => a.category === curr.status);
      if (existing) existing.value += 1;
      else acc.push({ category: curr.status, value: 1 });
      return acc;
    },
    []
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-5xl mx-auto w-full px-3 xs:px-4 sm:px-6">
        {/* Instructions */}
        <div className="max-w-2xl mx-auto text-center py-6 xs:py-8 px-3 xs:px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-400 mb-3 xs:mb-4">
            Upload Your PCAP Files
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-gray-500 px-2">
            Analyze potential security threats safely and efficiently. Supported
            formats: <span className="font-medium">.pcap</span>,{" "}
            <span className="font-medium">.pcapng</span>. Max size:{" "}
            {humanFileSize(MAX_SIZE_BYTES)}.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-200 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 xs:mb-4 gap-2 xs:gap-0">
            <h1 className="text-xl xs:text-2xl text-gray-600 font-bold">
              Upload PCAP
            </h1>
            <span className="text-xs xs:text-sm text-gray-500">
              Accepted: .pcap, .pcapng — Max {humanFileSize(MAX_SIZE_BYTES)}
            </span>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pcap,.pcapng"
              className="hidden"
              onChange={handleInputChange}
            />
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 xs:gap-4 text-gray-600">
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m2 0a2 2 0 012 2v6H5v-6a2 2 0 012-2h6z"
                  />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-sm xs:text-base">
                  Drag & drop a PCAP file here, or click to browse
                </div>
                <div className="text-xs xs:text-sm text-gray-500 mt-1">
                  Tip: use recordings from DVWA or Wireshark.
                </div>
              </div>
            </div>
          </div>

          {file && (
            <div className="bg-gray-50 border border-gray-200 p-3 xs:p-4 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 xs:mt-4 shadow-sm gap-2 xs:gap-0">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm xs:text-base break-words truncate">
                  {file.name}
                </div>
                <div className="text-xs xs:text-sm text-gray-500">
                  {humanFileSize(file.size)} • {file.type || "unknown"}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 mt-2 xs:mt-0">
                <button
                  onClick={handleAnalyze}
                  disabled={status === "uploading" || status === "processing"}
                  className={`px-3 xs:px-4 py-2 rounded-md text-xs xs:text-sm flex items-center justify-center gap-2 ${
                    status === "uploading" || status === "processing"
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-gray-300 text-black hover:bg-white"
                  }`}
                >
                  {status === "uploading"
                    ? "Uploading..."
                    : status === "processing"
                    ? "Processing..."
                    : "ANALYZE"}
                </button>

                <button
                  onClick={() => {
                    setFile(null);
                    setError(null);
                  }}
                  className="p-2 rounded-md text-red-600 hover:bg-red-100 flex items-center justify-center"
                >
                  <Trash2 className="w-4 xs:w-5 h-4 xs:h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-200 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
            <p className="mb-2 text-xs xs:text-sm text-gray-500">
              Summary of detected attack attempts and successful exploits.
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 xs:mb-4 gap-2 xs:gap-0">
              <h2 className="text-lg xs:text-xl font-bold">Analysis Results</h2>
              <div className="flex flex-row gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs xs:text-sm"
                >
                  Export CSV
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs xs:text-sm"
                >
                  Export JSON
                </button>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto mb-4 xs:mb-6 -mx-2 xs:mx-0">
              <div className="min-w-[500px] px-2 xs:px-0">
                <table className="w-full text-left border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2 text-xs xs:text-sm">Type</th>
                      <th className="border p-2 text-xs xs:text-sm">
                        Source IP
                      </th>
                      <th className="border p-2 text-xs xs:text-sm">URL</th>
                      <th className="border p-2 text-xs xs:text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border p-2 text-xs xs:text-sm">
                          {r.type}
                        </td>
                        <td className="border p-2 text-xs xs:text-sm font-mono">
                          {r.ip}
                        </td>
                        <td className="border p-2 text-xs xs:text-sm break-all">
                          {r.url}
                        </td>
                        <td className="border p-2 text-xs xs:text-sm">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              r.status === "Success"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="mt-6 xs:mt-8">
              <h3 className="text-lg font-semibold mb-3 xs:mb-4 text-gray-700">
                Attack Status Distribution
              </h3>
              <PieChart data={pieData} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
