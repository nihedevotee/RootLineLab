export default function ErpMockup({ className = '' }) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border border-[#146375]/30 bg-[#06161B] shadow-2xl p-4 sm:p-6 text-white text-left ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#99CB5B] font-semibold">
            Enterprise Resource Planning
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">Multi-Branch Inventory & Ledger</h4>
        </div>
        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#146375]/50 text-[#D4EA50] border border-[#3C8D70]/40">
          Node: DHAKA-CENTRAL
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {/* Table Mockup */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400">
                <th className="pb-2 font-medium">SKU / Item</th>
                <th className="pb-2 font-medium">Location</th>
                <th className="pb-2 font-medium">Available</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {[
                { sku: 'RTL-CORE-01', loc: 'Gulshan Depot', qty: '1,240 pcs', status: 'Optimal', color: 'text-[#99CB5B]' },
                { sku: 'RTL-SENS-88', loc: 'Uttara Hub', qty: '420 pcs', status: 'Reorder Trig', color: 'text-[#D4EA50]' },
                { sku: 'RTL-MOD-14', loc: 'Motijheel Store', qty: '2,900 pcs', status: 'Optimal', color: 'text-[#99CB5B]' },
                { sku: 'RTL-DISP-09', loc: 'In Transit', qty: '650 pcs', status: 'Dispatching', color: 'text-neutral-300' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 text-white font-medium">{row.sku}</td>
                  <td className="py-2.5 text-neutral-400 font-sans">{row.loc}</td>
                  <td className="py-2.5 text-neutral-200">{row.qty}</td>
                  <td className={`py-2.5 ${row.color}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Audit status strip */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px]">
          <span className="text-neutral-400">Cryptographic Ledger Integrity</span>
          <span className="text-[#D4EA50] font-mono">✓ Verified Hash 0x9f...4a</span>
        </div>
      </div>
    </div>
  );
}
