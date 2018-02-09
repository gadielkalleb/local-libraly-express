let BookInstance = require('../models/bookinstance');
let notImp = 'NOT IMPLEMENTED: BookInstance';

// DISPLAY LIST OF ALL bookinstanceS
exports.bookinstance_list = (req, res, next) => {

    BookInstance.find()
        .populate('book')
        .exec((err, list_bookinstances) => {
            if (err) next(err);

            // Successful, so render
            res.render('bookinstance_list', {
                title: 'Book Instance list',
                bookinstance_list: list_bookinstances
            });
        });
};

// DISPLAY DETAIL PAGE FOR A SPECIFIC bookinstance
exports.bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err, bookinstance){
        if (err) next(err);
        if (bookinstance==null) {
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }
        res.render('bookinstance_detail', {
            title: `Book: ${bookinstance.book.title}`, 
            bookinstance: bookinstance
        });
    })
};

// DISPLAY bookinstance CREATE FORM ON GET 
exports.bookinstance_create_get = (req, res) => res.send(`${notImp} create GET`);

// HANDLE bookinstance CREATE ON POST
exports.bookinstance_create_post = (req, res) => res.send(`${notImp} create POST`);

// DISPLAY bookinstance DELETE FORM ON GET.
exports.bookinstance_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER bookinstance DELETE ON POST.
exports.bookinstance_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY bookinstance UPDATE FORM ON GET 
exports.bookinstance_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER bookinstance UPDATE ON POST
exports.bookinstance_update_post = (req, res) => res.send(`${notImp} update POST`);