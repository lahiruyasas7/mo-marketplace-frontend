import type { Variant } from '@/types/product.types';

interface Props {
  options: Record<string, string[]>;
  selected: Record<string, string>;
  onChange: (key: string, value: string) => void;
  variants: Variant[];
}

const VariantSelector = ({ options, selected, onChange, variants }: Props) => {
  // Check if option combination is available
  const isOptionAvailable = (key: string, value: string) => {
    const tempSelection = { ...selected, [key]: value };

    return variants.some((variant) => {
      return Object.entries(tempSelection).every(([k, v]) => variant.options[k] === v);
    });
  };

  return (
    <div className="space-y-4">
      {Object.entries(options).map(([key, values]) => (
        <div key={key}>
          <p className="font-medium mb-1 capitalize">{key}</p>

          <div className="flex gap-2 flex-wrap">
            {values.map((value) => {
              const isSelected = selected[key] === value;
              const available = isOptionAvailable(key, value);

              return (
                <button
                  key={value}
                  disabled={!available}
                  onClick={() => onChange(key, value)}
                  className={`px-3 py-1 border rounded cursor-pointer
                    ${isSelected ? 'bg-black text-white' : ''}
                    ${!available ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
