let Author = require('../models/author');
let notImp = 'NOT IMPLEMENTED: Author';
let Book = require('../models/book');
let async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
exports.author_create_get = (req, res, next) => res.render('author_form', {
    title: 'Create Author'
});

// HANDLE AUTHOR CREATE ON POST
exports.author_create_post = [

    //valida os campos.
    // validação primeiro nome
    body()
        .isLength({ min: 1})
        .trim()
        .withMessage('O primeiro nome deve ser especificado')
        .isAlphanumeric()
        .withMessage('O primeiro nome possui caracteres não alfanuméricos.'),
    
    // validação segundo nome
    body()
        .isLength({ min: 1 })
        .trim()
        .withMessage('O segundo nome deve ser especificado')
        .isAlphanumeric()
        .withMessage('O segundo nome possui caracteres não alfanuméricos.'),
    
    // validação data
    body('date_of_birth', 'data de nascimento invalida').optional({checkFalsy: true}).isISO8601(),
    body('date_of_death', 'data da morte invalida').optional({checkFalsy: true}).isISO8601(),

    // Sanitização dos campos
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    // Solicitação de processo após validação e sanitização.
    (req, res, next) => {

        // Extraia os erros de validação de uma solicitação.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            // Existem erros. Render novamente com mensagens sanitárias de valores / erros.
            res.render('author_form', {
                title: 'Create Author',
                author: req.body,
                errors: errors.array()
            })
            return;
        }
        else {
            // Os dados do formulário são válidos.

            // Criar um objeto de autor com dados escapados e aparados.
            var author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            author.save(function(err) {
                if (err) next(err);
                // Bem sucedido - redirecione para novo registro de autor.
                res.redirect(author.url);
            })
        }

    }


];

// DISPLAY AUTHOR DELETE FORM ON GET.
exports.author_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER AUTHOR DELETE ON POST.
exports.author_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY AUTHOR UPDATE FORM ON GET 
exports.author_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER AUTHOR UPDATE ON POST
exports.author_update_post = (req, res) => res.send(`${notImp} update POST`);