import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { POKEMON_TYPE_COLORS } from '../utils/pokemonColors';

const PokemonCard = ({ pokemon }) => {
  const primaryType = pokemon.type[0];
  const color = POKEMON_TYPE_COLORS[primaryType] || '#ccc';

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 4,
        position: 'relative',
        height: 320,
        width: 250,
      }}
    >
      {/* Top colored section */}
      <Box
        sx={{
          backgroundColor: color,
          height: '55%',
          position: 'relative',
        }}
      >
        {/* Pokemon ID */}
        <Typography
          sx={{
            position: 'absolute',
            top: 12,
            right: 16,
            color: '#fff',
            fontWeight: 600,
          }}
        >
          #{String(pokemon.id).padStart(3, '0')}
        </Typography>

        {/* Pokemon Image */}
        <Box
          component="img"
          src={pokemon.image.hires}
          alt={pokemon.name.english}
          sx={{
            height: 150,
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>

      {/* Bottom white section */}
      <Box
        sx={{
          backgroundColor: '#fff',
          height: '45%',
          pt: 4,
          textAlign: 'center',
        }}
      >
        {/* Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color,
          }}
        >
          {pokemon.name.english}
        </Typography>

        {/* Type pill */}
        <Box sx={{ mt: 1 }} gap={1} display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">         
          {pokemon.type.map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              sx={{
                backgroundColor: POKEMON_TYPE_COLORS[type],
                color: '#fff',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>         
      </Box>
    </Card>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonCard;
