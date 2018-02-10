let Genre = require('../models/genre'),
    Book = require('../models/book'),
    async = require('async'),
    mongoose = require('mongoose');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
    // var id = mongoose.Types.ObjectId(req.params.id);

    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },

        genre_books: function (callback) {
            Book.find({
                    'genre': req.params.id
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
    // res.send(`${notImp} pag detail genre`);
};

// DISPLAY genre CREATE FORM ON GET 
exports.genre_create_get = (req, res) => {
    res.render('genre_form', {
        title: 'Create Genre'
    })
};

// HANDLE genre CREATE ON POST
exports.genre_create_post = [

    // Valide que o campo do nome não está vazio.
    body('name', 'Genre name required').isLength({min:1}).trim(),

    // Sanitize (trim e escape) o campo de nome.
    sanitizeBody('name').trim().escape(),

    // Solicitação de processo após validação e sanitização.
    (req, res, next) => {
        
        // Extraia os erros de validação de uma solicitação (req).
        const errors = validationResult(req);

        // Crie um objeto de gênero com dados escapados e aparados.
        var genre = new Genre({
            name: req.body.name
        });

        if (!errors.isEmpty()) {

            // Existem erros. Render novamente o formulário com valores higienizados / mensagens de erro.
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array()
            });
        return;
        }
        else {
            // Os dados do formulário são válidos.             
            // Verifique se o gênero com o mesmo nome já existe.
            Genre.findOne({'name': req.body.name})
            .exec(function(err, found_genre) {
                if (err) next(err);

                // Gênero existe, redirecione para a página de detalhes.
                if (found_genre) res.redirect(found_genre.url);
                else {
                    genre.save(function(err) {
                        if (err) next(err);

                        // Gênero salvo. Redirecione a página de detalhes do gênero.
                        res.redirect(genre.url);
                    })
                }
            });
        }
    }


];

// DISPLAY genre DELETE FORM ON GET.
exports.genre_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER genre DELETE ON POST.
exports.genre_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY genre UPDATE FORM ON GET 
exports.genre_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER genre UPDATE ON POST
exports.genre_update_post = (req, res) => res.send(`${notImp} update POST`);