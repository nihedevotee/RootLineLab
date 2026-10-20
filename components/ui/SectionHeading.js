import { cn } from '@/lib/utils';

export default function SectionHeading({
  kicker,
  title,
  subhead,
  align = 'center', // 'left' | 'center' | 'right'
  theme = 'light',  // 'light' | 'dark'
  titleAs: Component = 'h2',
  className = '',
  kickerClassName = '',
  titleClassName = '',
  subheadClassName = '',
}) {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const kickerStyles =
    theme === 'dark'
      ? 'text-[#D4EA50] bg-[#146375]/40 border border-[#3C8D70]/40'
      : 'text-[#146375] bg-[#EEF3EE] border border-[#146375]/15';

  const titleStyles =
    theme === 'dark' ? 'text-white' : 'text-[#0B2A33]';

  const subheadStyles =
    theme === 'dark' ? 'text-neutral-300' : 'text-[#0B2A33]/80';

  return (
    <div
      className={cn(
        'flex flex-col max-w-3xl mb-12 sm:mb-16 lg:mb-20',
        alignStyles[align],
        className
      )}
    >
      {kicker && (
        <span
          className={cn(
            'inline-flex items-center text-xs sm:text-sm font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4 sm:mb-5',
            kickerStyles,
            kickerClassName
          )}
        >
          {kicker}
        </span>
      )}

      <Component
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08]',
          titleStyles,
          titleClassName
        )}
      >
        {title}
      </Component>

      {subhead && (
        <p
          className={cn(
            'mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed',
            subheadStyles,
            subheadClassName
          )}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
