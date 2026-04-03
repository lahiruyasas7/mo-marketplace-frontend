// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { createProductSchema, type CreateProductFormValues } from '../schemas/product.schema';
// import VariantForm from '../components/product/VariantForm';
// import { useCreateProduct } from '@/hooks/products/useCreateProduct';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// const CreateProductPage = () => {
//   const { mutate, isPending, error } = useCreateProduct();

//   const form = useForm<CreateProductFormValues>({
//     resolver: zodResolver(createProductSchema),
//     defaultValues: {
//       name: '',
//       description: '',
//       variants: [
//         {
//           options: {
//             color: '',
//             size: '',
//             material: '',
//           },
//           price: 0,
//           stock: 0,
//         },
//       ],
//     },
//   });

//   const fieldArray = useFieldArray({
//     control: form.control,
//     name: 'variants',
//   });

//   const onSubmit = (data: CreateProductFormValues) => {
//     console.log('click');
//     mutate(data, {
//       onSuccess: () => {
//         alert('Product created successfully');
//         form.reset();
//       },
//       onError: (err: any) => {
//         alert(err?.response?.data?.message || 'Something went wrong');
//       },
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Product</h1>

//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name */}
//         <Input
//           placeholder="Product Name"
//           className="border p-2 w-full"
//           {...form.register('name')}
//         />

//         {/* Description */}
//         <textarea
//           placeholder="Description"
//           className="border p-2 w-full"
//           {...form.register('description')}
//         />

//         {/* Variants */}
//         <VariantForm fieldArray={fieldArray} register={form.register} errors={form.formState.errors}/>

//         {/* Error */}
//         {error && <p className="text-red-500 text-sm">{(error as any)?.response?.data?.message}</p>}

//         {/* Submit */}
//         <Button
//           type="submit"
//           disabled={isPending}
//           className="w-full bg-black text-white py-2 rounded cursor-pointer"
//         >
//           {isPending ? 'Creating...' : 'Create Product'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default CreateProductPage;

import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createProductSchema, type CreateProductFormValues } from '../schemas/product.schema';

import VariantForm from '../components/product/VariantForm';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CreateProductPage = () => {
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

        {/* Variants */}
        <VariantForm fieldArray={fieldArray} register={register} errors={errors} />

        {/* Global Error */}
        {error && <p className="text-red-500 text-sm">{(error as any)?.response?.data?.message}</p>}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded"
        >
          {isPending ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
