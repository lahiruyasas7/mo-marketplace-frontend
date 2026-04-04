import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createProductSchema, type CreateProductFormValues } from '../schemas/product.schema';

import VariantForm from '../components/product/VariantForm';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { FileImage, Upload, X } from 'lucide-react';

const CreateProductPage = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { mutate, isPending, error } = useCreateProduct();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      variants: [
        {
          options: {
            color: '',
            size: '',
            material: '',
          },
          price: 0,
          stock: 0,
        },
      ],
    },
    mode: 'onSubmit', // you can change to 'onChange' for live validation
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const onSubmit: SubmitHandler<CreateProductFormValues> = (data) => {
    if (uploadedImage) {
      data.productImage = uploadedImage;
    }
    mutate(data, {
      onSuccess: () => {
        toast.success('Product created successfully');

        form.reset({
          name: '',
          description: '',
          variants: [
            {
              options: {
                color: '',
                size: '',
                material: '',
              },
              price: 0,
              stock: 0,
            },
          ],
        });
        setUploadedImage(null);
      },

      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Something went wrong');
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log('errors', errors);

  //post image handler
  const productImageHandler = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedImage(file);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <Input placeholder="Product Name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium">Product Image</label>

          <div className="flex items-center gap-3">
            {/* Upload Box */}
            <label className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-50">
              <Upload size={18} />
              <span>{uploadedImage ? 'Change Image' : 'Upload Image'}</span>

              <input
                type="file"
                accept="image/*"
                onChange={productImageHandler}
                className="hidden"
              />
            </label>

            {/* File Info */}
            {uploadedImage ? (
              <div className="flex items-center gap-2 px-3 py-2 border rounded bg-gray-50">
                <FileImage size={18} className="text-green-600" />

                <span className="text-sm max-w-[150px] truncate">{uploadedImage.name}</span>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 border rounded text-gray-400">
                <FileImage size={18} />
                <span className="text-sm">No file selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Variants */}
        <VariantForm fieldArray={fieldArray} register={register} errors={errors} />

        {/* Global Error */}
        {error && <p className="text-red-500 text-sm">{(error as any)?.response?.data?.message}</p>}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded cursor-pointer"
        >
          {isPending ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
