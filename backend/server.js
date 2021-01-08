const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
//SIGNING FUNCTIONS

app.post('/signup', async (req, res)=>{
  const admin = req.body;
  const input = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admin.password, salt);

  connection.query(input, [admin.name, admin.email, hashedPassword], (err, result)=>{
    
    if(err){
      res.status(400).json({mg: "Email is already in use."});
    }
    
    if(!admin.name || !admin.email || !admin.password){
      res.status(400).json({mg: "Please enter all fields"});
    }

    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
      
    if (!validateEmail(admin.email)) {
      res.status(400).json({mg: "Please enter a valid email"});
    }
    
    if (admin.password.length < 5) {
      res.status(400).json({mg: "Password must be atleast 5 characters."});
    }
    
    res.send(result);
  
  });

});

app.post('/signin', async (req, res)=>{
  
  try{

    const {mail, pass} = req.body;

    if(!mail || !pass){
      res.status(400).json({mg: "Please enter all fields"})
    }
  
    var checkUser = false;

    var getUser = function(cb){
      connection.query('SELECT COUNT(1) AS result FROM admins WHERE email = ?;', [mail], (err, result)=>{
        if(err) return cb(err);
    
        if(JSON.stringify(result[0]) == '{"result":1}') checkUser = true;

        cb(null, checkUser);
  
      });
    };

    getUser(function (err, result){
      if (err) throw err;
      
      if(checkUser == false) res.status(400).json({msg: "This email has not been registerd."})

    });

    var checkPass = false;

    var getPass = function(cb){
      connection.query('SELECT password AS x FROM admins WHERE email = ?;', [mail], async (err, result)=>{
        if(err) return cb(err);
        
        checkPass = await bcrypt.compare(pass, result[0].x);

        cb(null, checkPass);
  
      });
    };

    getPass(function (err, result){
      if (err) throw err;
      
      if(!checkPass) res.status(400).json({msg: "The password you entered is incorrect."})
      
    });
    
    var getID = function(cb){
      connection.query('SELECT id FROM admins WHERE email = ?;', [mail], (err, result)=>{
        if(err) return cb(err);
        
        var user_ID = result[0].id;

        cb(null, user_ID);
  
      });
    };

    getID(function (err, result){
      if (err) throw err;
    
      const token = jwt.sign({id: result}, process.env.TOKEN_SECRET);
      res.send({
        token,
        admin: {
          id: result,
          email: mail,
          password: pass
        }
      })
      
    });

  } catch(err){
    res.status(500).json({error:err.message}) 
  }

});

app.put('/updateuser', auth, async (req,res)=>{
  const admin = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admin.password, salt);

  const command = "UPDATE admins SET name = ?, email = ?, password = ? WHERE id = ?;";
  connection.query(command, [admin.name, admin.email, hashedPassword, admin.id], (err, rows, fields)=>{
    if(err) throw err;
    console.log(rows);
    res.send('Admin Details Updated Successfully');
  })
})

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

app.delete('/admins/:id', auth, (req, res)=>{
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