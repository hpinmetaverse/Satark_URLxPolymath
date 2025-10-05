export default function Text() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 text-center mt-6">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-400 tracking-wide mb-6">
        SatarkURL
      </h1>

      {/* Subheading / Description */}
      <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed ">
        Unmasking Cyber Threats, Instantly
      </p>

      {/* Quick Start / Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 mb-6 text-left">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-500">
          Quick Start
        </h2>
        <ul className="text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="min-w-[6px] h-[6px] bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>Upload PCAP files.</span>
          </li>
          <li className="flex items-start">
            <span className="min-w-[6px] h-[6px] bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>
              Choose analysis profile: <strong>Fast (rules)</strong> or{" "}
              <strong>Thorough (rules + ML)</strong>.
            </span>
          </li>
          <li className="flex items-start">
            <span className="min-w-[6px] h-[6px] bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>
              Click <strong>Run Analysis</strong> to start detection.
            </span>
          </li>
          <li className="flex items-start">
            <span className="min-w-[6px] h-[6px] bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>
              Filter results by{" "}
              <strong>
                attack type, IP, status (attempt/success), or time
              </strong>
              .
            </span>
          </li>
          <li className="flex items-start">
            <span className="min-w-[6px] h-[6px] bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>
              Receive real-time alerts via Slack/Teams/Telegram/email for
              suspicious or successful attacks.
            </span>
          </li>
          <li className="flex items-start">
            <span className="min-w-[6px] h-[6px] bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>
              Set up automated reporting and exports to generate CSV/JSON.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
