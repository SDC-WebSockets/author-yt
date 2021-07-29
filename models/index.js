var db = require('../database');

module.exports = {
  messages: {
    get: function (authorId) {
      let queryString = `SELECT * FROM author WHERE author.id = ${authorId};`;
      let queryArgs = [];
      db.query(queryString, queryArgs, (err, results) => {
        if (err) {
          throw (err);
        }
        // return cb(JSON.stringify(results));
        return results;
      });
    },
    post: function (authorObj, cb) {
      let queryString = `INSERT INTO author () VALUES ('${message['room_name']}') ON DUPLICATE KEY UPDATE room_name = '${message['room_name']}'`;

      let queryArgs = [];
      db.query(queryString, queryArgs, (err, results) => {
        queryString = `INSERT INTO messages (message_text, room_id, user_id) VALUES ("${message['message_text']}", (SELECT id FROM room WHERE room_name = '${message['room_name']}'), (SELECT id FROM users WHERE user_name = '${message['user_name']}'))`;
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw (err);
          }
          cb();
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto aso above.
    get: function () {
      let queryString = 'SELECT * from users';
      let queryArgs = [];

      db.query(queryString, queryArgs, (err, results) => {
        if (err) {
          throw err;
        }
        return results;
      });
    },
    post: function (user, cb) {
      let queryArgs = [];
      let queryString = `INSERT INTO users (user_name) VALUES ('${user.username}') ON DUPLICATE KEY UPDATE user_name = '${user.username}'`;
      db.query(queryString, queryArgs, (err, results) => {
        if (err) {
          throw err;
        }
        cb();
      });
    }
  }
};

