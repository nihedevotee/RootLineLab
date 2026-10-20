import { cn } from '@/lib/utils';

export default function Section({
  children,
  id,
  theme = 'light', // 'light' | 'dark' | 'cream' | 'mist' | 'gradient-dark'
  className = '',
  py = 'default',   // 'sm' | 'default' | 'lg' | 'xl' | 'none'
  ...props
}) {
  const themeStyles = {
    light: 'bg-[#FBFAF2] text-[#0B2A33]',
    mist: 'bg-[#EEF3EE] text-[#0B2A33]',
    cream: 'bg-[#F5EFB3]/40 text-[#0B2A33]',
    dark: 'bg-[#06161B] text-[#FBFAF2] dark-section',
    'gradient-dark': 'bg-gradient-to-b from-[#06161B] via-[#0B2A33] to-[#06161B] text-[#FBFAF2] dark-section',
    teal: 'bg-[#146375] text-[#FBFAF2] dark-section',
  };

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-12 sm:py-16',
    default: 'py-20 sm:py-28 lg:py-32',
    lg: 'py-24 sm:py-36 lg:py-44',
    xl: 'py-28 sm:py-44 lg:py-52',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-300',
        themeStyles[theme],
        paddingStyles[py],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
