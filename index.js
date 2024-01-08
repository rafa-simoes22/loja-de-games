const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/', router);

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