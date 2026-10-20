import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  href,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'link' | 'dark-secondary'
  size = 'md',        // 'sm' | 'md' | 'lg'
  className = '',
  iconRight,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 rounded-full gap-1.5',
    md: 'text-sm sm:text-base px-6 py-3 rounded-full gap-2',
    lg: 'text-base sm:text-lg px-8 py-4 rounded-full gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#146375] text-[#FBFAF2] hover:bg-[#3C8D70] hover:shadow-lg hover:shadow-[#146375]/25 border border-transparent focus-visible:ring-[#3C8D70]',
    secondary:
      'bg-transparent text-[#146375] border-2 border-[#146375] hover:bg-[#146375] hover:text-[#FBFAF2] focus-visible:ring-[#146375]',
    'dark-secondary':
      'bg-transparent text-[#FBFAF2] border-2 border-[#3C8D70] hover:bg-[#3C8D70] hover:text-white focus-visible:ring-[#D4EA50]',
    ghost:
      'bg-transparent text-[#146375] hover:bg-[#EEF3EE] border border-transparent focus-visible:ring-[#146375]',
    lime:
      'bg-[#D4EA50] text-[#146375] font-semibold hover:bg-[#99CB5B] hover:shadow-lg hover:shadow-[#D4EA50]/30 border border-transparent focus-visible:ring-[#146375]',
    link:
      'p-0 bg-transparent text-[#146375] hover:text-[#3C8D70] font-medium inline-flex items-center gap-1 group/link',
  };

  const combinedStyles = cn(
    baseStyles,
    variant !== 'link' && sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {variant === 'link' ? (
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      ) : (
        iconRight
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      {...props}
    >
      {content}
    </button>
  );
}
