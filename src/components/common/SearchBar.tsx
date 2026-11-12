import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search games, developers…' }: Props) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search games"
        className="input-gv !rounded-2xl !py-4 !pr-12 !pl-12 text-base shadow-lg shadow-neon/10 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-muted hover:bg-white/10 hover:text-white"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
