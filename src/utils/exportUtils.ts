import { Timestamp } from 'firebase/firestore'

interface Feedback {
  id: string
  comment: string
  rating: number
  userName: string
  createdAt: Timestamp
}

/**
 * Exporta uma lista de feedbacks para um arquivo CSV formatado para Excel.
 * Usa separador ponto-e-vírgula (;) para compatibilidade com Excel brasileiro,
 * BOM UTF-8 e formatação adequada para preservar tipos de dados.
 *
 * @param {Feedback[]} feedbacks - A lista de objetos de feedback a serem exportados.
 * @param {string} [filename='feedbacks.csv'] - O nome do arquivo CSV a ser gerado.
 */
export const exportToCSV = (feedbacks: Feedback[], filename = 'feedbacks.csv') => {
  // Cabeçalhos em português otimizados para Excel
  const headers = [
    'ID do Feedback',
    'Nome do Usuário', 
    'Avaliação',
    'Estrelas',
    'Comentário',
    'Data e Hora Completa',
    'Data',
    'Hora'
  ]
  
  // Processa os dados com formatação específica para Excel brasileiro
  const rows = feedbacks.map(feedback => {
    const date = feedback.createdAt.toDate()
    
    // Formatação de data para o padrão brasileiro
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const formattedDate = `${day}/${month}/${year}`
    
    // Formatação de hora
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const formattedTime = `${hours}:${minutes}`
    
    // Data e hora completa
    const fullDateTime = `${formattedDate} ${formattedTime}`
    
    // Estrelas visuais baseadas na avaliação
    const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating)
    
    // Limpa e formata o comentário para CSV
    const cleanComment = feedback.comment
      .replace(/"/g, '""')  // Escape aspas duplas
      .replace(/\r\n/g, ' ') // Remove quebras de linha Windows
      .replace(/\n/g, ' ')   // Remove quebras de linha Unix
      .replace(/\r/g, ' ')   // Remove carriage returns
      .trim()
    
    return [
      `"${feedback.id}"`,
      `"${feedback.userName.replace(/"/g, '""')}"`,
      feedback.rating.toString(),
      `"${stars}"`,
      `"${cleanComment}"`,
      `"${fullDateTime}"`,
      `"${formattedDate}"`,
      `"${formattedTime}"`
    ].join(';') // Usa ponto-e-vírgula para Excel brasileiro
  })

  // BOM UTF-8 para garantir encoding correto no Excel
  const BOM = '\uFEFF'
  
  // Monta o conteúdo CSV com separador correto
  const csvContent = BOM + [
    headers.map(h => `"${h}"`).join(';'), // Cabeçalhos entre aspas
    ...rows
  ].join('\r\n') // CRLF para compatibilidade Windows/Excel

  // Cria blob com tipo MIME específico para CSV
  const blob = new Blob([csvContent], { 
    type: 'text/csv;charset=utf-8;' 
  })
  
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    
    // Nome do arquivo com timestamp único
    const now = new Date()
    const timestamp = now.toISOString()
      .slice(0, 16)
      .replace(/[T:]/g, '-')
      .replace(/-/g, '')
    const finalFilename = filename.replace('.csv', `_${timestamp}.csv`)
    
    link.setAttribute('download', finalFilename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Limpa recursos após download
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }
}

/**
 * Exporta uma lista de feedbacks para um arquivo JSON.
 * Os dados são serializados para JSON e o campo 'createdAt' é convertido para ISO string.
 *
 * @param {Feedback[]} feedbacks - A lista de objetos de feedback a serem exportados.
 * @param {string} [filename='feedbacks.json'] - O nome do arquivo JSON a ser gerado.
 */
export const exportToJSON = (feedbacks: Feedback[], filename = 'feedbacks.json') => {
  const exportData = feedbacks.map(feedback => ({
    id: feedback.id,
    userName: feedback.userName,
    rating: feedback.rating,
    comment: feedback.comment,
    createdAt: feedback.createdAt.toDate().toISOString()
  }))

  const jsonContent = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}