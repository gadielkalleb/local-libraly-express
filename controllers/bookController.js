let Book = require('../models/book'),
    Author = require('../models/author'),
    Genre = require('../models/genre'),
    BookInstance = require('../models/bookinstance');

let async = require('async'),
    mongoose = require('mongoose');

let notImp = 'NOT IMPLEMENTED: Book';

exports.index = (req, res) => {

    async.parallel({
        book_count: function (callback) {
            Book.count(callback);
        },
        book_instance_count: function (callback) {
            BookInstance.count(callback);
        },
        book_instance_available_count: function (callback) {
            BookInstance.count({
                status: 'Available'
            }, callback);
        },
        author_count: function (callback) {
            Author.count(callback);
        },
        genre_count: function (callback) {
            Genre.count(callback);
        },
    }, function (err, results) {
        res.render('index', {
            title: 'Local Library Home',
            error: err,
            data: results
        })
    });
};

// Display list of all Books.
exports.book_list = function (req, res, next) {

    Book.find({}, 'title author')
        .populate('author')
        .exec(function (err, list_books) {
            if (err) next(err);
            //Successful, so render
            res.render('book_list', {
                title: 'Book List',
                book_list: list_books
            });
        });

};

// DISPLAY DETAIL PAGE FOR A SPECIFIC book
// exports.book_detail = (req, res) => res.send(`${notImp} detail: ${req.params.id}`);

exports.book_detail = function (req, res, next) {

    async.parallel({
        book: function (callback) {

            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        book_instance: function (callback) {

            BookInstance.find({
                    'book': req.params.id
                })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.book == null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', {
            title: 'Title',
            book: results.book,
            book_instances: results.book_instance
        });
    });

};


// DISPLAY book CREATE FORM ON GET 
exports.book_create_get = (req, res) => res.send(`${notImp} create GET`);

// HANDLE book CREATE ON POST
exports.book_create_post = (req, res) => res.send(`${notImp} create POST`);

// DISPLAY book DELETE FORM ON GET.
exports.book_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER book DELETE ON POST.
exports.book_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY book UPDATE FORM ON GET 
exports.book_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER book UPDATE ON POST
exports.book_update_post = (req, res) => res.send(`${notImp} update POST`);