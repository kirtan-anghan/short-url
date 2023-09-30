const mongo = require('mongoose');

const scehma = new mongo.Schema(
  {
    actual_url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    qrcode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual getter to format createdAt as "dd-mm-yyyy"
scehma.virtual('createdAtFormatted').get(function () {
  return formatDate(this.createdAt);
});

// Helper function to format date to "dd-mm-yyyy"
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const model = mongo.model('short_url', scehma);

module.exports = model;
