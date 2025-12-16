import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import {
  POKEMON_TYPES,
  SORT_BY_OPTIONS,
  ORDER_OPTIONS,
} from '../utils/pokemonColors';

import usePokemonList from '../hooks/usePokemonList';
import useDebounce from '../hooks/useDebounce';

const PER_PAGE = 10;

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [mergedData, setMergedData] = useState([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, order, type]);

  const { data, isLoading, isFetching } = usePokemonList({
    page,
    per_page: PER_PAGE,
    q: debouncedSearch,
    sort: sortBy,
    order,
    type,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page === 1) {
      setMergedData(data?.data || []);
    } else if (data?.data) {
      setMergedData((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, mb: 4, width: '30%' }}>
            <TextField
              fullWidth
              placeholder='Search By Name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexGrow: 1 }}>
            <TextField
              select
              label='Sort By'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ width: '20%' }}
            >
              {SORT_BY_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label='Order'
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              sx={{ width: '20%' }}
            >
              {ORDER_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label='Type'
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ width: '20%' }}
            >
              <option value=''>All</option>
              {POKEMON_TYPES.map((ptype) => (
                <MenuItem
                  key={ptype}
                  value={ptype}
                >
                  {ptype}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Loader */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Cards */}
        <Grid
          container
          spacing={3}
        >
          {mergedData?.map((pokemon) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={pokemon.id}
            >
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>

        {/* Load More */}
        {data?.data?.length >= PER_PAGE && (
          <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
            <Button
              variant='outlined'
              onClick={handleLoadMore}
              disabled={isFetching}
              sx={{
                background: '#ce416b',
                color: '#fff',
                borderColor: '#ce416b',
                borderRadius: '16px',
                '&:hover': { background: '#ce416b', borderColor: '#ce416b' },
              }}
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
