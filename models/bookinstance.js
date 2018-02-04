let moment = require('moment');
let moongose = require('mongoose');
let Schema = moongose.Schema;

let BookInstanceSchema = new Schema({
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
    .get(() => `/catalog/bookinstance/${this._id}`);
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(() => moment(this.due_back)
        .format('D, MMMM , YYYY'));

module.exports = moongose.model('BookInstance', BookInstanceSchema);