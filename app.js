const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send(layout(''));
});

const init = async () => {
  await db.sync({ force: true });
  // make sure that you have a PORT constant
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

init();
