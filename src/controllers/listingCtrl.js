// src/controllers/listingCtrl.js
const Listing = require('../models/listing');

exports.createListing = async (req, res) => {
  const { title, description, rent, address, rooms, contact_info } = req.body;

  // 1️⃣ Required-field check
  if (!title || !description || !address || !contact_info) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // 2️⃣ Type & range checks
  const rentNum  = parseFloat(rent);
  const roomsNum = parseInt(rooms, 10);

  if (isNaN(rentNum) || rentNum <= 0) {
    return res.status(400).json({ error: 'Rent must be a positive number.' });
  }
  if (!Number.isInteger(roomsNum) || roomsNum <= 0) {
    return res.status(400).json({ error: 'Rooms must be a positive integer.' });
  }

  // 3️⃣ If all good, insert
  try {
    const id = await Listing.create({
      title,
      description,
      rent: rentNum,
      address,
      rooms: roomsNum,
      contact_info
    });
    return res.status(201).json({ message: 'Listing created', id });
  } catch (err) {
    console.error('Error creating listing:', err);
    return res.status(500).json({ error: 'Failed to create listing.' });
  }
};

/**
 * Handle GET /listings
 * Retrieves all listings, newest first.
 */
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
}

  /**
 * Handle DELETE /api/listings/:id
 */
exports.deleteListing = async (req, res) => {
  const idNum = parseInt(req.params.id, 10);
  if (isNaN(idNum)) {
    return res.status(400).json({ error: 'Invalid listing ID.' });
  }

  try {
    const deleted = await Listing.delete(idNum);
    if (!deleted) {
      return res.status(404).json({ error: 'Listing not found.' });
    }
    return res.json({ message: 'Listing deleted.' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    return res.status(500).json({ error: 'Failed to delete listing.' });
  }
};
