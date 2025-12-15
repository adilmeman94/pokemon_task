import { useMutation } from 'react-query';
import { Base_URL } from '../config';

const __useLoginApi = async (loginData) => {
  let body = {
    email: loginData.email,
    password: loginData.password,
  };

  const response = await fetch(`${Base_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

const useLogin = (mutationOptions) => {
  return useMutation(async (loginData) => await __useLoginApi(loginData), {
    ...mutationOptions,
    onSuccess: (data) => {
      mutationOptions?.onSuccess?.(data);
    },
    onError: (err) => {
      mutationOptions?.onError?.(err);
      console.log(err, 'err');
    },
  });
};

export default useLogin;
