import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { exportToCSV, exportToJSON } from '../utils/exportUtils'
import { exportToExcel } from '../utils/excelUtils'

interface Feedback {
  id: string
  comment: string
  rating: number
  userName: string
  createdAt: Timestamp
}

/**
 * @interface ExportButtonProps
 * @property {Feedback[]} feedbacks - Array de objetos de feedback a serem exportados.
 * @property {(message: string) => void} onExport - Função de callback para notificar o resultado da exportação.
 */
interface ExportButtonProps {
  feedbacks: Feedback[]
  onExport: (message: string) => void
}

/**
 * Componente ExportButton que permite ao usuário exportar dados de feedback em formato CSV ou JSON.
 * Exibe um botão de exportação que, ao ser clicado, revela opções para os diferentes formatos.
 *
 * @param {ExportButtonProps} props - As propriedades do componente ExportButton.
 * @returns {JSX.Element} O componente ExportButton.
 */
const ExportButton = ({ feedbacks, onExport }: ExportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleExport = (format: 'csv' | 'json' | 'excel') => {
    if (feedbacks.length === 0) {
      onExport('Nenhum feedback para exportar')
      return
    }

    try {
      if (format === 'csv') {
        exportToCSV(feedbacks)
        onExport(`${feedbacks.length} feedbacks exportados para CSV`)
      } else if (format === 'excel') {
        exportToExcel(feedbacks)
        onExport(`${feedbacks.length} feedbacks exportados para Excel`)
      } else {
        exportToJSON(feedbacks)
        onExport(`${feedbacks.length} feedbacks exportados para JSON`)
      }
    } catch (error) {
      onExport('Erro ao exportar feedbacks')
    }
    
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
      >
        📊 Exportar
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <button
            onClick={() => handleExport('excel')}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700 border-b border-gray-100"
          >
            📊 Exportar Excel
            <span className="text-xs text-gray-500 ml-auto">Recomendado</span>
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            📄 Exportar CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            📋 Exportar JSON
          </button>
        </div>
      )}
    </div>
  )
}

export default ExportButton