/**
 * PageLoader - Optimized loading skeleton for lazy-loaded routes
 * Provides instant visual feedback while code chunks load
 */
export const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo or spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-muted-foreground font-body">
          Cargando...
        </p>
      </div>
    </div>
  );
};

/**
 * PageErrorFallback - Error boundary fallback for lazy-loaded routes
 */
export const PageErrorFallback = ({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void 
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Error al cargar la página
        </h1>
        <p className="text-muted-foreground font-body">
          {error.message || 'Ocurrió un error inesperado'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-sm hover:bg-primary/90 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
};