import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { collection, getDocs, Timestamp, query } from 'firebase/firestore'

interface Feedback {
  id: string
  comment: string
  rating: number
  userName: string
  createdAt: Timestamp
}

const Dashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  // --- NOVOS ESTADOS PARA FILTRO E BUSCA ---
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt_desc') // Opção padrão

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // A query inicial pode ser mais simples agora, pois a ordenação será no cliente
        const q = query(collection(db, 'feedbacks'))
        const querySnapshot = await getDocs(q)
        const feedbacksData = querySnapshot.docs.map((doc) => {
          const data = doc.data()

          // Garantir que temos um Timestamp válido
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
      } catch (error) {
        console.error('Erro ao buscar feedbacks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [])

  // --- NOVA LÓGICA MEMORIZADA PARA FILTRAR E ORDENAR ---
  const filteredAndSortedFeedbacks = useMemo(() => {
    let result = [...feedbacks]

    // 1. Aplicar filtro de busca
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

    // 2. Aplicar ordenação
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

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Falha ao fazer logout', error)
    }
  }

  const renderStars = (rating: number) => '⭐'.repeat(rating)

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard de Feedbacks
            </h1>
            <p className="text-gray-600">Bem-vindo, {currentUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          {/* --- NOVOS CONTROLES DE FILTRO E BUSCA --- */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Buscar por nome ou comentário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Ordenar por:
              </span>
              <button
                onClick={() => setSortBy('createdAt_desc')}
                className={`rounded-full px-3 py-1 text-sm ${sortBy === 'createdAt_desc' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Mais Recentes
              </button>
              <button
                onClick={() => setSortBy('rating_desc')}
                className={`rounded-full px-3 py-1 text-sm ${sortBy === 'rating_desc' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Melhor Nota
              </button>
              <button
                onClick={() => setSortBy('rating_asc')}
                className={`rounded-full px-3 py-1 text-sm ${sortBy === 'rating_asc' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Pior Nota
              </button>
            </div>
          </div>

          <h2 className="mb-4 text-xl font-semibold">Feedbacks Recebidos</h2>
          {loading ? (
            <p>Carregando feedbacks...</p>
          ) : (
            <div className="space-y-4">
              {/* --- ATUALIZAR MAP PARA USAR A NOVA LISTA --- */}
              {filteredAndSortedFeedbacks.length > 0 ? (
                filteredAndSortedFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="rounded-md border bg-gray-50 p-4 transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-800">
                          {feedback.userName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {feedback.createdAt
                            .toDate()
                            .toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <p className="ml-4 flex-shrink-0 text-2xl">
                        {renderStars(feedback.rating)}
                      </p>
                    </div>
                    <p className="mt-3 text-gray-700">{feedback.comment}</p>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-gray-500">
                  Nenhum feedback encontrado.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
