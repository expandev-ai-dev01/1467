import { cn } from '@/core/utils/cn';
import type { ErrorMessageProps } from './types';

/**
 * @component ErrorMessage
 * @summary Error message display component
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @description
 * Displays error messages with optional retry and back actions.
 */
export const ErrorMessage = ({ title, message, onRetry, onBack, className }: ErrorMessageProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen bg-black text-white p-4',
        className
      )}
    >
      <div className="max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-monster-green">{title}</h2>
        <p className="text-gray-400">{message}</p>
        <div className="flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2 bg-monster-green text-black font-bold rounded hover:bg-green-400 transition-colors"
            >
              Tentar Novamente
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition-colors"
            >
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
