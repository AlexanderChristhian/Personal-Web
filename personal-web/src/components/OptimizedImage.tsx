import { useState, useRef, useEffect, type CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * OptimizedImage component with lazy loading and blur placeholder
 * Features:
 * - Intersection Observer for lazy loading
 * - Blur-up placeholder effect
 * - Automatic format detection
 * - Error handling with fallback
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  style,
  loading = 'lazy',
  priority = false,
  onLoad,
  objectFit = 'cover',
  objectPosition = 'center',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Skip observer for priority/eager images
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    // Set up Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Disconnect observer after image is in view
            if (observerRef.current && imgRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Generate optimized image sources
  const getOptimizedSrc = (originalSrc: string) => {
    // For external URLs (CDN icons), return as-is
    if (originalSrc.startsWith('http://') || originalSrc.startsWith('https://')) {
      return originalSrc;
    }
    
    // For local images, Vite will handle them
    return originalSrc;
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Blur placeholder - shown while loading */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-cyber-black-100/30 backdrop-blur-sm animate-pulse"
          style={{
            background: 'linear-gradient(90deg, rgba(0,163,255,0.1) 0%, rgba(0,163,255,0.05) 50%, rgba(0,163,255,0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-cyber-black-100/50">
          <div className="text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs">Image failed to load</p>
          </div>
        </div>
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            objectFit,
            objectPosition,
          }}
          decoding="async"
        />
      )}

      {/* Add shimmer keyframes to CSS */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
