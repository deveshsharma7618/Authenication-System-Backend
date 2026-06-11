import Book from '../models/book.model.js';

const seedBooks = async (req, res) => {
    await Book.deleteMany({});

    [
        {
            "title": "The Pragmatic Programmer",
            "description": "A practical guide to software craftsmanship and professional programming practices.",
            "author": "Andrew Hunt and David Thomas",
            "publishedDate": "1999-10-30",
            "coverImage": "https://example.com/images/pragmatic-programmer.jpg",
            "category": ["Programming", "Technology"]
        },
        {
            "title": "Clean Code",
            "description": "A handbook of agile software craftsmanship that teaches how to write maintainable code.",
            "author": "Robert C. Martin",
            "publishedDate": "2008-08-11",
            "coverImage": "https://example.com/images/clean-code.jpg",
            "category": ["Programming", "Software Engineering"]
        },
        {
            "title": "Atomic Habits",
            "description": "A guide to building good habits and breaking bad ones through small daily improvements.",
            "author": "James Clear",
            "publishedDate": "2018-10-16",
            "coverImage": "https://example.com/images/atomic-habits.jpg",
            "category": ["Self-Help", "Productivity"]
        },
        {
            "title": "Deep Work",
            "description": "Strategies for focused success in a distracted world.",
            "author": "Cal Newport",
            "publishedDate": "2016-01-05",
            "coverImage": "https://example.com/images/deep-work.jpg",
            "category": ["Productivity", "Career"]
        },
        {
            "title": "The Alchemist",
            "description": "A philosophical novel about pursuing one's dreams and destiny.",
            "author": "Paulo Coelho",
            "publishedDate": "1988-04-15",
            "coverImage": "https://example.com/images/the-alchemist.jpg",
            "category": ["Fiction", "Adventure"]
        },
        {
            "title": "Sapiens",
            "description": "An exploration of the history and evolution of humankind.",
            "author": "Yuval Noah Harari",
            "publishedDate": "2011-06-04",
            "coverImage": "https://example.com/images/sapiens.jpg",
            "category": ["History", "Science"]
        },
        {
            "title": "The Psychology of Money",
            "description": "Timeless lessons on wealth, greed, and happiness.",
            "author": "Morgan Housel",
            "publishedDate": "2020-09-08",
            "coverImage": "https://example.com/images/psychology-of-money.jpg",
            "category": ["Finance", "Personal Development"]
        },
        {
            "title": "Rich Dad Poor Dad",
            "description": "Insights into financial literacy and wealth-building principles.",
            "author": "Robert T. Kiyosaki",
            "publishedDate": "1997-04-01",
            "coverImage": "https://example.com/images/rich-dad-poor-dad.jpg",
            "category": ["Finance", "Business"]
        },
        {
            "title": "The Hobbit",
            "description": "A fantasy adventure following Bilbo Baggins on an unexpected journey.",
            "author": "J.R.R. Tolkien",
            "publishedDate": "1937-09-21",
            "coverImage": "https://example.com/images/the-hobbit.jpg",
            "category": ["Fantasy", "Adventure"]
        },
        {
            "title": "Introduction to Algorithms",
            "description": "A comprehensive textbook covering fundamental algorithms and data structures.",
            "author": "Thomas H. Cormen",
            "publishedDate": "2009-07-31",
            "coverImage": "https://example.com/images/introduction-to-algorithms.jpg",
            "category": ["Programming", "Computer Science", "Education"]
        }
    ].forEach(bookData => {
        const book = new Book(bookData);
        book.save();
    }
    );
    res.send({ message: 'Books seeded successfully' });
}



const createBook = async (req, res) => {
    const { title, description, author, publishedDate, coverImage, category } = req.body;

    const existingBook = await Book.findOne({ title, author, publishedDate });
    if (existingBook) {
        return res.status(400).send({ message: 'A book with this title already exists' });
    }


    const newBook = new Book({
        title,
        description,
        author,
        publishedDate,
        coverImage,
        category,
    });

    await newBook.save();
    res.send({
        message: 'Book created successfully',
        book: newBook,
        bookId: newBook._id,
    });
}

const getBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
}

const getBooks = async (req, res) => {
    const books = await Book.find({});
    console.log(books);
    res.send(books);
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, description, author, publishedDate, coverImage, category } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, description, author, publishedDate, coverImage, category }, { new: true });
    if (!book) {
        return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
        return res.status(404).send({ message: 'Book not found' });
    }
    res.send('Book deleted', id);
} 

export { createBook, getBook, getBooks, updateBook, deleteBook, seedBooks };