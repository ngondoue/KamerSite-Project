const mongoose = require('mongoose');

// Links a user to a place they've saved. One row per saved place.
const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  },
  { timestamps: true }
);

// A user can only favorite the same place once.
favoriteSchema.index({ user: 1, place: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
