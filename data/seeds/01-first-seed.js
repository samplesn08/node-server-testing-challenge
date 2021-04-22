
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'frodo', password: '123'},
        {username: 'sam', password: '456'},
        {username: 'merry', password: '789'}
      ]);
    });
};
