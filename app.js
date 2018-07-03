const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended :true}));
app.use(methodOverride('_method'));

const users = [];
var id = 1;

app.get("/", (req,res,next) => {
   return res.redirect('/users');
});

app.get('/users', (req,res,next) =>{
    return res.render('index', {users});
});
app.get('/users/new', (req,res,next) =>{
    return res.render('new');
});
app.get('/users/:id', (req,res,next) => {
   const user = users.find(val => val.id === Number(req.params.id));
    return res.render('show', {user});
});

app.get('/users/:id/edit', (req,res,next) => {
   const user = users.find(val => val.id === Number(req.params.id));
   return res.render('edit', {user});
});

app.post('/users', (req,res,next) => {
    users.push({
    name: req.body.name,
    id
});
    id++
    return res.redirect('/users')
});

app.patch('/users/:id', (req,res,next) => {
   const user = user.find(val => val.id === Number(req.params.id));
   user.name = req.body.name;
   return res.redirect('/users');
});
app.delete('users/:id', (req,res,next) => {
   users.filter(val => val.id !== Number(req.params.id));
    return res.redirect('/users');
});

app.listen(3000, () => {
    console.log('Server lock and loaded on port 3000...');
});
