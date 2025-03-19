const express = require('express');
const mysql = require('mysql');


const app = express()
const port = 3000

const config = { host: 'db', user: 'root', password: 'root', database: 'nodedb' }
const connection = mysql.createConnection(config)

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a database');
});
  

connection.query(
  `CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
  )`,
  (err, result) => {
    if (err) throw err;
    console.log("Tabela 'people' verificada/criada com sucesso!");
  }
);


// rota inicial
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM people';

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send('<h1>Full Cycle Rocks!</h1>' + JSON.stringify(result));
    });
  });


// rota pra criar a tabela (jogo rapido so para nao precisar acessar o container)
app.get('/createTable', (req, res) => {
    const sql = `CREATE TABLE people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send('Tabela criada com sucesso');
    });
  });


// rota para adicionar pessoas
app.post('/add', (req, res) => {

    const post = {name: req.body.name};
    const sql = 'INSERT INTO people SET ?';


    connection.query(sql, post, (err, result) => {
      if (err) throw err;
      res.send('Dados inseridos com sucesso');
    });
  }); 
  



app.listen(port, () => {
    console.log('rodando na porta: ', port)
})