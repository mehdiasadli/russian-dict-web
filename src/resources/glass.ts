export const glassify = (
  scheme: 'dark' | 'light' = 'light',
  options: {
    bg?: string;
    shadow?: {
      styles?: string;
      color?: string;
    };
    filter?: number;
    border?: { width?: number; color?: string };
  } = {}
) => {
  const {
    bg = scheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.26)',
    filter = 4.5,
    shadow,
    border,
  } = options;
  const { color: shadowColor = 'rgba(0, 0, 0, 0.1)', styles = '0 4px 30px' } = shadow || {};
  const { color: borderColor = 'rgba(255, 255, 255, 0.52)', width = 1 } = border || {};

  return {
    background: bg,
    boxShadow: `${styles} ${shadowColor}`,
    backdropFilter: `blur(${filter}px)`,
    border: `${width}px solid ${borderColor}`,
  };
};
