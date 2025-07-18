'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Spinner } from '@/components/Spinner';
import { fetchUser, selectUserName } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { apiPasswordCreatePath, homePath, signInPath } from '@/paths';
import { CreatePasswordSchema } from '@/schemas/CreatePasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreatePasswordInputs = {
  password: string;
  confirmPassword: string;
}
  
const SetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePasswordInputs>({
    resolver: yupResolver(CreatePasswordSchema),
    mode: "onBlur",
  });

  const token = searchParams.get('token');

  const { data: session } = useSession();
  const user = session?.user;

  const dispatch = useAppDispatch();
  const { firstName, lastName } = useAppSelector(selectUserName);

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace(homePath());
    }

    if (!token) {
      router.replace(homePath());
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/verify-token?token=${token}`);
        const data = await res.json();

        console.log(data);

        if (data.valid) {
          setValid(true);
          dispatch(fetchUser(data.id));
        } else {
          setError(data.error || 'Unknown error');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (loading) return <Spinner/>;

  if (error) return <p style={{ color: 'red' }}>Помилка: {error}</p>;

  if (!valid) return <p style={{ color: 'red' }}>Недійсний токен</p>;

  const onSubmit: SubmitHandler<CreatePasswordInputs> = async (data) => { 
    const response = await fetch(apiPasswordCreatePath(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        token,
      }),
    });
    
    if (response.ok) {
      setIsPassword(true);
    }
  }

  return (
    <div>
      {isPassword ? (
        <>
          <p>Пароль успішно створено</p>
          <Button href={signInPath()}>Перейти на сторінку авторизації</Button>
        </>
      ) : (
          <>
            <h1>Привіт, {firstName} {lastName}!</h1>
            <p>Будь ласка, створіть пароль:</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                register={register}
                label="Пароль"
                name="password"
                type='password'
                placeholder='Придумайте пароль'
                error={errors.password}
              />
              <Input
                register={register}
                label="Повторити пароль"
                name="confirmPassword"
                type='password'
                placeholder='Повтори пароль'
                error={errors.confirmPassword}
              />
              <Button type="submit">Зберегти</Button>
            </form>
        </>
      )}
    </div>
  );
};

export default SetPasswordPage;