import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../lib/firebase'

/**
 * @interface AuthContextType
 * @description Define a estrutura do contexto de autenticação.
 * @property {User | null} currentUser - O objeto do usuário autenticado, ou `null` se não houver usuário.
 * @property {boolean} loading - Indica se o estado de autenticação ainda está sendo carregado.
 * @property {() => Promise<void>} logout - Função assíncrona para realizar o logout do usuário.
 */
interface AuthContextType {
  currentUser: User | null
  loading: boolean
  logout: () => Promise<void>
}

// Cria o contexto de autenticação com um valor inicial `undefined`.
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * @component AuthProvider
 * @description Provedor de contexto de autenticação para a aplicação.
 *              Gerencia o estado de autenticação do usuário (login/logout) usando Firebase Auth.
 *              Disponibiliza o `currentUser`, o estado `loading` e a função `logout` para os componentes filhos.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos que terão acesso ao contexto de autenticação.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /**
     * @function onAuthStateChanged
     * @description Observa mudanças no estado de autenticação do Firebase.
     *              Atualiza o `currentUser` e o `loading` sempre que o estado muda.
     *              Retorna uma função de `unsubscribe` para limpar o ouvinte.
     */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    // Limpa o ouvinte quando o componente é desmontado para evitar vazamentos de memória.
    return unsubscribe
  }, [])

  /**
   * @function logout
   * @description Realiza o logout do usuário através do Firebase Auth.
   * @returns {Promise<void>} Uma promessa que resolve quando o logout é concluído.
   */
  const logout = () => {
    return signOut(auth)
  }

  // Objeto de valor que será fornecido pelo contexto.
  const value = {
    currentUser,
    loading,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {/* Renderiza os filhos apenas quando o estado de autenticação for carregado. */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

/**
 * @function useAuth
 * @description Hook customizado para consumir o contexto de autenticação.
 *              Fornece acesso fácil ao `currentUser`, `loading` e `logout` em qualquer componente funcional.
 * @returns {AuthContextType} O objeto de contexto de autenticação.
 * @throws {Error} Se `useAuth` for usado fora de um `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
