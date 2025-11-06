import { cn } from '@/core/utils/cn';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component with Monster Energy branding
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @description
 * Displays a centered loading spinner with the Monster Energy logo.
 * Used during page transitions and async operations.
 */
export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={cn('flex items-center justify-center min-h-screen bg-black', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-monster-green border-t-transparent',
          sizeClasses[size]
        )}
      />
    </div>
  );
};
