import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1, triggerOnce = false) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce) {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
};
