const db = require('../database/author.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(express.static(__dirname + '/../public'));

app.get('/author?:authorId', function (req, res) {
    let authorId = req.query.authorId;
    db.get(authorId, function (rec) {
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

app.post('/author', function (req, res) {
    const data = [];
    let author = req.body;
    console.log(req.body);
    let bio = `${author.firstName} ${author.middleName} ${author.lastName} works for ${author.employer}`;
    data.push({
        'authorId': author.authorId,
        'firstName': author.firstName,
        'middleName': author.middleName,
        'lastName': author.lastName,
        'job': author.job,
        'employer': author.employer,
        'rating': (Number.parseFloat((Math.random() * 2) + 3).toFixed(1)),
        'reviews': Math.floor(Math.random() * 100000),
        'students': Math.floor(Math.random() * 1000000),
        'courses': Math.floor(Math.random() * 90) + 10,
        'thumbnail': author.thumbnail,
        'bio': bio
    });
    db.save(data);
    res.status(200).json({
        message: req.body
    });
});

app.put('/author?:authorId', function (req, res) {
    let author = req.body;
    console.log('PUT METHOD =====> ', req.body);
    let bio = `${author.firstName} ${author.middleName} ${author.lastName} works for ${author.employer}`;
    db.update({
        'authorId': author.authorId,
        'firstName': author.firstName,
        'middleName': author.middleName,
        'lastName': author.lastName,
        'job': author.job,
        'employer': author.employer,
        'rating': (Number.parseFloat((Math.random() * 2) + 3).toFixed(1)),
        'reviews': Math.floor(Math.random() * 100000),
        'students': Math.floor(Math.random() * 1000000),
        'courses': Math.floor(Math.random() * 90) + 10,
        'thumbnail': author.thumbnail,
        'bio': bio
    }, (err) => {
        if (err) {
            res.status(404).send('failed to update');
        } else {
            res.status(200).send('data has been updated');
        }
    });
});

app.delete('/author?:authorId', function (req, res) {
    let authorId = req.query.authorId;
    db.deleteRec(authorId, (err) => {
        if (err) {
            res.status(404).send('failed to delete');
        } else {
            res.status(200).send('data has been deleted');
        }
    });
});

module.exports = app;
