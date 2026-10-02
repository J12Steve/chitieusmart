import clsx from 'clsx';

// Gộp className có điều kiện: cn('a', cond && 'b')
export const cn = (...args) => clsx(args);