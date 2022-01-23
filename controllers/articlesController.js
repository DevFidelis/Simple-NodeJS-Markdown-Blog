const Article = require('../models/article');

const article_create = (req, res) => {
    res.render('./articles/create', { article: new Article() });
}

const article_view = async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) {
        res.redirect('/');
    } else {
        res.render('./articles/show', { article: article });
    }
}

const article_edit = async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('./articles/edit', { article: article });
}

const article_post = (req, res, next) => {
    req.article = new Article();
    next();
}

const article_update = async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}

const article_delete = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
}

const postAndUpade = (path) =>  {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
    
        try {
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
        } catch (error) {
            res.render(`./articles/${path}`, { article: article });
        }
    }
}

module.exports = {
    article_create,
    article_delete,
    article_edit,
    article_post,
    article_update,
    article_view,
    postAndUpade
}
