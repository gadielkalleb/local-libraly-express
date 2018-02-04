let Author = require('../models/author');
let notImp = 'NOT IMPLEMENTED: Author';

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

// DISPLAY DETAIL PAGE FOR A SPECIFIC AUTHOR
exports.author_detail = (req, res) => res.send(`${notImp} detail: ${req.params.id}`);

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