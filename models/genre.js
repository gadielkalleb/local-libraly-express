var moongose = require('mongoose');
var Schema = moongose.Schema;

var GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    }
});

GenreSchema
.virtual('url')
.get(function() {
    return '/catalog/genre/'+this._id;
});

module.exports = moongose.model('Genre', GenreSchema);