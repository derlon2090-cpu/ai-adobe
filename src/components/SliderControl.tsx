type SliderControlProps = {
  label: string;
  value: string | number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export function SliderControl({ label, value, min = 0, max = 100, step = 1, onChange }: SliderControlProps) {
  return (
    <label className="grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-white/82">{label}</span>
        <span className="value-badge">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={Number(value)} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
