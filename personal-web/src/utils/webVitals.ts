/**
 * Web Vitals Monitoring
 * Track Core Web Vitals: LCP, FID, CLS, FCP, TTFB
 * Inspired by McMaster-Carr's performance-first approach
 */

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Thresholds based on Google's Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  measureLCP();
  
  // First Input Delay (FID)
  measureFID();
  
  // Cumulative Layout Shift (CLS)
  measureCLS();
  
  // First Contentful Paint (FCP)
  measureFCP();
  
  // Time to First Byte (TTFB)
  measureTTFB();
}

/**
 * Largest Contentful Paint - measures loading performance
 */
function measureLCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      const metric: WebVitalsMetric = {
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime,
        rating: getRating(lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime, THRESHOLDS.LCP),
        delta: lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime,
        id: generateId(),
      };
      
      reportMetric(metric);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('[Vitals] LCP measurement failed:', error);
  }
}

/**
 * First Input Delay - measures interactivity
 */
function measureFID() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const metric: WebVitalsMetric = {
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          rating: getRating(entry.processingStart - entry.startTime, THRESHOLDS.FID),
          delta: entry.processingStart - entry.startTime,
          id: generateId(),
        };
        
        reportMetric(metric);
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('[Vitals] FID measurement failed:', error);
  }
}

/**
 * Cumulative Layout Shift - measures visual stability
 */
function measureCLS() {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsEntries: any[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsEntries.push(entry);
          clsValue += entry.value;
        }
      });
      
      const metric: WebVitalsMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getRating(clsValue, THRESHOLDS.CLS),
        delta: clsValue,
        id: generateId(),
      };
      
      reportMetric(metric);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.error('[Vitals] CLS measurement failed:', error);
  }
}

/**
 * First Contentful Paint - measures perceived loading speed
 */
function measureFCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const metric: WebVitalsMetric = {
            name: 'FCP',
            value: entry.startTime,
            rating: getRating(entry.startTime, THRESHOLDS.FCP),
            delta: entry.startTime,
            id: generateId(),
          };
          
          reportMetric(metric);
        }
      });
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('[Vitals] FCP measurement failed:', error);
  }
}

/**
 * Time to First Byte - measures server response time
 */
function measureTTFB() {
  if (!('performance' in window)) return;

  try {
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navTiming) {
      const ttfb = navTiming.responseStart - navTiming.requestStart;
      
      const metric: WebVitalsMetric = {
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
        delta: ttfb,
        id: generateId(),
      };
      
      reportMetric(metric);
    }
  } catch (error) {
    console.error('[Vitals] TTFB measurement failed:', error);
  }
}

/**
 * Get rating based on threshold
 */
function getRating(value: number, threshold: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Generate unique ID for metric
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Report metric to console (can be extended to analytics)
 */
function reportMetric(metric: WebVitalsMetric) {
  // Log to console with color coding
  const color = metric.rating === 'good' ? '#0f0' : metric.rating === 'needs-improvement' ? '#ff0' : '#f00';
  console.log(
    `%c[Vitals] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`,
    `color: ${color}; font-weight: bold;`
  );

  // Optional: Send to analytics service
  // sendToAnalytics(metric);
  
  // Store in sessionStorage for debugging
  try {
    const vitals = JSON.parse(sessionStorage.getItem('webVitals') || '{}');
    vitals[metric.name] = {
      value: Math.round(metric.value),
      rating: metric.rating,
      timestamp: new Date().toISOString(),
    };
    sessionStorage.setItem('webVitals', JSON.stringify(vitals));
  } catch (error) {
    // Ignore storage errors
  }
}

/**
 * Get all collected vitals
 */
export function getWebVitals(): Record<string, any> {
  try {
    return JSON.parse(sessionStorage.getItem('webVitals') || '{}');
  } catch {
    return {};
  }
}

/**
 * Export vitals summary
 */
export function getVitalsSummary(): string {
  const vitals = getWebVitals();
  const entries = Object.entries(vitals);
  
  if (entries.length === 0) {
    return 'No vitals data collected yet';
  }
  
  return entries
    .map(([name, data]: [string, any]) => {
      const emoji = data.rating === 'good' ? '✅' : data.rating === 'needs-improvement' ? '⚠️' : '❌';
      return `${emoji} ${name}: ${data.value}ms (${data.rating})`;
    })
    .join('\n');
}
