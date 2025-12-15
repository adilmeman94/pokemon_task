import { useQuery } from 'react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const fetchPokemonList = async ({ queryKey }) => {
  const [_key, { page = 1, per_page = 10, q = '' }, token] = queryKey;

  const params = new URLSearchParams();

  if (page) params.append('page', page);
  if (per_page) params.append('per_page', per_page);
  if (q) params.append('q', q);

  const response = await fetch(
    `${Base_URL}/pokemon?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }

  return response.json();
};

const usePokemonList = ({ page, per_page, q }, queryOptions = {}) => {
  const { token } = useAuth();

  return useQuery(
    ['pokemonList', { page, per_page, q }, token],
    fetchPokemonList,
    {
      enabled: !!token, // only call API when token exists
      keepPreviousData: true, // good for pagination
      ...queryOptions,
    }
  );
};

export default usePokemonList;
