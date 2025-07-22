/**
 * Componente LoadingSkeleton para exibir um estado de carregamento animado.
 * Utilizado para melhorar a experiência do usuário, indicando que o conteúdo está sendo carregado.
 *
 * @returns {JSX.Element} O componente LoadingSkeleton.
 */
const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton