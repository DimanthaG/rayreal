// Image optimization utilities
export const optimizeImageUrl = (url, width = 800) => {
  if (!url) return '';
  
  // If it's already a proxy URL, don't modify it
  if (url.includes('server-realty.vercel.app/api/proxy')) {
    return url;
  }

  // Add width parameter for responsive images
  const optimizedUrl = `https://server-realty.vercel.app/api/proxy?url=${encodeURIComponent(url)}&width=${width}`;
  return optimizedUrl;
};

// Generate srcSet for responsive images
export const generateSrcSet = (url) => {
  if (!url) return '';
  
  const widths = [320, 480, 640, 768, 1024, 1280];
  return widths
    .map(width => `${optimizeImageUrl(url, width)} ${width}w`)
    .join(', ');
};

// Lazy loading utility
export const lazyLoadImage = (imageRef) => {
  if (!imageRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px',
    }
  );

  observer.observe(imageRef.current);
  return () => observer.disconnect();
};

// Image preloading for critical images
export const preloadCriticalImages = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImageUrl(url);
    document.head.appendChild(link);
  });
}; 