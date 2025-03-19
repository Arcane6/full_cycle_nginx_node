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


// rota para adicionar pessoas
app.post('/add', (req, res) => {

    const post = {name: req.body.name};
    const sql = 'INSERT INTO people SET ?';


    connection.query(sql, post, (err, result) => {
      if (err) throw err;
      res.send('Dados inseridos com sucesso');
    });
  }); 
  

// rota para adicionar pessoas (por url params)
app.get('/add', (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).send('nome é necessário');
    }

    const post = { name }
    const sql = 'INSERT INTO people SET ?';


    connection.query(sql, post, (err, result) => {
      if (err) throw err;
      res.send('Dados inseridos com sucesso');
    });
  }); 
  


app.listen(port, () => {
    console.log('rodando na porta: ', port)
})
