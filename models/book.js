var moongose = require('mongoose');
var Schema = moongose.Schema;

var BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'Author',
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    genre: [{
        type: Schema.ObjectId,
        ref: 'Genre'
    }]
});

// virtual for Book's URL
BookSchema
    .virtual('url').get(function () {
        return '/catalog/book/' + this._id
    });

BookSchema.virtual('due_back_formatted')
    .get(() => moment(this.due_back)
        .format('DD - MMMM - YYYY'));

module.exports = moongose.model('Book', BookSchema);