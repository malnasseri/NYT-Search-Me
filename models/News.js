const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String
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
    note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;