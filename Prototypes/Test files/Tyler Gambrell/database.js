const pg = require('pg');
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var config = {
    user: 'postgres',
    database: 'test',
    password: 'password',
    port: 5432
};
/*
const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
    'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });
*/

var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
    if(err){
        return console.error('error fetching client: ', err);
    }
    client.query(
        'CREATE TABLE users(id SERIAL PRIMARY KEY, username varchar(80) not null, password varchar(80) not null, email varchar(80) not null, role INTEGER not null)');

   // done();

});
//pool.end();

pool.on('error', function(err, client){
  console.error('idle client error', err.message, err.stack)
})