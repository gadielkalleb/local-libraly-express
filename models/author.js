var moongose = require('mongoose'),
    moment = require('moment');

var Schema = moongose.Schema;

var AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    family_name: {
        type: String,
        required: true,
        max: 100
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    },
});

// virtual for author 's full name
AuthorSchema.virtual('name').get(function () {
    return `${this.first_name} ${this.family_name}`;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
    return `/catalog/author/${this._id}`
});

AuthorSchema
    .virtual('lifespan')
    .get(function () {
        var lifetime_string;

        if (this.date_of_birth == undefined) {
            lifetime_string = 'Não a data de nascimento registrada';
            return lifetime_string;
        }
        else lifetime_string = moment(this.date_of_birth).format('DD-MMMM-YYYY');

        lifetime_string += ' - ';

        if (this.date_of_death == undefined) lifetime_string += 'Data de morte não registrada';
        else lifetime_string += moment(this.date_of_death).format('DD-MMMM-YYYY');

        return lifetime_string
    });

AuthorSchema
    .virtual('date_of_birth_yyyy_mm_dd')
    .get(function () {
        return moment(this.date_of_birth).format('YYYY-MM-DD');
    });

AuthorSchema
    .virtual('date_of_death_yyyy_mm_dd')
    .get(function () {
        return moment(this.date_of_death).format('YYYY-MM-DD');
    });


// export model
module.exports = moongose.model('Author', AuthorSchema);