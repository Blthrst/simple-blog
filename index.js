require('dotenv').config()
const express = require('express')
const path = require('path')
const {editorRouter} = require('./routes/editor')
const {articlesRouter} = require('./routes/articles')
const app = express()

const PORT = process.env.PORT ?? 3000

const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(urlencodedParser)
app.use(editorRouter)
app.use(articlesRouter)

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"))
})


app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT}`))