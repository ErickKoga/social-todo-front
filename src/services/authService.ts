import { ENDPOINTS } from '@/helpers/constants';
import { IAuthenticate, IRegister } from '@/types/auth.types';

export async function register(
  userData: IRegister
): Promise<{ accessToken: string }> {
  console.log(ENDPOINTS);
  const response = await fetch(`${ENDPOINTS.AUTH}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
}

export async function authenticate(
  credentials: IAuthenticate
): Promise<{ accessToken: string }> {
  const response = await fetch(`${ENDPOINTS.AUTH}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
}
