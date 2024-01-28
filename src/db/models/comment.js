const knex = require('../knex');

class Comment {
 static async create(user_id, event_id, text) {
    try {
      const query = `INSERT INTO comments (user_id, event_id, text)
    VALUES (?, ?, ?) RETURNING id`;
      const args = [user_id, event_id, text];
      console.log(args);
      const { rows } = await knex.raw(query, args);
      console.log(rows);
      return rows[0].id;
      
    } catch (err) {
        console.error(err);
        return null;
      }
  }
  static async commentsOnEvent(event_id) {
    try {
      const query = `SELECT comments.*
      FROM comments
      JOIN events ON comments.event_id = events.id
      WHERE events.id = ?`;
      const args = [event_id];
      console.log(args);
      const { rows } = await knex.raw(query, args);
      console.log(rows);
      return rows || [];
      
    } catch (err) {

        
        console.error(err);
        return null;
      
    }
  }
  static async commentsByUser(user_id) {
    try {
      const query = `SELECT comments.*
      FROM comments
      JOIN events ON comments.event_id = events.id
      WHERE comments.user_id = ?`;
      const args = [user_id];
      console.log(args);
      const { rows } = await knex.raw(query, args);
      console.log(rows);
      return rows || [];
      
    } catch (err) {

        
        console.error(err);
        return null;
      
    }
  }

}
//SELECT comments.*


module.exports = Comment;