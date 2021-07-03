const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'student',
    port: 5432,
});

const createAuthors = `CREATE TABLE authors (
    authorId integer NOT NULL,
    firstName varchar(40),
    middleName varchar(40),
    lastName varchar(40),
    job varchar(40),
    employer varchar(100),
    rating integer,
    reviews integer,
    students integer,
    courses integer,
    thumbnail varchar(100),
    bio text
);`;

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
        client.query(createAuthors, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res);
            }
        });
        // client.end();
    }
});

