import { body } from 'express-validator';

const bookValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters')
        .trim(),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 200 }).withMessage('Description must be between 10 and 200 characters')
        .trim(),
    body('author')
        .notEmpty().withMessage('Author is required')
        .isLength({ min: 3, max: 100 }).withMessage('Author must be between 3 and 100 characters')
        .trim(),
    body('publishedDate')
        .notEmpty().withMessage('Published date is required'),
    body('coverImage')
        .optional()
        .isURL().withMessage('Invalid image URL'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isLength({ min: 1 }).withMessage('Book must have at least one category')
        .trim()
];

export default bookValidator;