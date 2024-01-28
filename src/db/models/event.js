const knex = require('../knex');

class Event {
  static async recentEvents() {
    const query = `SELECT events.*, STRING_AGG(event_tags.name, ', ') AS tag_names
    FROM events
    JOIN event_tags_events ON events.id = event_tags_events.event_id
    JOIN event_tags ON event_tags_events.event_tag_id = event_tags.id
    GROUP BY events.id, events.title
    ORDER BY events.date DESC
    LIMIT 50;`;
    const { rows } = await knex.raw(query);
    return rows || [];
  }
  static async getEventsFromUser(user_id) {
    const query = `SELECT events.*, STRING_AGG(event_tags.name, ', ') AS tag_names
    FROM events
    JOIN event_tags_events ON events.id = event_tags_events.event_id
    JOIN event_tags ON event_tags_events.event_tag_id = event_tags.id
    WHERE events.user_id = ?
    GROUP BY events.id, events.title
    ORDER BY events.date DESC
    LIMIT 50;`;
    const args = [user_id];
    console.log(args)
    const { rows } = await knex.raw(query, args);
    return rows || [];
  }
  static async signedUpEvents(user_id) {
    const query = `SELECT events.*, STRING_AGG(event_tags.name, ', ') AS tag_names
    FROM events
    JOIN event_relations ON events.id = event_relations.event_id
    JOIN users ON event_relations.user_id = users.id
    JOIN event_tags_events ON events.id = event_tags_events.event_id
    JOIN event_tags ON event_tags_events.event_tag_id = event_tags.id
    WHERE users.id = ? 
    GROUP BY events.id, events.title
    ORDER BY events.date DESC
    LIMIT 50`;
    const args = [user_id];
    const { rows } = await knex.raw(query, args);
    return rows || [];
  }
  static async usersInEvent(event_id) {
    const query = `SELECT users.id, users.username
    FROM users
    JOIN event_relations ON users.id = event_relations.user_id
    WHERE event_relations.event_id = ?`;
    const args = [event_id];
    const { rows } = await knex.raw(query, args);
    return rows || [];
  }
  static async signUpEvent(user_id, event_id) {
    try {
    const query = 'INSERT INTO event_relations (user_id, event_id) VALUES (?,?)  RETURNING event_id';
    const args = [user_id, event_id];
    const { rows } = await knex.raw(query, args);
    return rows || [];
    }
    catch(err) {
      console.error(err);
      return null;
    }
  }
  static async deleteRelation(user_id, event_id) {
    try {
    const query = 'DELETE FROM event_relations where user_id = ? AND event_id = ? RETURNING event_id';
    const args = [user_id, event_id];
    const { rows } = await knex.raw(query, args);
    return rows || [];
    }
    catch(err) {
      console.error(err);
      return null;
    }
  }

  static async create(title, location, description, img, date, end_date, user_id) {
    try {
      const query = `INSERT INTO events (title, location, description, img, date, end_date user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id`;
      const args = [title, location, description, img, date, end_date, user_id];
      console.log(args);
      const { rows } = await knex.raw(query, args);
      console.log(rows);
      return rows[0].id;
      
    } catch (err) {
      
        
        console.error(err);
        return null;
      
    }
  }
  static async tags(event_id, event_tag_ids) {
    try {
      // Generate placeholders for the event_tag_ids
      const placeholders = event_tag_ids.map(() => '(?, ?)').join(', ');
  
      const query = `
        INSERT INTO event_tags_events (event_id, event_tag_id)
        VALUES ${placeholders}
      `;
  
      // makes an event_id and tag id pair for each tag id
      const args = event_tag_ids.reduce((acc, tag_id) => [...acc, event_id, tag_id], []);
  
      const { rows } = await knex.raw(query, args);
  
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

}

module.exports = Event;

/*
INSERT INTO event_tags_events (event_id, event_tag_id)
VALUES (1, 2);

*/