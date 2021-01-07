const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : process.env.PASSWORD,
    database : 'tournament'
})

connection.connect(function(err) {
    if (err) return console.error('connection error: ' + err.message);
  
    console.log('Connected to the MySQL server.');
});

////////////////////////////////////////////////////////////////////////////////////////////
//ADMINS FUNCTIONS

app.get('/admins', (req, res)=>{
  connection.query('SELECT * FROM admins', (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/admins/:id', (req, res)=>{
  connection.query('SELECT * FROM admins WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.post('/admins', (req, res)=>{
  const admin = req.body;
  const input = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
  connection.query(input, [admin.name, admin.email, admin.password], (err, result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.put('/admins', (req,res)=>{
  const admin = req.body;
  const command = "UPDATE admins SET name = ?, email = ?, password = ? WHERE id = ?;";
  connection.query(command, [admin.name, admin.email, admin.password, admin.id], (err, rows, fields)=>{
    if(err) throw err;
    console.log(rows);
    res.send('Admin Details Updated Successfully');
  })
})

app.delete('/admins/:id', (req, res)=>{
  connection.query('DELETE FROM admins WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Tournament FUNCTIONS

app.get('/tournaments', (req, res)=>{
  connection.query('SELECT * FROM tournaments', (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/tournaments/:id', (req, res)=>{
  connection.query('SELECT * FROM tournaments WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.post('/tournaments', (req, res)=>{
  const input = 'INSERT INTO tournaments (name, location, creator, admin_id) VALUES ("' + req.body.name+'","' + req.body.location+'","' + req.body.creator+'","' + req.body.admin_id+'")';
  connection.query(input, (err, result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.delete('/tournaments/:id', (req, res)=>{
  connection.query('DELETE FROM tournaments WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Teams FUNCTIONS

app.get('/teams', (req, res)=>{
  connection.query('SELECT * FROM teams', (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/teams/:id', (req, res)=>{
  connection.query('SELECT * FROM teams WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.post('/teams', (req, res)=>{
  const input = 'INSERT INTO teams (name, location, tournament_id) VALUES ("' + req.body.name+'","' + req.body.location+'","' + req.body.tournament_id+'")';
  connection.query(input, (err, result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.delete('/teams/:id', (req, res)=>{
  connection.query('DELETE FROM teams WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Matches FUNCTIONS

app.get('/matches', (req, res)=>{
  connection.query('SELECT * FROM matches', (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/matches/:id', (req, res)=>{
  connection.query('SELECT * FROM matches WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});

app.post('/matches', (req, res)=>{
  const input = 'INSERT INTO matches (team1_id, team2_id, score1, score2, fouls1, fouls2, tournament_id) VALUES ("' + req.body.team1_id+'","' + req.body.team2_id+'","' + req.body.score1+'","' + req.body.score2+'","' + req.body.fouls1+'","' + req.body.fouls2+'","' + req.body.tournament_id+'")';
  connection.query(input, (err, result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.delete('/matches/:id', (req, res)=>{
  connection.query('DELETE FROM matches WHERE id = ?', [req.params.id], (err, rows, fields)=>{
    if(err) throw err;
    res.send(rows);
  });
});


////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// connection.end(function(err) {
//     if (err) {
//       return console.log('closing error: ' + err.message);
//     }
//     console.log('Closed the database connection.');
// });