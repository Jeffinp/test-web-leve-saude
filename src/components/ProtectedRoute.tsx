import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * @interface ProtectedRouteProps
 * @description Define as propriedades para o componente `ProtectedRoute`.
 * @property {React.ReactNode} children - Os componentes filhos que serão renderizados se o usuário estiver autenticado.
 */
interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * @component ProtectedRoute
 * @description Componente de rota protegida que verifica a autenticação do usuário.
 *              Se o usuário não estiver autenticado, ele é redirecionado para a página de login.
 *              Caso contrário, os componentes filhos são renderizados.
 * @param {ProtectedRouteProps} { children } - Os componentes filhos a serem protegidos.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Obtém o usuário autenticado do contexto de autenticação.
  const { currentUser } = useAuth()

  // Se não houver um usuário autenticado, redireciona para a página de login.
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  // Se o usuário estiver autenticado, renderiza os componentes filhos.
  return <>{children}</>
}

export default ProtectedRoute
