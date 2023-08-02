const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('articles.db', 'admin', '12345', {
    dialect: 'sqlite',
    storage: './db/articles.db'
})

const Article = sequelize.define('Article', {
    id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    link: {
        allowNull: false,
        type: DataTypes.STRING
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    body: {
        allowNull: false,
        type: DataTypes.STRING
    }
})
//=======================================================
const Comment = sequelize.define("Comment", {
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Article.hasMany(Comment)


Article.sync({force: true})
.then(() => console.log("DB CREATED"))
.catch(err => console.log("DB SYNC ERROR", err))

Comment.sync({force:true})
.then(() => console.log("COMMENTS CREATED"))
.catch(err => console.log("COMMENTS SYNC ERROR", err))

sequelize.authenticate()
.then(() => console.log("AUTHENTICATED"))
.catch(err => console.log("DB AUTH ERROR", err))

module.exports = {Article, Comment}
