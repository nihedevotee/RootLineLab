export default function BrowserMockup({
  url = 'https://rootlinelab.com/platform',
  title = 'Enterprise Platform',
  children,
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border border-[#146375]/20 bg-[#0B2A33] shadow-2xl shadow-[#06161B]/60 overflow-hidden text-left ${className}`}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#06161B]/90 border-b border-white/10 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
        </div>

        {/* Address bar */}
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono max-w-[280px] sm:max-w-md w-full mx-2 justify-center truncate">
          <span className="w-2 h-2 rounded-full bg-[#99CB5B]" />
          <span className="truncate">{url}</span>
        </div>

        {/* Header right badge */}
        <div className="text-[11px] font-mono text-[#D4EA50] hidden sm:block">
          ● LIVE
        </div>
      </div>

      {/* Browser Body / Inner Preview */}
      <div className="p-4 sm:p-6 bg-[#0B2A33] text-[#FBFAF2]">
        {children || (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#99CB5B] font-semibold">
                  Analytics & Telemetry
                </p>
                <h4 className="text-lg sm:text-xl font-bold text-white">{title}</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3C8D70]/30 text-[#D4EA50] border border-[#3C8D70]/40">
                Synchronized
              </span>
            </div>

            {/* Metric row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-neutral-400">Total Throughput</p>
                <p className="text-base sm:text-lg font-bold text-white mt-1">99.98%</p>
                <span className="text-[10px] text-[#99CB5B]">↑ 4.2% faster</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-neutral-400">Response Latency</p>
                <p className="text-base sm:text-lg font-bold text-[#D4EA50] mt-1">42ms</p>
                <span className="text-[10px] text-neutral-400">Global edge</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-neutral-400">Active Nodes</p>
                <p className="text-base sm:text-lg font-bold text-white mt-1">12 / 12</p>
                <span className="text-[10px] text-[#99CB5B]">Operational</span>
              </div>
            </div>

            {/* Simulated Chart visual */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
                <span>Real-time Request Traffic</span>
                <span className="text-[#99CB5B]">Sub-second Sync</span>
              </div>
              <svg viewBox="0 0 400 90" className="w-full h-16 sm:h-20" fill="none">
                <path
                  d="M0 70 Q 50 30, 100 50 T 200 20 T 300 45 T 400 15 L 400 90 L 0 90 Z"
                  fill="url(#gradient-chart)"
                  opacity="0.35"
                />
                <path
                  d="M0 70 Q 50 30, 100 50 T 200 20 T 300 45 T 400 15"
                  stroke="#D4EA50"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4EA50" />
                    <stop offset="100%" stopColor="#146375" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
