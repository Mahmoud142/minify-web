
const { check } = require('express-validator');
const {validatorMiddleware} = require('../middlewares/validator.middleware');

// validate the long url
exports.urlValidator = [
    check('longUrl').isURL().withMessage('Please enter a valid URL.'),
    validatorMiddleware
];