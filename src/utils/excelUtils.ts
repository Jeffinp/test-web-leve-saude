import { Timestamp } from 'firebase/firestore'
import * as XLSX from 'xlsx'

interface Feedback {
  id: string
  comment: string
  rating: number
  userName: string
  createdAt: Timestamp
}

/**
 * Exporta feedbacks para um arquivo Excel (.xlsx) nativo com formatação profissional.
 * Inclui tipos de dados corretos, formatação de células e layout otimizado.
 * 
 * @param {Feedback[]} feedbacks - Array de objetos de feedback para exportação
 * @param {string} [filename='feedbacks_relatorio.xlsx'] - Nome do arquivo de saída
 */
export const exportToExcel = (feedbacks: Feedback[], filename = 'feedbacks_relatorio.xlsx') => {
  // Inicializa o workbook Excel
  const wb = XLSX.utils.book_new()
  
  // Calcula estatísticas para o resumo
  const totalFeedbacks = feedbacks.length
  const averageRating = totalFeedbacks > 0 
    ? Number((feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks).toFixed(1))
    : 0
  
  // Prepara dados da planilha com cabeçalho profissional
  const currentDate = new Date().toLocaleDateString('pt-BR')
  const currentTime = new Date().toLocaleTimeString('pt-BR')
  
  const worksheetData = [
    // Linha 1: Título principal do relatório
    [
      '📊 RELATÓRIO DE FEEDBACKS - SISTEMA DE AVALIAÇÃO',
      '', '', '', '', '', '', ''
    ],
    // Linha 2: Subtítulo com data
    [
      `📅 Relatório gerado em: ${currentDate} às ${currentTime}`,
      '', '', '', '', '', '', ''
    ],
    // Linha 3: Linha vazia para espaçamento
    ['', '', '', '', '', '', '', ''],
    // Linha 4: Cabeçalhos das colunas
    [
      '🆔 ID do Feedback',
      '👤 Nome do Usuário', 
      '⭐ Avaliação',
      '📈 Categoria',
      '💬 Comentário',
      '🕐 Data/Hora Completa',
      '📅 Data',
      '⏰ Hora'
    ],
    // Linhas 2+: Dados dos feedbacks
    ...feedbacks.map(feedback => {
      const date = feedback.createdAt.toDate()
      
      // Formatação padronizada de data e hora
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      const formattedDate = `${day}/${month}/${year}`
      
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const formattedTime = `${hours}:${minutes}`
      const fullDateTime = `${formattedDate} ${formattedTime}`
      
      // Categorização visual baseada na avaliação
      const getCategory = (rating: number): string => {
        if (rating >= 5) return '🟢 EXCELENTE'
        if (rating >= 4) return '🔵 MUITO BOM'
        if (rating >= 3) return '🟡 REGULAR'
        if (rating >= 2) return '🟠 RUIM'
        return '🔴 PÉSSIMO'
      }

      return [
        feedback.id,
        feedback.userName,
        feedback.rating,
        getCategory(feedback.rating),
        feedback.comment.trim(),
        fullDateTime,
        formattedDate,
        formattedTime
      ]
    })
  ]
  
  // Adiciona seção de análise estatística
  if (totalFeedbacks > 0) {
    // Calcula distribuição de avaliações
    const distribution = [1, 2, 3, 4, 5].map(rating => {
      const count = feedbacks.filter(f => f.rating === rating).length
      const percentage = ((count / totalFeedbacks) * 100).toFixed(1)
      return { rating, count, percentage }
    })
    
    // Encontra a avaliação mais comum
    const mostCommon = distribution.reduce((max, curr) => 
      curr.count > max.count ? curr : max
    )
    
    worksheetData.push(
      // Linha vazia para separação
      ['', '', '', '', '', '', '', ''],
      // Título da seção de análise
      ['📊 ANÁLISE ESTATÍSTICA DOS FEEDBACKS', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      // Resumo geral
      ['📈 RESUMO GERAL', '', '', '', '', '', '', ''],
      ['• Total de Feedbacks Coletados:', totalFeedbacks, '', '', '', '', '', ''],
      ['• Avaliação Média Geral:', `${averageRating} ⭐`, '', '', '', '', '', ''],
      ['• Avaliação Mais Frequente:', `${mostCommon.rating} ⭐ (${mostCommon.count} feedbacks)`, '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      // Distribuição detalhada
      ['📊 DISTRIBUIÇÃO POR AVALIAÇÃO', '', '', '', '', '', '', ''],
      ['⭐ 5 Estrelas (Excelente):', `${distribution[4].count} feedbacks (${distribution[4].percentage}%)`, '', '', '', '', '', ''],
      ['⭐ 4 Estrelas (Muito Bom):', `${distribution[3].count} feedbacks (${distribution[3].percentage}%)`, '', '', '', '', '', ''],
      ['⭐ 3 Estrelas (Regular):', `${distribution[2].count} feedbacks (${distribution[2].percentage}%)`, '', '', '', '', '', ''],
      ['⭐ 2 Estrelas (Ruim):', `${distribution[1].count} feedbacks (${distribution[1].percentage}%)`, '', '', '', '', '', ''],
      ['⭐ 1 Estrela (Péssimo):', `${distribution[0].count} feedbacks (${distribution[0].percentage}%)`, '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      // Indicadores de qualidade
      ['🎯 INDICADORES DE QUALIDADE', '', '', '', '', '', '', ''],
      ['• Feedbacks Positivos (4-5 ⭐):', `${distribution[3].count + distribution[4].count} (${((distribution[3].count + distribution[4].count) / totalFeedbacks * 100).toFixed(1)}%)`, '', '', '', '', '', ''],
      ['• Feedbacks Neutros (3 ⭐):', `${distribution[2].count} (${distribution[2].percentage}%)`, '', '', '', '', '', ''],
      ['• Feedbacks Negativos (1-2 ⭐):', `${distribution[0].count + distribution[1].count} (${((distribution[0].count + distribution[1].count) / totalFeedbacks * 100).toFixed(1)}%)`, '', '', '', '', '', '']
    )
  }

  // Converte dados para planilha Excel
  const ws = XLSX.utils.aoa_to_sheet(worksheetData)

  // Define larguras otimizadas das colunas baseado no conteúdo
  const colWidths = [
    { wch: 18 }, // ID do Feedback
    { wch: 25 }, // Nome do Usuário  
    { wch: 10 }, // Avaliação
    { wch: 18 }, // Categoria
    { wch: 50 }, // Comentário (mais espaço)
    { wch: 22 }, // Data/Hora Completa
    { wch: 12 }, // Data
    { wch: 8 }   // Hora
  ]
  ws['!cols'] = colWidths

  // Configurações de estilo profissional avançado
  
  // 1. Estilo do título principal (linha 1)
  const titleStyle = {
    font: { 
      bold: true, 
      color: { rgb: "FFFFFF" },
      size: 16,
      name: "Calibri"
    },
    fill: { fgColor: { rgb: "1E293B" } }, // Azul escuro elegante
    alignment: { 
      horizontal: "center", 
      vertical: "center",
      wrapText: true 
    },
    border: {
      top: { style: "thick", color: { rgb: "0F172A" } },
      bottom: { style: "thick", color: { rgb: "0F172A" } },
      left: { style: "thick", color: { rgb: "0F172A" } },
      right: { style: "thick", color: { rgb: "0F172A" } }
    }
  }

  // 2. Estilo do subtítulo (linha 2)
  const subtitleStyle = {
    font: { 
      bold: true, 
      color: { rgb: "475569" },
      size: 11,
      name: "Calibri",
      italic: true
    },
    fill: { fgColor: { rgb: "F1F5F9" } },
    alignment: { 
      horizontal: "center", 
      vertical: "center" 
    },
    border: {
      top: { style: "thin", color: { rgb: "CBD5E1" } },
      bottom: { style: "medium", color: { rgb: "64748B" } },
      left: { style: "thick", color: { rgb: "0F172A" } },
      right: { style: "thick", color: { rgb: "0F172A" } }
    }
  }

  // 3. Estilo dos cabeçalhos das colunas (linha 4)
  const headerStyle = {
    font: { 
      bold: true, 
      color: { rgb: "FFFFFF" },
      size: 12,
      name: "Calibri"
    },
    fill: { fgColor: { rgb: "3B82F6" } }, // Azul vibrante
    alignment: { 
      horizontal: "center", 
      vertical: "center",
      wrapText: true 
    },
    border: {
      top: { style: "medium", color: { rgb: "1D4ED8" } },
      bottom: { style: "medium", color: { rgb: "1D4ED8" } },
      left: { style: "medium", color: { rgb: "1D4ED8" } },
      right: { style: "medium", color: { rgb: "1D4ED8" } }
    }
  }

  // 2. Estilo para células de dados gerais
  const dataStyle = {
    font: { 
      size: 11,
      name: "Calibri" 
    },
    border: {
      top: { style: "thin", color: { rgb: "D1D5DB" } },
      bottom: { style: "thin", color: { rgb: "D1D5DB" } },
      left: { style: "thin", color: { rgb: "D1D5DB" } },
      right: { style: "thin", color: { rgb: "D1D5DB" } }
    },
    alignment: { 
      vertical: "top", 
      wrapText: true 
    }
  }

  // 4. Estilos condicionais para avaliações por cor
  const getRatingStyle = (rating: number) => ({
    ...dataStyle,
    alignment: { 
      horizontal: "center", 
      vertical: "center" 
    },
    font: { 
      bold: true, 
      size: 14,
      name: "Calibri",
      color: { rgb: "FFFFFF" }
    },
    fill: { 
      fgColor: { 
        rgb: rating >= 5 ? "16A34A" : // Verde (Excelente)
             rating >= 4 ? "2563EB" : // Azul (Muito Bom)  
             rating >= 3 ? "F59E0B" : // Amarelo (Regular)
             rating >= 2 ? "EA580C" : // Laranja (Ruim)
             "DC2626"                 // Vermelho (Péssimo)
      } 
    }
  })

  // 5. Estilos para categorias com cores correspondentes
  const getCategoryStyle = (rating: number) => ({
    ...dataStyle,
    alignment: { 
      horizontal: "center", 
      vertical: "center" 
    },
    font: { 
      bold: true,
      size: 11,
      name: "Calibri",
      color: { rgb: "FFFFFF" }
    },
    fill: { 
      fgColor: { 
        rgb: rating >= 5 ? "16A34A" : // Verde
             rating >= 4 ? "2563EB" : // Azul
             rating >= 3 ? "F59E0B" : // Amarelo
             rating >= 2 ? "EA580C" : // Laranja
             "DC2626"                 // Vermelho
      } 
    }
  })

  // 5. Estilo para datas (coluna F, G, H)
  const dateStyle = {
    ...dataStyle,
    alignment: { 
      horizontal: "center", 
      vertical: "center" 
    },
    numFmt: "dd/mm/yyyy" // Formato de data brasileiro
  }

  // Aplica formatação ao título principal (linha 1)
  for (let col = 0; col < 8; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: col })
    if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' }
    ws[cellRef].s = titleStyle
  }

  // Aplica formatação ao subtítulo (linha 2)
  for (let col = 0; col < 8; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 1, c: col })
    if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' }
    ws[cellRef].s = subtitleStyle
  }

  // Aplica formatação aos cabeçalhos das colunas (linha 4)
  for (let col = 0; col < 8; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 3, c: col })
    if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' }
    ws[cellRef].s = headerStyle
  }

  // Aplica formatação às células de dados dos feedbacks
  for (let row = 4; row < 4 + feedbacks.length; row++) {
    const feedbackIndex = row - 4
    const feedback = feedbacks[feedbackIndex]
    
    for (let col = 0; col < 8; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col })
      if (!ws[cellRef]) continue
      
      // Aplica estilo específico por coluna com formatação condicional
      switch (col) {
        case 2: // Avaliação - cores baseadas no valor
          ws[cellRef].s = getRatingStyle(feedback.rating)
          if (typeof ws[cellRef].v === 'number') {
            ws[cellRef].t = 'n'
          }
          break
        case 3: // Categoria - cores correspondentes à avaliação
          ws[cellRef].s = getCategoryStyle(feedback.rating)
          break
        case 5: // Data/Hora Completa
        case 6: // Data
        case 7: // Hora
          ws[cellRef].s = dateStyle
          break
        default:
          ws[cellRef].s = dataStyle
          break
      }
    }
  }

  // 6. Estilos para seção de análise estatística
  const analysisTitleStyle = {
    font: { 
      bold: true, 
      size: 14,
      name: "Calibri",
      color: { rgb: "FFFFFF" }
    },
    fill: { fgColor: { rgb: "7C3AED" } }, // Roxo para análise
    alignment: { 
      horizontal: "center", 
      vertical: "center" 
    },
    border: {
      top: { style: "thick", color: { rgb: "5B21B6" } },
      bottom: { style: "thick", color: { rgb: "5B21B6" } },
      left: { style: "thick", color: { rgb: "5B21B6" } },
      right: { style: "thick", color: { rgb: "5B21B6" } }
    }
  }

  const sectionHeaderStyle = {
    font: { 
      bold: true, 
      size: 12,
      name: "Calibri",
      color: { rgb: "FFFFFF" }
    },
    fill: { fgColor: { rgb: "059669" } }, // Verde para seções
    alignment: { 
      horizontal: "left", 
      vertical: "center" 
    },
    border: {
      top: { style: "medium", color: { rgb: "047857" } },
      bottom: { style: "medium", color: { rgb: "047857" } },
      left: { style: "medium", color: { rgb: "047857" } },
      right: { style: "medium", color: { rgb: "047857" } }
    }
  }

  const summaryDataStyle = {
    font: { 
      size: 11,
      name: "Calibri",
      bold: false
    },
    fill: { fgColor: { rgb: "F0FDF4" } }, // Verde muito claro
    border: {
      top: { style: "thin", color: { rgb: "BBF7D0" } },
      bottom: { style: "thin", color: { rgb: "BBF7D0" } },
      left: { style: "thin", color: { rgb: "BBF7D0" } },
      right: { style: "thin", color: { rgb: "BBF7D0" } }
    },
    alignment: { 
      horizontal: "left",
      vertical: "center" 
    }
  }

  const highlightDataStyle = {
    font: { 
      bold: true,
      size: 12,
      name: "Calibri",
      color: { rgb: "1F2937" }
    },
    fill: { fgColor: { rgb: "FEF3C7" } }, // Amarelo claro para destacar
    border: {
      top: { style: "thin", color: { rgb: "F59E0B" } },
      bottom: { style: "thin", color: { rgb: "F59E0B" } },
      left: { style: "thin", color: { rgb: "F59E0B" } },
      right: { style: "thin", color: { rgb: "F59E0B" } }
    },
    alignment: { 
      horizontal: "center",
      vertical: "center" 
    }
  }

  // Aplica formatação à seção de análise estatística
  if (totalFeedbacks > 0) {
    const summaryStartRow = 4 + feedbacks.length + 1 // Ajusta para nova estrutura
    
    // Título principal da análise (linha summaryStartRow)
    for (let col = 0; col < 8; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: summaryStartRow, c: col })
      if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' }
      ws[cellRef].s = analysisTitleStyle
    }
    
    // Aplica formatação às seções de análise
    const analysisRows = [
      summaryStartRow + 2, // RESUMO GERAL
      summaryStartRow + 7, // DISTRIBUIÇÃO POR AVALIAÇÃO  
      summaryStartRow + 13 // INDICADORES DE QUALIDADE
    ]
    
    analysisRows.forEach(row => {
      for (let col = 0; col < 8; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col })
        if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' }
        ws[cellRef].s = col === 0 ? sectionHeaderStyle : summaryDataStyle
      }
    })
    
    // Aplica formatação aos dados das seções
    for (let row = summaryStartRow + 1; row < summaryStartRow + 17; row++) {
      // Pula as linhas de cabeçalho de seção
      if (analysisRows.includes(row) || row === summaryStartRow) continue
      
      for (let col = 0; col < 8; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col })
        if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' }
        
        // Destaca valores importantes na coluna B
        if (col === 1 && ws[cellRef] && (
          typeof ws[cellRef].v === 'number' || 
          (typeof ws[cellRef].v === 'string' && ws[cellRef].v.includes('⭐'))
        )) {
          ws[cellRef].s = highlightDataStyle
        } else {
          ws[cellRef].s = summaryDataStyle
        }
      }
    }
  }

  // Adiciona a planilha ao workbook
  XLSX.utils.book_append_sheet(wb, ws, "Feedbacks")

  // Nome do arquivo com timestamp
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[T:]/g, '-')
  const finalFilename = filename.replace('.xlsx', `_${timestamp}.xlsx`)

  // Salva o arquivo
  XLSX.writeFile(wb, finalFilename)
}