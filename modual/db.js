const knex = require('knex');

const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'guestbook'
  }
});

function showGuest() {
  return db
    .from('guest')
    .select('*')
    .orderBy('id', 'desc');
}

function deleteGuest(params) {
  const { id } = params;
  console.log(params);
  return db('guest')
    .where({ id: id })
    .del()
    .returning('*');
}

module.exports = {
  showGuest,
  deleteGuest
};
