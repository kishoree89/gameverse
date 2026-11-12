import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const KEY = 'gameverse:favorites';

function load(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

interface FavoritesValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  /** Returns true if the game is now a favorite. */
  toggleFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable (private mode) – favorites stay in memory */
    }
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback(
    (id: string) => {
      const adding = !favorites.includes(id);
      setFavorites((f) => (adding ? [...f, id] : f.filter((x) => x !== id)));
      return adding;
    },
    [favorites],
  );

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites, isFavorite, toggleFavorite]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
