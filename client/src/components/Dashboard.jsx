import { useEffect, useState } from 'react';
import Navbar from './Navbar';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import usePokemonList from '../hooks/usePokemonList';
import PokemonCard from './PokemonCard';

const PER_PAGE = 10;

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [mergedData, setMergedData] = useState([]);

  const { data, isLoading, isFetching } = usePokemonList({
    page,
    per_page: PER_PAGE,
    q: query,
  });

  const handleSearch = () => {
    setPage(1);
    setQuery(search);
  };

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
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder='Search Pokemon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={handleSearch}
          >
            Search
          </Button>
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
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant='outlined'
              onClick={handleLoadMore}
              disabled={isFetching}
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
