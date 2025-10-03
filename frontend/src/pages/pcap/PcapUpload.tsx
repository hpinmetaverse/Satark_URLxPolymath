import React, { useCallback, useState, useRef } from "react";
import { Trash2 } from "lucide-react";

type UploadStatus = "idle" | "validating" | "uploading" | "done" | "error";

export default function PcapUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const MAX_SIZE_BYTES = 150 * 1024 * 1024; // 150MB default limit
  const ALLOWED_EXT = [".pcap", ".pcapng"];

  function humanFileSize(bytes: number) {
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (
      (bytes / Math.pow(1024, i)).toFixed(2) +
      " " +
      ["B", "KB", "MB", "GB", "TB"][i]
    );
  }

  const validateFile = useCallback((f: File) => {
    setError(null);
    const lower = f.name.toLowerCase();
    if (!ALLOWED_EXT.some((ext) => lower.endsWith(ext))) {
      return "Invalid file type. Only .pcap and .pcapng allowed.";
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File too large. Maximum allowed is ${humanFileSize(
        MAX_SIZE_BYTES
      )}.`;
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
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Upload PCAP</h1>
          <div className="text-sm text-gray-500">
            Accepted: .pcap, .pcapng — Max {humanFileSize(MAX_SIZE_BYTES)}
          </div>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-400 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pcap,.pcapng"
            className="hidden"
            onChange={handleInputChange}
          />

          <div className="flex items-center gap-4 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16V4m0 0L3 8m4-4 4 4m6 8v4m0 0l4-4m-4 4-4-4"
              />
            </svg>
            <div>
              <div className="font-semibold">
                Drag & drop a PCAP file here, or click to browse
              </div>
              <div className="text-sm text-gray-500">
                Tip: use recordings from your DVWA testing or capture tools.
              </div>
            </div>
          </div>
        </div>

        {file && (
          <div className="bg-gray-100 border border-gray-300 p-4 rounded-md flex items-center justify-between mt-4">
            <div>
              <div className="font-medium">{file.name}</div>
              <div className="text-sm text-gray-500">
                {humanFileSize(file.size)} • {file.type || "unknown"}
              </div>
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-red-600 hover:bg-red-100"
              onClick={() => {
                setFile(null);
                setError(null);
              }}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {status === "uploading" && (
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-4">
            <div
              className="h-3 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}
