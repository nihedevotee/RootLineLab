export default function PhoneMockup({
  appName = 'Rootline Mobile',
  className = '',
}) {
  return (
    <div
      className={`relative w-[260px] sm:w-[290px] h-[520px] sm:h-[560px] rounded-[44px] bg-[#0E3D47] border-[6px] border-[#3C8D70]/40 shadow-2xl shadow-[#0E3D47]/80 overflow-hidden flex flex-col select-none text-left ${className}`}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black/60 rounded-full z-20 flex items-center justify-between px-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-[#3C8D70]" />
      </div>

      {/* Screen Area */}
      <div className="flex-1 bg-gradient-to-b from-[#146375] to-[#0E3D47] text-white p-4 pt-10 flex flex-col justify-between overflow-hidden">
        {/* Top Header */}
        <div>
          <div className="flex justify-between items-center text-[10px] text-neutral-400 font-medium mb-3">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <span className="w-3.5 h-2 rounded-xs border border-white/60 inline-block" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-[#99CB5B] font-semibold uppercase tracking-wider">
                {appName}
              </p>
              <h5 className="text-sm font-bold text-white">Operations Hub</h5>
            </div>
            <span className="w-7 h-7 rounded-full bg-[#146375] flex items-center justify-center text-[11px] font-bold text-[#D4EA50]">
              RL
            </span>
          </div>

          {/* Quick Balance Card */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-3">
            <p className="text-[10px] text-neutral-400">Synchronized Balance</p>
            <p className="text-xl font-bold text-white tracking-tight mt-0.5">$84,290.00</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[#3C8D70]/30 text-[#D4EA50]">
                +14.8% this month
              </span>
            </div>
          </div>

          {/* Activity items */}
          <div className="space-y-2">
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
              Live Activity
            </p>
            {[
              { label: 'Dispatch Order #4820', status: 'Delivered', time: '2m ago' },
              { label: 'POS Terminal Sync', status: 'Reconciled', time: '14m ago' },
              { label: 'Client Portal Signin', status: 'Authorized', time: '41m ago' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs"
              >
                <div>
                  <p className="text-[11px] font-medium text-white truncate max-w-[130px]">
                    {item.label}
                  </p>
                  <span className="text-[9px] text-[#99CB5B]">{item.status}</span>
                </div>
                <span className="text-[9px] text-neutral-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="flex items-center justify-around py-2 border-t border-white/10 text-[9px] text-neutral-400">
          <div className="text-[#D4EA50] font-semibold flex flex-col items-center">
            <span className="w-1 h-1 rounded-full bg-[#D4EA50] mb-0.5" />
            Home
          </div>
          <span>Orders</span>
          <span>Analytics</span>
          <span>Settings</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full" />
    </div>
  );
}
