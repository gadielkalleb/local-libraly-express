let Author = require('../models/author');
let notImp = 'NOT IMPLEMENTED: Author';
let Book = require('../models/book');
let async = require('async');

// DISPLAY LIST OF ALL AUTHORS
exports.author_list = (req, res, next) => {

    Author.find()
        .sort([
            ['family_name', 'ascending']
        ])
        .exec((err, list_authors) => {
            if (err) next(err);
            // successful, so render
            res.render('author_list', {
                title: 'Author List',
                author_list: list_authors
            });
        });
};

// Display detail page for a specific Author.
exports.author_detail = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({
                    'author': req.params.id
                }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', {
            title: `Author Detail ${results.author.name}`,
            author: results.author,
            author_books: results.authors_books
        });
    });

};

// DISPLAY AUTHOR CREATE FORM ON GET 
exports.author_create_get = (req, res) => res.send(`${notImp} create GET`);

// HANDLE AUTHOR CREATE ON POST
exports.author_create_post = (req, res) => res.send(`${notImp} create POST`);

// DISPLAY AUTHOR DELETE FORM ON GET.
exports.author_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER AUTHOR DELETE ON POST.
exports.author_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY AUTHOR UPDATE FORM ON GET 
exports.author_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER AUTHOR UPDATE ON POST
exports.author_update_post = (req, res) => res.send(`${notImp} update POST`);