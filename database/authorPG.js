const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'student',
    port: 5432,
});

const getRecord = (product_id) => {
    return client.query(`select distinct o.product_id, o.package_name, o.product_name, p.list_price, p.price, i.in_stock, i.inventory, s.prime, s.sold_by, s.ships_from, f.price, f.form, sl.seller_id, sl.discs, sl.price, sl.newfrom, sl.usedfrom, sl.edition, sl.form, sl.release_date from overview o left outer join price p on o.product_id = p.product_id left outer join inventory i on p.product_id = i.product_id left outer join shipping s on i.product_id = s.product_id left outer join form f on s.product_id = f.product_id left outer join seller sl on f.product_id = sl.product_id where o.product_id = ${product_id};`)
  };

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
});

