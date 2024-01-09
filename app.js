const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser'); // Para processar os dados do formulário

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

// Configurar o middleware express.static para servir arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

// Rota para interface.html
app.get('/interface.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'interface.html'));
});

app.get('/perfil.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'perfil.html'));
}); 

const ipAddress = '172.16.31.36'; //Endereço IP da máquina
const port = 3003;

app.listen(port, ipAddress, () => {
    console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});

const mysql = require('mysql2');

// Configurações de conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'acesso123',
  database: 'loja_games'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para processar o login
router.post('/login', function(req, res) {
  const { username, password } = req.body;

  // Consultar o banco de dados para verificar as credenciais
  const query = 'SELECT id FROM users WHERE nome = ? AND senha = ?';
  connection.query(query, [username, password], (err, results) => {
      if (err) {
          console.error('Erro ao consultar o banco de dados:', err);
          res.status(500).send('Erro ao consultar o banco de dados.');
      } else {
          if (results.length > 0) {
              const userId = results[0].id;

              // Redireciona para "pagina.html" e passa o ID do usuário
              res.redirect(`/interface.html?userId=${userId}`);
          } else {
              res.send('Credenciais inválidas. Por favor, tente novamente.');
          }
      }
  });
});

// Rota para processar o cadastro
router.post('/signup', function(req, res) {
  const { newUsername, newPassword, newEmail } = req.body;

  // Inserir novas informações na tabela users
  const query = 'INSERT INTO users (nome, senha, email) VALUES (?, ?, ?)';
  connection.query(query, [newUsername, newPassword, newEmail], (err, results) => {
      if (err) {
          console.error('Erro ao cadastrar usuário:', err);
          res.status(500).send('Erro ao cadastrar usuário.');
      } else {
          res.send('Cadastro bem-sucedido! Você pode fazer o login agora.');
      }
  });
});

