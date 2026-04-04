import type { CreateProductFormValues } from '@/schemas/product.schema';
import type { FieldErrors, UseFieldArrayReturn, UseFormRegister } from 'react-hook-form';
import { Input } from '../ui/input';

interface Props {
  fieldArray: UseFieldArrayReturn<CreateProductFormValues, 'variants'>;
  register: UseFormRegister<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
}

const VariantForm = ({ fieldArray, register, errors }: Props) => {
  const { fields, append, remove } = fieldArray;

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-xl gap-2 flex flex-col">
          <h4 className="font-semibold mb-2">Variant {index + 1}</h4>

          {/* Options */}
          <Input
            placeholder="Color"
            className="border p-2 mr-2"
            {...register(`variants.${index}.options.color`)}
          />
          {errors.variants?.[index]?.options?.color && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants?.[index]?.options?.color?.message}
            </p>
          )}

          <Input
            placeholder="Size"
            className="border p-2 mr-2"
            {...register(`variants.${index}.options.size`)}
          />
          {errors.variants?.[index]?.options?.size && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants?.[index]?.options?.size?.message}
            </p>
          )}

          <Input
            placeholder="Material"
            className="border p-2"
            {...register(`variants.${index}.options.material`)}
          />
          {errors.variants?.[index]?.options?.material && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants?.[index]?.options?.material?.message}
            </p>
          )}

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>

            <Input
              type="number"
              placeholder="Price"
              className="border p-2 mr-2"
              {...register(`variants.${index}.price`, {
                valueAsNumber: true,
              })}
            />
            {errors.variants?.[index]?.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.variants?.[index]?.price?.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <Input
              type="number"
              placeholder="Stock"
              className="border p-2 mr-2"
              {...register(`variants.${index}.stock`, {
                valueAsNumber: true,
              })}
            />
            {errors.variants?.[index]?.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.variants?.[index]?.stock?.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 ml-2 cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            options: {
              color: '',
              size: '',
              material: '',
            },
            price: 0,
            stock: 0,
          })
        }
        className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
      >
        + Add Variant
      </button>
    </div>
  );
};

export default VariantForm;
