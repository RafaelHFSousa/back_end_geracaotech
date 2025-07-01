const app = require('./app'); // Importa a configuração do app

// Pega a porta do .env ou usa 3001 como padrão
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});