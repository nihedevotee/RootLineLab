export default function DashboardMockup({ className = '' }) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border border-[#3C8D70]/40 bg-[#0E3D47] shadow-2xl p-4 sm:p-6 text-white text-left ${className}`}
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono text-[#D4EA50] tracking-wider uppercase font-semibold">
            Operational Telemetry
          </span>
          <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Rootline SaaS Analytics
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-[#146375]/40 text-[#99CB5B] border border-[#3C8D70]/40">
            Real-time Engine
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {[
          { label: 'Active Subscriptions', val: '1,420', change: '+12.4%', color: 'text-white' },
          { label: 'Monthly Recurring', val: '$68.4k', change: '+18.2%', color: 'text-[#D4EA50]' },
          { label: 'Uptime SLA', val: '99.99%', change: 'Zero incident', color: 'text-[#99CB5B]' },
          { label: 'API Queries / Sec', val: '3,840', change: 'Load: 24%', color: 'text-white' },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
            <p className="text-[11px] text-neutral-400">{item.label}</p>
            <p className={`text-base sm:text-lg font-bold mt-1 ${item.color}`}>{item.val}</p>
            <p className="text-[10px] text-[#99CB5B] mt-0.5">{item.change}</p>
          </div>
        ))}
      </div>

      {/* Chart visualization */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
          <span>Weekly Event Frequency</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#146375]" />
              Baseline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4EA50]" />
              Throughput
            </span>
          </div>
        </div>

        {/* Bar chart representation */}
        <div className="h-28 flex items-end justify-between gap-2 pt-4">
          {[45, 62, 58, 80, 72, 95, 88, 64, 76, 92, 100, 85].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <div
                style={{ height: `${h}%` }}
                className="w-full rounded-t-sm bg-gradient-to-t from-[#146375] to-[#D4EA50] hover:to-[#99CB5B] transition-all duration-300"
              />
              <span className="text-[9px] text-neutral-500 font-mono hidden sm:inline">
                w{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
