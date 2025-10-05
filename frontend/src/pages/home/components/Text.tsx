import { motion } from "framer-motion";

export default function Text() {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Heading */}
      <motion.h1
        className="text-4xl text-gray-500 font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Satark - URL Threat Detection & Forensics
      </motion.h1>

      {/* Subheading / Description */}
      <motion.p
        className="text-lg mb-6 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Detect and investigate URL-based cyber-attacks in HTTP traffic using
        IPDR and PCAP analysis. Supports typosquatting, SQL injection, XSS,
        SSRF, command injection, webshells, and more. Hybrid detection with
        rule-based IDS and machine learning models, plus visualization and
        export.
      </motion.p>

      {/* Quick Start / Instructions */}
      <motion.div
        className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6 text-left"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-gray-500">
          Quick Start
        </h2>
        <ul className="list-disc text-gray-400 list-inside space-y-2">
          <li>Upload PCAP files.</li>
          <li>
            Choose analysis profile: <strong>Fast (rules)</strong> or{" "}
            <strong>Thorough (rules + ML)</strong>.
          </li>
          <li>
            Click <strong>Run Analysis</strong> to start detection.
          </li>
          <li>
            Filter results by{" "}
            <strong>attack type, IP, status (attempt/success), or time</strong>.
          </li>
          <li>
            Export results as <strong>CSV</strong> or <strong>JSON</strong> for
            reporting.
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
