import { MagnifyingGlass } from '@phosphor-icons/react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <span className="search-icon">
        <MagnifyingGlass size={20} />
      </span>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar templates..."
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
