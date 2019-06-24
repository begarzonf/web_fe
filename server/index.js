const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

class Champion {
    constructor(name, attackDamage,link_page) {
        this.name = name
        this.attackDamage = attackDamage
        this.link_page = link_page
    }
}


const schema = buildSchema(`
  type Query {
    language: String
    getChampions:  [Champion]
  }

  type Champion {
    name: String
    attackDamage: Float
    link_page: String
  }

`)

const champions = [
    new Champion('Ashe',1400,"https://www.youtube.com/watch?v=0QA78q_Wmy4"),
    new Champion('Garen',145,"https://www.google.com"),
    new Champion('Graves',200,"https://es.wikipedia.org/wiki/Wikipedia:Portada"),
    new Champion('Sona',450,"https://www.w3schools.com/howto/howto_css_image_text.asp"),
    new Champion('Jana',89,"https://www.3djuegos.com"),
    new Champion('Warwcik',195,"https://medium.com"),
    new Champion('Brayo',754,"https://www.udacity.com")
]

const rootValue = {
    language: () => "fafsaers",

    getChampions: () => champions

}



const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))
app.listen(4000, () => console.log('Listening on 4000'))



