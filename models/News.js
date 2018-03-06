const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String,
        unique: true
    },
    snippet: {
        type: String
    },
    url: {
        type: String
    },
    date: {
        type: String
    }, 
    byline: {
        type: String
    },
    image: {
        type: String
    },
    note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;