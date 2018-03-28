const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(require('body-parser').json());


app.get('/api/users', (req, res, next)=> {
  User.findAll({
    order: [['rating', 'DESC']]
  })
    .then( users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
  .then( user => {
    Object.assign(user, req.body);
    return user.save();
  })
  .then( user => res.send(user))
  .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
  .then( user => {
    return user.destroy();
  })
  .then( () => res.sendStatus(204))
  .catch(next);
});

app.use((err, req, res, next)=> {
  res.status(500).send(err);
});
const port = process.env.PORT || 3000;


const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_app');


const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  }
});

conn.sync({ force: true })
  .then( ()=> Promise.all([
    User.create({ name: 'moe', rating: 3 }),
    User.create({ name: 'larry', rating: 4 }),
    User.create({ name: 'curly', rating: 5 }),
  ]));


app.listen(port, ()=> console.log(`listening on port ${port}`));
