let moongose = require('mongoose');
let Schema = moongose.Schema;

let GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    }
});

GenreSchema.virtual('url').get(() => `/catalog/genre/${this._id}`);

module.exports = moongose.model('Genre', GenreSchema);