const db = require('../database/author.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(__dirname + '/../public'));

app.get('/author?:authorId', function(req, res) {
  let authorId = req.query.authorId;
  db.get(authorId, function(rec) {
    console.log(rec);
    if (rec[0] === undefined) {
      res.status(404).send([]);
    } else {
      res.send({
        'authorId': rec[0].authorId,
        'firstName': rec[0].firstName,
        'middleName': rec[0].middleName,
        'lastName': rec[0].lastName,
        'job': rec[0].job,
        'employer': rec[0].employer,
        'rating': rec[0].rating,
        'reviews': rec[0].reviews,
        'students': rec[0].students,
        'courses': rec[0].courses,
        'thumbnail': rec[0].thumbnail, // will be a URL
        'bio': rec[0].bio
      });
    }
  });
});

module.exports = app;
