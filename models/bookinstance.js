var moment = require('moment');
var moongose = require('mongoose');
var Schema = moongose.Schema;

var BookInstanceSchema = new Schema({
    book: {
        type: Schema.ObjectId,
        ref: 'Book',
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back: {
        type: Date,
        default: Date.now
    }
});

BookInstanceSchema
    .virtual('url')
    .get(function () {
        return `/catalog/bookinstance/${this._id}`
    });
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(() => moment(this.due_back)
        .format('DD - MMMM - YYYY'));

module.exports = moongose.model('BookInstance', BookInstanceSchema);