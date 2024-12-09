const express = require("express")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")


async function init() {
    const app = express();
    PORT = process.env.PORT || 3000

    app.use(express.json())

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello : String
                say(name : String) : String
            }
        `,
        resolvers: {
            Query : {
                hello : () => { return "hello bhai" },
                say : (_, {name} = {name : String}) => `Hey ${name}, How are you?`
            }
        }
    })

    await gqlServer.start()

    app.get("/", (req, res) => {
        res.json({ message: "server is running" })
    })

    app.use("/graphql" , expressMiddleware(gqlServer))

    app.listen(PORT, () => {
        console.log(`server is listening at port ${PORT}`)
    })
}

init();