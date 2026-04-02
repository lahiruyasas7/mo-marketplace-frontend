import { useState } from 'react';
import { useLogin } from '../hooks/auth/useLogin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../hooks/auth/useRegister';
import {
  loginSchema,
  signupSchema,
  type LoginFormValues,
  type SignupFormValues,
} from '../schemas/auth.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    shouldUnregister: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    if (isLogin) {
      loginMutation.mutate(data);
    } else {
      const { confirmPassword, ...payload } = data;
      registerMutation.mutate(payload);
    }
  };

  const loading = loginMutation.isPending || registerMutation.isPending;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <>
            <Input placeholder="First Name" {...register('full_name')} />
            <p className="text-red-500 text-sm mt-1">{errors?.full_name?.message as string}</p>
          </>
        )}

        <Input placeholder="Email" {...register('email')} />
        <p className="text-red-500 text-sm mt-1">{errors?.email?.message as string}</p>

        <Input type="password" placeholder="Password" {...register('password')} />
        <p className="text-red-500 text-sm mt-1">{errors?.password?.message as string}</p>

        {!isLogin && (
          <>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            <p className="text-red-500 text-sm mt-1">{errors?.confirmPassword?.message as string}</p>
          </>
        )}

        <Button disabled={loading}>{loading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}</Button>

        <p onClick={() => setIsLogin(!isLogin)} className="cursor-pointer">
          {isLogin ? 'Create account' : 'Already have account'}
        </p>
      </form>
    </div>
  );
}
