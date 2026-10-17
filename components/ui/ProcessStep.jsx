export default function ProcessStep({ step, index }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className="relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
      <div>
        <span className="text-3xl sm:text-4xl font-black text-[#0878d1] tracking-tight block">
          {number}
        </span>
        <h3 className="font-bold text-lg sm:text-xl text-[#08233f] mt-3">
          {step.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
          {step.description}
        </p>
      </div>
      {step.detail && (
        <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
          {step.detail}
        </p>
      )}
    </div>
  );
}
