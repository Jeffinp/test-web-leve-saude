// seed.cjs
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')
const serviceAccount = require('../secrets/admin.json')

initializeApp({
    credential: cert(serviceAccount),
})

const db = getFirestore()

const feedbacks = [
    {
        comment: 'Muito bom!!',
        rating: 5,
        userName: 'Beatriz Oliveira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Ótimo atendimento!',
        rating: 4,
        userName: 'Carlos Henrique',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Poderia ser mais rápido.',
        rating: 3,
        userName: 'Ana Lima',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Excelente experiência!',
        rating: 5,
        userName: 'Rafael Souza',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Interface confusa',
        rating: 2,
        userName: 'Juliana Moraes',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento excelente, recomendo!',
        rating: 5,
        userName: 'Lucas Martins',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Gostei muito do serviço.',
        rating: 4,
        userName: 'Fernanda Silva',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Achei o tempo de espera longo.',
        rating: 2,
        userName: 'Marcos Paulo',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe muito atenciosa.',
        rating: 5,
        userName: 'Patrícia Gomes',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Ambiente agradável.',
        rating: 4,
        userName: 'João Pedro',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Pouca informação disponível.',
        rating: 3,
        userName: 'Sofia Costa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito rápido e eficiente.',
        rating: 5,
        userName: 'Gabriel Almeida',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Não gostei do atendimento.',
        rating: 1,
        userName: 'Camila Ribeiro',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço razoável.',
        rating: 3,
        userName: 'Ricardo Lima',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom, voltarei!',
        rating: 5,
        userName: 'Larissa Fernandes',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Precisa melhorar a comunicação.',
        rating: 2,
        userName: 'Felipe Duarte',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento personalizado.',
        rating: 4,
        userName: 'Amanda Souza',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Gostei da praticidade.',
        rating: 4,
        userName: 'Vinícius Torres',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe pouco preparada.',
        rating: 2,
        userName: 'Bruna Carvalho',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Ótima experiência!',
        rating: 5,
        userName: 'Eduardo Pires',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Sistema fácil de usar.',
        rating: 4,
        userName: 'Isabela Nunes',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Pouca agilidade.',
        rating: 2,
        userName: 'Thiago Castro',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito satisfeito!',
        rating: 5,
        userName: 'Renata Melo',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento ruim.',
        rating: 1,
        userName: 'Pedro Henrique',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço eficiente.',
        rating: 4,
        userName: 'Tatiane Freitas',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Gostei do suporte.',
        rating: 4,
        userName: 'Danilo Barbosa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe excelente.',
        rating: 5,
        userName: 'Aline Pereira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Não recomendo.',
        rating: 1,
        userName: 'Roberto Silva',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom atendimento.',
        rating: 5,
        userName: 'Letícia Santos',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço mediano.',
        rating: 3,
        userName: 'Gustavo Rocha',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento rápido.',
        rating: 5,
        userName: 'Marta Oliveira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe precisa melhorar.',
        rating: 2,
        userName: 'Simone Costa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom serviço.',
        rating: 4,
        userName: 'Alexandre Ramos',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento excelente.',
        rating: 5,
        userName: 'Cristina Lopes',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Pouca atenção ao cliente.',
        rating: 2,
        userName: 'Fábio Teixeira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Gostei muito!',
        rating: 5,
        userName: 'Débora Martins',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço ruim.',
        rating: 1,
        userName: 'Wesley Souza',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe dedicada.',
        rating: 5,
        userName: 'Tatiana Lima',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento satisfatório.',
        rating: 4,
        userName: 'Rafael Costa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom serviço.',
        rating: 4,
        userName: 'Jéssica Almeida',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe pouco atenciosa.',
        rating: 2,
        userName: 'André Santos',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Ótimo atendimento.',
        rating: 5,
        userName: 'Sueli Rodrigues',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço excelente.',
        rating: 5,
        userName: 'Maurício Ferreira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe precisa melhorar.',
        rating: 2,
        userName: 'Paulo César',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom atendimento.',
        rating: 5,
        userName: 'Lívia Souza',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço mediano.',
        rating: 3,
        userName: 'Rodrigo Oliveira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento rápido.',
        rating: 5,
        userName: 'Patrícia Lima',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe precisa melhorar.',
        rating: 2,
        userName: 'Sérgio Costa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom serviço.',
        rating: 4,
        userName: 'Carla Ramos',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento excelente.',
        rating: 5,
        userName: 'Cristiano Lopes',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Pouca atenção ao cliente.',
        rating: 2,
        userName: 'Fábio Teixeira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Gostei muito!',
        rating: 5,
        userName: 'Débora Martins',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço ruim.',
        rating: 1,
        userName: 'Wesley Souza',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe dedicada.',
        rating: 5,
        userName: 'Tatiana Lima',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento satisfatório.',
        rating: 4,
        userName: 'Rafael Costa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom serviço.',
        rating: 4,
        userName: 'Jéssica Almeida',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe pouco atenciosa.',
        rating: 2,
        userName: 'André Santos',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Ótimo atendimento.',
        rating: 5,
        userName: 'Sueli Rodrigues',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço excelente.',
        rating: 5,
        userName: 'Maurício Ferreira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe precisa melhorar.',
        rating: 2,
        userName: 'Paulo César',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom atendimento.',
        rating: 5,
        userName: 'Lívia Souza',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Serviço mediano.',
        rating: 3,
        userName: 'Rodrigo Oliveira',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento rápido.',
        rating: 5,
        userName: 'Patrícia Lima',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Equipe precisa melhorar.',
        rating: 2,
        userName: 'Sérgio Costa',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Muito bom serviço.',
        rating: 4,
        userName: 'Carla Ramos',
        createdAt: Timestamp.now(),
    },
    {
        comment: 'Atendimento excelente.',
        rating: 5,
        userName: 'Cristiano Lopes',
        createdAt: Timestamp.now(),
    },
]

async function seedFeedbacks() {
    const ref = db.collection('feedbacks')

    for (const feedback of feedbacks) {
        const snapshot = await ref
            .where('userName', '==', feedback.userName)
            .where('comment', '==', feedback.comment)
            .get()

        if (snapshot.empty) {
            await ref.add(feedback)
            console.log(`✅ Feedback de ${feedback.userName} adicionado.`)
        } else {
            console.log(`⚠️ Feedback de ${feedback.userName} já existe. Ignorado.`)
        }
    }

    console.log('🏁 Processo de seed finalizado.')
}

seedFeedbacks().catch(console.error)
