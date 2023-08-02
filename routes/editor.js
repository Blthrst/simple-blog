const express = require('express')
const path = require('path')
const editorRouter = express.Router()
const { Article } = require('../db/database')
const editor = path.join(__dirname, "../views", "editor.ejs")


editorRouter.get('/editor', (req, res) => {
    res.render(editor, {err: null})
})

editorRouter.post('/editor', async (req, res) => {
    const title = req.body.articleTitle
    const body = req.body.articleBody
    const link = title.replaceAll(' ', '_')
    if (title && body) {
        const original = await Article.findOne({ where: { title, body } })
        if (!original) {
            const article = await Article.create({ title, body, link })
            res.redirect(`./articles/${article.link}`)
        } else {
            res.render(editor, {err: "Article with same title is exists. Try another title."})
        }
    }
})

module.exports = { editorRouter }