let moongose = require('mongoose');
let Schema = moongose.Schema;
let BookSchema = new Schema(
    {
        title:{type: String, required: true},
        author:{type: Schema.ObjectId, ref:'Author', required: true},
        summary:{type: String, required: true},
        isbn:{type: String, required: true},
        genre:[{type: Schema.ObjectId, ref: 'Genre'}]
    }
);

// virtual for Book's URL
BookSchema.virtual('url').get(() => `/catalog/book/${this._id}`);

module.exports = moongose.model('Book', BookSchema);