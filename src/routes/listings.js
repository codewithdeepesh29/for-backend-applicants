// src/routes/listings.js
const express = require('express');
const router  = express.Router();
const {
  createListing,
  getListings,
  deleteListing   // 🔥 import the new action
} = require('../controllers/listingCtrl');

router.post('/',   createListing);
router.get('/',    getListings);
// DELETE /api/listings/:id
router.delete('/:id', deleteListing);

module.exports = router;
