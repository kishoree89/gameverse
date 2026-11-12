import Rating from '@mui/material/Rating';
import { compact } from '../../utils/format';

interface Props {
  value: number;
  reviews?: number;
  size?: 'small' | 'medium' | 'large';
}

export default function RatingComponent({ value, reviews, size = 'small' }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Rating value={value} precision={0.1} readOnly size={size} aria-label={`Rated ${value} out of 5`} />
      <span className="text-sm font-semibold text-amber-300">{value.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-xs text-muted">({compact(reviews)})</span>}
    </div>
  );
}
