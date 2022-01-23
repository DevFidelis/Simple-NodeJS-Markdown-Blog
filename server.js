const express = require('express');
const mongoose =  require('mongoose');
const Article = require('./models/article');
const articlesRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

// connect to database (mongod --ipv6)
const dbUrl = 'mongodb://localhost/crudblog';
mongoose.connect(dbUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then((result) => {
        app.listen(5000);
        console.log('DB connected...');
    })
    .catch((err) => console.log(err));
1
// settings & middlewares
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('./articles/index', { articles: articles });
});


app.use('/articles', articlesRouter);
