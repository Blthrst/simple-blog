const express = require('express')
const articlesRouter = express.Router()
const { Article } = require('../db/database')

articlesRouter.get('/articles', async (req, res) => {
    const articles = await Article.findAll({ raw: true })
    const linksToArticles = articles.map(elem => {
        return {link:`<a href="/articles/${elem.link}">${elem.title}</a>`}
    })
    res.render('../views/listOfArticles', { articles: linksToArticles })
})

articlesRouter.get('/articles/:target', async (req, res) => {
    const target = req.params.target.replaceAll("_", " ")
    const searchResult = await Article.findOne({ where: { title: target } })
    if (searchResult) {
        try {
            const correspondingComments = await searchResult.getComments()
            res.render('../views/currentArticle', { title: searchResult.title, text: searchResult.body, comments: correspondingComments, err: null })
        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        console.log('Error', target)
        res.end()
    }
})

articlesRouter.post('/articles/:target', async (req, res) => {
    const target = req.params.target.replaceAll("_", " ")
    const article = await Article.findOne({ where: { title: target } })
    if (article) {
        const author = req.body.commentAuthor
        const text = req.body.commentText
        if (author && text) {
            await article.createComment({ author, text })
            console.log("POST METHOD IS WORKING")
            res.redirect('back')
        } else {
            res.redirect(401, 'back')
        }
    }
})




module.exports = { articlesRouter }