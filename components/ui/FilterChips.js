'use client';

import { motion } from 'framer-motion';

export default function FilterChips({
  categories = [],
  activeCategory,
  onSelectCategory,
  className = '',
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}
      role="tablist"
      aria-label="Filter categories"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat)}
            className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146375] ${
              isActive
                ? 'text-[#FBFAF2]'
                : 'text-[#0B2A33]/80 hover:text-[#0B2A33] bg-[#EEF3EE] hover:bg-[#EEF3EE]/80'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-[#146375] rounded-full z-0"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
