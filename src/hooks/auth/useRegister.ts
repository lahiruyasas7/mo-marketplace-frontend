import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/auth.store';
import { signupApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupApi,
    onSuccess: (res) => {
      setUser(res.user);
      navigate('/products');
    },
    onError: (error) => {
      // Handle error: show toast, log, etc.
      console.error('Register failed:', error);
      clearUser?.();
    },
  });
};
