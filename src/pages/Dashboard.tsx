import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { collection, getDocs, Timestamp, query } from 'firebase/firestore'
import StatsCard from '../components/StatsCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Toast from '../components/Toast'
import ExportButton from '../components/ExportButton'
import { useToast } from '../hooks/useToast'

/**
 * @interface Feedback
 * @description Define a estrutura de um objeto de feedback.
 */
interface Feedback {
  id: string
  comment: string
  rating: number
  userName: string
  createdAt: Timestamp
}

/**
 * @component Dashboard
 * @description Componente principal para visualização e gerenciamento de feedbacks.
 */
const Dashboard = () => {
  const { currentUser, logout } = useAuth() // Acesso ao usuário autenticado e função de logout.
  const navigate = useNavigate()

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const { toasts, showToast, removeToast } = useToast()

  // Estados para controle de filtro e busca
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt_desc') // Padrão: feedbacks mais recentes

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const q = query(collection(db, 'feedbacks'))
        const querySnapshot = await getDocs(q)
        const feedbacksData = querySnapshot.docs.map((doc) => {
          const data = doc.data()

          // Garante que `createdAt` é um Timestamp válido, caso contrário, usa o timestamp atual.
          if (!data.createdAt) {
            data.createdAt = Timestamp.now()
          }

          return {
            id: doc.id,
            ...data,
            userName: data.userName || 'Usuário anônimo',
            rating: data.rating || 0,
            comment: data.comment || '',
          }
        }) as Feedback[]

        setFeedbacks(feedbacksData)
        showToast('Feedbacks carregados com sucesso!', 'success')
      } catch (error) {
        console.error('Erro ao buscar feedbacks:', error)
        showToast('Erro ao carregar feedbacks', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [])

  /**
   * @function filteredAndSortedFeedbacks
   * @description Memoriza a lista de feedbacks filtrada e ordenada com base nos estados `searchTerm` e `sortBy`.
   *              Evita recálculos desnecessários em cada renderização.
   */
  const filteredAndSortedFeedbacks = useMemo(() => {
    let result = [...feedbacks]

    // Aplica filtro de busca por nome de usuário ou comentário.
    if (searchTerm) {
      result = result.filter(
        (feedback) =>
          (feedback.userName || '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (feedback.comment || '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    }

    // Aplica ordenação com base na opção selecionada.
    switch (sortBy) {
      case 'createdAt_asc':
        result.sort((a, b) => {
          const aMillis = a.createdAt?.toMillis?.() || 0
          const bMillis = b.createdAt?.toMillis?.() || 0
          return aMillis - bMillis
        })
        break
      case 'rating_desc':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'rating_asc':
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0))
        break
      case 'createdAt_desc':
      default:
        result.sort((a, b) => {
          const bMillis = b.createdAt?.toMillis?.() || 0
          const aMillis = a.createdAt?.toMillis?.() || 0
          return bMillis - aMillis
        })
        break
    }

    return result
  }, [feedbacks, searchTerm, sortBy])

  /**
   * @function handleLogout
   * @description Realiza o logout do usuário e redireciona para a página de login.
   */
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Falha ao fazer logout', error)
    }
  }

  /**
   * @function renderStars
   * @param {number} rating - A nota (número de estrelas) a ser renderizada.
   * @returns {string} Uma string com o número de estrelas correspondente à nota.
   */
  const renderStars = (rating: number) => '⭐'.repeat(rating)

  const stats = useMemo(() => {
    const totalFeedbacks = feedbacks.length
    const averageRating = totalFeedbacks > 0 
      ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks).toFixed(1)
      : '0.0'
    const highRatings = feedbacks.filter(f => f.rating >= 4).length
    const lowRatings = feedbacks.filter(f => f.rating <= 2).length

    return { totalFeedbacks, averageRating, highRatings, lowRatings }
  }, [feedbacks])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard de Feedbacks
            </h1>
            <p className="text-gray-600 text-lg">Bem-vindo, <span className="font-semibold text-indigo-600">{currentUser?.email}</span></p>
          </div>
          <div className="flex gap-3">
            <ExportButton 
              feedbacks={filteredAndSortedFeedbacks} 
              onExport={(message) => showToast(message, 'success')}
            />
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Feedbacks"
            value={stats.totalFeedbacks}
            icon="📊"
            color="text-blue-600"
          />
          <StatsCard
            title="Avaliação Média"
            value={`${stats.averageRating} ⭐`}
            icon="📈"
            color="text-green-600"
          />
          <StatsCard
            title="Avaliações Altas (4-5)"
            value={stats.highRatings}
            icon="👍"
            color="text-emerald-600"
          />
          <StatsCard
            title="Avaliações Baixas (1-2)"
            value={stats.lowRatings}
            icon="👎"
            color="text-red-600"
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg mb-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row items-center">
            <input
              type="text"
              placeholder="Buscar por nome ou comentário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Ordenar por:
              </span>
              <button
                onClick={() => setSortBy('createdAt_desc')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ease-in-out ${sortBy === 'createdAt_desc' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Mais Recentes
              </button>
              <button
                onClick={() => setSortBy('rating_desc')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ease-in-out ${sortBy === 'rating_desc' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Melhor Nota
              </button>
              <button
                onClick={() => setSortBy('rating_asc')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ease-in-out ${sortBy === 'rating_asc' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Pior Nota
              </button>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-800">Feedbacks Recebidos</h2>
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedFeedbacks.length > 0 ? (
                filteredAndSortedFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-indigo-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xl font-semibold text-gray-900">
                        {feedback.userName}
                      </p>
                      <p className="text-3xl flex-shrink-0">
                        {renderStars(feedback.rating)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {feedback.createdAt
                        .toDate()
                        .toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                  </div>
                ))
              ) : (
                <p className="py-12 text-center text-gray-500 text-lg">
                  Nenhum feedback encontrado.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default Dashboard
