// src/models/listing.js
const db = require('../db');

const Listing = {
  /**
   * Insert a new listing into the database.
   * @param {Object} data
   * @param {string} data.title
   * @param {string} data.description
   * @param {number} data.rent
   * @param {string} data.address
   * @param {number} data.rooms
   * @param {string} data.contact_info
   * @returns {Promise<number>} the new listing's ID
   */
  async create({ title, description, rent, address, rooms, contact_info }) {
    const result = await db.query(
      `INSERT INTO listings 
         (title, description, rent, address, rooms, contact_info)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [title, description, rent, address, rooms, contact_info]
    );
    return result.rows[0].id;
  },

  /**
   * Retrieve all listings, most recent first.
   * @returns {Promise<Array>} array of listing objects
   */
  async findAll() {
    const result = await db.query(
      `SELECT id, title, description, rent, address, rooms, contact_info, created_at
         FROM listings
       ORDER BY created_at DESC`
    );
    return result.rows;
  },

  /**
   * Delete a listing by ID.
   * @param {number} id
   * @returns {Promise<boolean>} true if deleted, false if not found
   */
  async delete(id) {
    const result = await db.query(
      `DELETE FROM listings
       WHERE id = $1
       RETURNING id`,
      [id]
    );
    // rowCount is > 0 if something was deleted
    return result.rowCount > 0;
  }
};

module.exports = Listing;
