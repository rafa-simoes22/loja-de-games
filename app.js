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
    res.sendFile(path.join(__dirname+'/interface.html'));
})

// Rota para interface.html
app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/carrinho.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'carrinho.html'));
});

app.get('/pac-man.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'pac-man.html'));
});

app.get('/space-invaders.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'space-invaders.html'));
});

app.get('/donkey-kong.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'donkey-kong.html'));
});

app.get('/galaga.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'galaga.html'));
});

app.get('/centipede.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'centipede.html'));
});

app.get('/frogger.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'frogger.html'));
});

app.get('/street-fighter.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'street-fighter.html'));
});

app.get('/mario.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'mario.html'));
});

app.get('/zelda.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'zelda.html'));
});

app.get('/sonic.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'sonic.html'));
});

app.get('/mega-man.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'mega-man.html'));
});

app.get('/castlevania.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'castlevania.html'));
});

app.get('/metroid.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'metroid.html'));
});

app.get('/final-fantasy.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'final-fantasy.html'));
});

app.get('/persia.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'persia.html'));
});

app.get('/monkey-island.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'monkey-island.html'));
});

app.get('/doom.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'doom.html'));
});

app.get('/maniac.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'maniac.html'));
});

app.get('/lemmings.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'lemmings.html'));
});

app.get('/sim-city.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'sim-city.html'));
});

app.get('/oregon-trail.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'oregon-trail.html'));
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
              res.redirect(`/perfil/${userId}`);
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

// Rota para exibir o perfil do usuário
router.get('/perfil/:userId', function(req, res) {
  const userId = req.params.userId;

  // Consultar o banco de dados para obter informações do usuário
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro ao consultar o banco de dados.');
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.send(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Perfil do Usuário</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f1ddbe;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                h1 {
                  text-align: center;
                  color: #a54928;
                }
                form {
                  max-width: 400px;
                  background-color: #f1ddbe;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }
                label {
                  display: block;
                  margin-bottom: 8px;
                  color: #555;
                }
                input {
                  width: 100%;
                  padding: 10px;
                  margin-bottom: 16px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                }
          
                button {
                  background-color: #b44d3f;
                  color: #fcfcfc;
                  padding: 12px;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  width: 100%;
                  font-size: 16px;
                }
                button:hover {
                  background-color: #a54928;
                }
                a {
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <h1>Perfil do Usuário</h1>
              <form>
                <label for="username">Nome de usuário:</label>
                <input type="text" id="username" name="username" value="${user.nome}" readonly>
          
                <label for="email">E-mail:</label>
                <input type="text" id="email" name="email" value="${user.email}" readonly>
          
                <a href="/perfil/editar/${userId}"><button type="button">Editar Perfil</button></a>
              </form>
            </body>
        </html>
        `);
      } else {
        res.status(404).send('Usuário não encontrado.');
      }
    }
  });
});

// Rota para exibir o formulário de edição do perfil
router.get('/perfil/editar/:userId', function(req, res) {
  const userId = req.params.userId;

  // Consultar o banco de dados para obter informações do usuário
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro ao consultar o banco de dados.');
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.send(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Perfil do Usuário</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f1ddbe;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                h1 {
                  text-align: center;
                  color: #a54928;
                }
                form {
                  max-width: 400px;
                  background-color: #f1ddbe;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }
                label {
                  display: block;
                  margin-bottom: 8px;
                  color: #555;
                }
                input {
                  width: 100%;
                  padding: 10px;
                  margin-bottom: 16px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                }
          
                #botão {
                  background-color: #b44d3f;
                  color: #fcfcfc;
                  padding: 12px;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  width: 100%;
                  font-size: 16px;
                }
                #botão:hover {
                  background-color: #a54928;
                }
                a {
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <h1>Editar Perfil</h1>
              <form action="/perfil/editar/${userId}" method="post">
                <label for="username">Nome de usuário:</label>
                <input type="text" id="username" name="username" value="${user.nome}">
                <br>
                <label for="email">E-mail:</label>
                <input type="text" id="email" name="email" value="${user.email}">
                <br>
                <label for="email">Senha:</label>
                <input type="text" id="senha" name="senha" value="${user.senha}">
                <input id="botão" type="submit" value="Salvar">
              </form>
            </body>
          </html>
        `);
      } else {
        res.status(404).send('Usuário não encontrado.');
      }
    }
  });
});

// Rota para processar a atualização do perfil
router.post('/perfil/editar/:userId', function(req, res) {
  const userId = req.params.userId;
  const { username, email } = req.body;

  // Atualizar as informações do usuário no banco de dados
  const updateQuery = 'UPDATE users SET nome = ?, email = ? WHERE id = ?';
  connection.query(updateQuery, [username, email, userId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar o perfil do usuário:', err);
      res.status(500).send('Erro ao atualizar o perfil do usuário.');
    } else {
      res.redirect(`/perfil/${userId}`);
    }
  });
});

// Rota para adicionar um produto ao carrinho
router.post('/adicionar-ao-carrinho', function(req, res) {
  const { produto } = req.body;

  if (!produto) {
    return res.status(400).json({ message: 'Nome do produto não encontrado no corpo da solicitação.' });
  }

  // Verifica se o produto já está no carrinho
  const checkExistingQuery = 'SELECT * FROM carrinho WHERE produto = ?';
  connection.query(checkExistingQuery, [produto], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Erro ao verificar produto no carrinho:', checkErr);
      return res.status(500).json({ message: 'Erro ao verificar produto no carrinho.' });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ message: 'Este produto já está no carrinho.' });
    }

    // Insere o produto no carrinho
    const insertQuery = 'INSERT INTO carrinho (produto) VALUES (?)';
    connection.query(insertQuery, [produto], (err, results) => {
      if (err) {
        console.error('Erro ao adicionar produto ao carrinho:', err);
        return res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho.' });
      }

      res.json({ message: 'Produto adicionado ao carrinho com sucesso!' });
    });
  });
});
