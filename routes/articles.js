const express = require('express');
const articleController = require('../controllers/articlesController');
const router = express.Router();

router.get('/create', articleController.article_create);
router.get('/:slug', articleController.article_view);
router.get('/edit/:id', articleController.article_edit);
router.delete('/:id', articleController.article_delete);
router.post('/', articleController.article_post, articleController.postAndUpade('create'));
router.put('/:id', articleController.article_update, articleController.postAndUpade('edit'));

module.exports = router;
