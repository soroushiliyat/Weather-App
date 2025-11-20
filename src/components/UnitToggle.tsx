type Props = {
  unit: "metric" | "imperial";
  onToggle: () => void;
};

export default function UnitToggle({ unit, onToggle }: Props) {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onToggle}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        Switch to {unit === "metric" ? "Imperial (°F, mph)" : "Metric (°C, km/h)"}
      </button>
    </div>
  );
}