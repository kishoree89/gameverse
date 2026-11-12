import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { useToast } from '../../hooks/useToast';
import type { Game } from '../../types';

interface Props {
  game: Game;
  withLabel?: boolean;
}

export default function FavoriteButton({ game, withLabel }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const toast = useToast();
  const fav = isFavorite(game.id);

  const onClick = () => {
    const added = toggleFavorite(game.id);
    toast({
      kind: added ? 'favorite' : 'info',
      title: added ? 'Added to favorites' : 'Removed from favorites',
      message: game.title,
    });
  };

  const label = fav ? 'Remove from favorites' : 'Add to favorites';
  return (
    <Tooltip title={withLabel ? '' : label} arrow>
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.08 }}
        onClick={onClick}
        aria-pressed={fav}
        aria-label={label}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border backdrop-blur-md transition-colors ${
          withLabel ? 'px-5 py-3 text-sm font-semibold' : 'h-10 w-10'
        } ${fav ? 'border-pink-500/60 bg-pink-500/20 text-pink-300' : 'border-white/15 bg-black/40 text-white hover:border-pink-400/60'}`}
      >
        <motion.span key={String(fav)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
          <Heart className={`h-5 w-5 ${fav ? 'fill-pink-500 text-pink-500' : ''}`} />
        </motion.span>
        {withLabel && (fav ? 'In Favorites' : 'Add to Favorites')}
      </motion.button>
    </Tooltip>
  );
}
