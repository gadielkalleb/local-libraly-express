let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');
let notImp = 'NOT IMPLEMENTED: BookInstance';

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res, next) {       

    Book.find({},'title')
    .exec(function (err, books) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('bookinstance_form', {
          title: 'Create BookInstance', 
          book_list:books
        });
    });
    
};
// Handle BookInstance create on POST.
exports.bookinstance_create_post = [

    // Validate fields.
    body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
    body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
    
    // Sanitize fields.
    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Book.find({},'title')
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('bookinstance_form', { 
                        title: 'Create BookInstance', 
                        book_list : books, 
                        selected_book : bookinstance.book._id , 
                        errors: errors.array(), 
                        bookinstance:bookinstance 
                    });
            });
            return;
        }
        else {
            // Data from form is valid.
            bookinstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(bookinstance.url);
                });
        }
    }
];

// DISPLAY bookinstance DELETE FORM ON GET.
exports.bookinstance_delete_get = (req, res) => res.send(`${notImp} delete GET`);

// HANDLER bookinstance DELETE ON POST.
exports.bookinstance_delete_post = (req, res) => res.send(`${notImp} delete POST`);

// DISPLAY bookinstance UPDATE FORM ON GET 
exports.bookinstance_update_get = (req, res) => res.send(`${notImp} update GET`);

// HANDLER bookinstance UPDATE ON POST
exports.bookinstance_update_post = (req, res) => res.send(`${notImp} update POST`);