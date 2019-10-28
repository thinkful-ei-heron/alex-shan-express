const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res)=> {
  const a = req.query.a;
  const b = req.query.b;
  const sum = parseInt(a) + parseInt(b);
  res.send(`The sum of ${a} and ${b} is ${sum}`);
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});