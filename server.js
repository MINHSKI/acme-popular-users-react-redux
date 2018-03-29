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
const jwt = require('jwt-simple');

app.get('/api/sessions/:token', (req, res, next)=> {
  try{
    const id = jwt.decode(req.params.token, 'foo').id;
    User.findById(id)
      .then( user => {
        if(user){
          return res.send(user);
        }
        const error = { status: 401 };
        throw error;
      })
  }
  catch(ex){
    throw ex;
  }
});

app.post('/api/sessions', (req, res, next)=> {
  User.findOne({ where: req.body })
    .then( user => {
      if(user){
        const token = jwt.encode({ id: user.id }, 'foo');
        return res.send(token);
      }
      const error = {status: 401 };
      throw error;
    })
    .catch(next);
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send(err);
});
const port = process.env.PORT || 3000;


const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_app');


const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  }
});

conn.sync({ force: true })
  .then( ()=> Promise.all([
    User.create({ name: 'moe', rating: 3, password: 'MOE' }),
    User.create({ name: 'larry', rating: 4, password: 'LARRY' }),
    User.create({ name: 'curly', rating: 5, password: 'CURLY' }),
  ]));


app.listen(port, ()=> console.log(`listening on port ${port}`));
