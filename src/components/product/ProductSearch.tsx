import { useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
}

const ProductSearch = ({ onSearch }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Search products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="px-4 py-2 bg-black text-white rounded">Search</button>
    </form>
  );
};

export default ProductSearch;
