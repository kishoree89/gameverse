import { useState, type ImgHTMLAttributes } from 'react';
import { FALLBACK_IMG, sized } from '../../utils/images';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width: number;
  height?: number;
  priority?: boolean;
}

/** Lazy-loaded, resized remote image that swaps to an inline fallback on error. */
export default function SmartImage({ src, alt, width, height, priority, className = '', ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={failed ? FALLBACK_IMG : sized(src, width, height)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`${className} bg-panel transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...rest}
    />
  );
}
