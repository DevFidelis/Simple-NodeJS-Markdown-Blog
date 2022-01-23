const mongoose = require('mongoose');
const { marked } = require('marked');
const { default: slugify } = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);


const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
});

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });
    }

    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked.parse(this.markdown));
    }

    next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
