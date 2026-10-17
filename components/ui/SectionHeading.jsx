export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className = '',
}) {
  return (
    <div
      className={`mb-10 md:mb-14 ${
        centered ? 'text-center mx-auto max-w-2xl' : ''
      } ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0878d1] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#08233f] leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
