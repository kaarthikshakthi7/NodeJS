const express = require('express')
var mysql = require('mysql');
const app= express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views','./views');
var con = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "sesha",
    password: "Sesha@1290",
    database: "azureApp"
  });
app.get('/',(req,res)=> {
        con.query("SELECT * FROM Persons", function (err, result, fields) {
          if (err) throw err;
    res.render('first_view', {
        persons:{result}
    });
        });
     
})

app.get('/addData',(req,res)=> {
    res.render('add_form');
})
app.post('/newPerson',(req,res)=> {
        con.query("INSERT INTO Persons VALUES('"+req.body.Id+"','"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.address+"','"+req.body.city+"' )", function (err, result, fields) {
          if (err) throw err;
        });
     
        res.redirect('/');
})
app.listen(8081, () => {
    console.log('listening on port 8081')
})