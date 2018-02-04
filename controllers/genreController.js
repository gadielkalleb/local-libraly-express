let Genre = require('../models/genre'),
    Book = require('../models/book'),
    async = require('async'),
    mongoose = require('mongoose');

let notImp = 'NOT IMPLEMENTED: Genre';

// DISPLAY LIST OF ALL genre
exports.genre_list = (req, res, next) => {

    Genre
        .find()
        .sort([
            ['name', 'ascending']
        ])
        .exec((err, list_genre) => {
            if (err) next(err);

            res.render('genre_list', {
                title: 'Genre list',
                genre_list: list_genre
            });
        })
}

// DISPLAY DETAIL PAGE FOR A SPECIFIC genre
exports.genre_detail = function (req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id);

    async.parallel({
        genre: function (callback) {
            Genre.findById(id)
                .exec(callback);
        },

        genre_books: function (callback) {
            Book.find({
                    'genre': id
                })
                .exec(callback);
        },

    }, function (err, results) {
        if (err) {
            console.log(req.params.id);
            return next(err);
        }
        if (results.genre == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('genre_detail', {
            title: 'Genre Detail',
            genre: results.genre,
            genre_books: results.genre_books
            
        });
    });

};

// DISPLAY genre CREATE FORM ON GET 
exports.genre_create_get = (req, res) => res.send(`${notImp} create GET`);

// HANDLE genre CREATE ON POST
exports.genre_create_post = (req, res) => res.send(`${notImp} create POST`);

// DISPLAY genre DELETE FORM ON GET.
exports.genre_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER genre DELETE ON POST.
exports.genre_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY genre UPDATE FORM ON GET 
exports.genre_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER genre UPDATE ON POST
exports.genre_update_post = (req, res) => res.send(`${notImp} update POST`);