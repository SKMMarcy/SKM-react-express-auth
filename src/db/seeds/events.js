/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


let events    =      [{ 
  title: 'test Event 1',
  location: 'Canarsie Park',
  description: 'This is a test event description.',
  img: 'https://lh3.googleusercontent.com/p/AF1QipNr8VtCBtH58TxKQOWdcwlNOfO92-SLCk7fx9fB=s1360-w1360-h1020',
  date: '2024-01-26T12:00:00Z', 
  CreatedAt: '2024-01-26T08:00:00Z', 
  user_id: 1 
},
{ 
  title: 'test Event 2',
  location: 'Prospect Park',
  description: 'Jeffrey Epstien didnt kill himself',
  img: 'https://lh3.googleusercontent.com/p/AF1QipNr8VtCBtH58TxKQOWdcwlNOfO92-SLCk7fx9fB=s1360-w1360-h1020',
  date: '2024-02-01T15:30:00Z', 
  CreatedAt: '2024-01-27T10:00:00Z', 
  user_id: 2 
}, 
{ 
  title: 'Naked Cardio',
  location: 'Prospect Park',
  description: '😏😏😏',
  img: 'https://lh3.googleusercontent.com/p/AF1QipNr8VtCBtH58TxKQOWdcwlNOfO92-SLCk7fx9fB=s1360-w1360-h1020',
  date: '2024-02-01T15:30:00Z', 
  CreatedAt: '2024-01-27T10:00:00Z', 
  user_id: 2 
},
]
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert(events);
};
