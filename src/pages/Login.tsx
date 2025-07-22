import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'

/**
 * @component Login
 * @description Componente de página para o login de administradores.
 *              Permite a autenticação via e-mail e senha usando Firebase Authentication.
 */
const Login = () => {
  // Estados para armazenar o e-mail e a senha digitados pelo usuário.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Estado para armazenar mensagens de erro durante o processo de login.
  const [error, setError] = useState<string | null>(null)
  // Hook para navegação programática após o login bem-sucedido.
  const navigate = useNavigate()

  /**
   * @function handleLogin
   * @param {React.FormEvent} e - Evento de submissão do formulário.
   * @description Lida com a submissão do formulário de login.
   *              Tenta autenticar o usuário com e-mail e senha no Firebase.
   *              Em caso de sucesso, redireciona para a página inicial (`/`).
   *              Em caso de falha, exibe uma mensagem de erro.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Limpa qualquer erro anterior.

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/') // Redireciona para a dashboard após login bem-sucedido.
    } catch (err) {
      setError('Falha no login. Verifique seu e-mail e senha.')
      console.error('Erro de login:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl space-y-8">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Login - Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          {error && <p className="text-center text-sm text-red-600 -mt-4">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
