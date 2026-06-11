import Router from 'express';
import { getBook, getBooks, createBook, updateBook, deleteBook, seedBooks } from '../controllers/books.controller.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import bookValidator from '../validator/book.validator.js';
import { validate } from '../utils/validate.js';

const router = Router();

router.get("/seed", seedBooks);

router.get('/get-books', adminMiddleware, getBooks);
router.get('/get-book/:id', getBook);

router.post('/add-book',adminMiddleware,  bookValidator, validate, createBook);

router.put('/update-book/:id', adminMiddleware, bookValidator, validate, updateBook);

router.delete('/delete-book/:id', adminMiddleware, deleteBook);


export default router;