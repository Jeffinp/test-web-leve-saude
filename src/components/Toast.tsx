import { useEffect } from 'react'

/**
 * @interface ToastProps
 * @property {string} message - A mensagem a ser exibida no toast.
 * @property {'success' | 'error' | 'info'} type - O tipo de toast, que define seu estilo (sucesso, erro, informação).
 * @property {() => void} onClose - Função de callback para fechar o toast.
 * @property {number} [duration=3000] - Duração em milissegundos antes do toast fechar automaticamente. Padrão é 3000ms.
 */
interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

/**
 * Componente Toast para exibir mensagens temporárias ao usuário.
 * O toast aparece no canto superior direito da tela e desaparece automaticamente após uma duração definida.
 *
 * @param {ToastProps} props - As propriedades do componente Toast.
 * @returns {JSX.Element} O componente Toast.
 */
const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${typeStyles[type]} animate-fade-in`}>
      <div className="flex items-center justify-between">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default Toast