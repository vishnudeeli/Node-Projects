const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const blogPostsRouter = require('./routes/blogPosts');
app.use('/api', blogPostsRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vishnu1406@',
  database: 'test',
});

// CREATE
router.post('/blog-posts', (req, res) => {
  const { title, content, author, publication_date } = req.body;
  const query = 'INSERT INTO blog_posts (title, content, author, publication_date) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, content, author, publication_date], (error, results) => {
    if (error) throw error;
    res.sendStatus(201);
  });
});

// READ
router.get('/blog-posts', (req, res) => {
  const query = 'SELECT * FROM blog_posts';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// UPDATE


router.put('/blog-posts/:id', (req, res) => {
  const { title, content, author, publication_date } = req.body;
  const postId = req.params.id;
  const query = 'UPDATE blog_posts SET title = ?, content = ?, author = ?, publication_date = ? WHERE id = ?';
  connection.query(query, [title, content, author, publication_date, postId], (error, results) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// DELETE
router.delete('/blog-posts/:id', (req, res) => {
  const postId = req.params.id;
  const query = 'DELETE FROM blog_posts WHERE id = ?';
  connection.query(query, [postId], (error, results) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

module.exports = router;
