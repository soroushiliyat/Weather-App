import { useState } from 'react';

type Props = {
  onSearch: (city: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (<form
  onSubmit={handleSubmit}
  className="flex gap-2 items-center justify-center mb-6"
>
  <input
    type="text"
    placeholder="Enter city name..."
    value={city}
    onChange={(e) => setCity(e.currentTarget.value)}
    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-sm"
  />
  <button
    type="submit"
    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
  >
    🔍 Search
  </button>
</form>
  );
}