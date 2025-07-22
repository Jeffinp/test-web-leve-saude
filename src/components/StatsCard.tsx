/**
 * @interface StatsCardProps
 * @property {string} title - O título a ser exibido no cartão de estatísticas.
 * @property {string | number} value - O valor principal a ser exibido no cartão.
 * @property {string} icon - O ícone a ser exibido no cartão (pode ser um emoji ou um caractere Unicode).
 * @property {string} color - A classe CSS para definir a cor do valor e do ícone (ex: 'text-blue-500').
 */
interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  color: string
}

/**
 * Componente StatsCard para exibir uma estatística individual com um título, valor, ícone e cor.
 * Ideal para dashboards e resumos de dados.
 *
 * @param {StatsCardProps} props - As propriedades do componente StatsCard.
 * @returns {JSX.Element} O componente StatsCard.
 */
const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`text-4xl ${color} opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard