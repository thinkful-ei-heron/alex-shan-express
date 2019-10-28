const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res)=> {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  if(!a || a.isNaN) {
    return res.status(400).send('Please input a number');
  }
  if(!b || b.isNaN) {
    return res.status(400).send('Please input a number');
  }
  const sum = a + b;
  res.send(`The sum of ${a} and ${b} is ${sum}`);
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift);
  const letters = text.split('');
  let newArray = [];

  letters.map(letter => {
    if(letter.charCodeAt(0) <= 90 && letter.charCodeAt(0) >= 65) {
      let newCode = letter.charCodeAt(0) + shift;
      if(newCode > 90) {
        newCode = 65 + (newCode - 91);
        newArray.push(String.fromCharCode(newCode));
      }
      else {
        newArray.push(String.fromCharCode(newCode));
      } 
    }
    else if(letter.charCodeAt(0) <= 122 && letter.charCodeAt(0) >= 97) {
      let newCode = letter.charCodeAt(0) + shift;
      if(newCode > 122) {
        newCode = 97 + (newCode - 123);
        newArray.push(String.fromCharCode(newCode));
      }
      else {
        newArray.push(String.fromCharCode(newCode));
      } 
    }
    else {
      newArray.push(letter);
    }
  });

  res.send(newArray);
});

app.get('/lotto', (req, res) => {
  let numbers = req.query.arr;
  numbers = numbers.map(num => parseInt(num));
  if(req.query.arr.length !== 6) {
    return res.status(400).send('Please input six unique numbers');
  }
  numbers.forEach(number => {
    let repeats = 0;
    numbers.forEach(compare => {
      if(compare < 1 || compare >20) {
        return res.status(400).send('Please input numbers between 1 and 20');
      }
      if(compare === number) {
        repeats = repeats + 1;
      }
      if(repeats > 1) {
        return res.status(400).send('Please input unique numbers');
      }
    });
  });
  let i = 0;
  let starterNum = Math.floor(Math.random() * 20) + 1;
  let winningArr = [starterNum];
  while(i < 5) {
    let newNum = Math.floor(Math.random() * 20) + 1;

    if (!winningArr.includes(newNum)) {
      winningArr.push(newNum);
      i++;
    }
  }

  console.log(winningArr);
  console.log(numbers);

  let score = 0;

  winningArr.map(number => {
    if(numbers.includes(number)) {
      console.log(number);
      score++;
    }
  });

  if(score < 4) {
    res.send('Sorry, you lose.');
  }
  else if(score === 4) {
    res.send('Congratulations! You win a free ticket.');
  }
  else if(score === 5) {
    res.send('Congratulations! You win $100!');
  }
  else if(score === 6) {
    res.send('Wow! Unbelievable! You could have won the Mega Millions!');
  }
});

