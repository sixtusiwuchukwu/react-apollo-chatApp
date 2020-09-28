const express = require("express");

const mongoose = require("mongoose");

const http = require("http");

// cofiguring server to use .env file
require("dotenv").config({ path: "config.env" });

const { ApolloServer, PubSub } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./src/schema");
const datasources = require("./src/datasource");

// initialize app
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,PATCH,UPDATE"
    );
    return res.status(200).json({});
  }
  next();
});

// connect to database

mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database is connected"))
  .catch((err) => {
    console.error("database is not connected", err);
  });

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: () => console.log("websocket connected"),
    onDisconnect: () => console.log("websocket disconnected"),
  },
  context: ({ req, res }) => ({
    req,
    res,
    pubsub,
    datasources,
    engine: {
      reportSchema: true,
    },
  }),
  introspection: true,
  tracing: true,
  playground: true,
});
// setting middleware

server.applyMiddleware({ app, path: "/" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// initialize server port
const PORT = process.env.PORT;
const mode = process.env.NODE_ENV === "production";
const BASE_URL = mode
  ? `https://eventschedule.herokuapp.com${server.graphqlPath}`
  : `http://localhost:${PORT}${server.graphqlPath}`;

console.log("production:", mode);

httpServer.listen({ port: PORT || 2000 }, () =>
  console.log(`🚀 Server ready at ${BASE_URL}`)
);
console.log(
  `subcription is ready at localhost:${PORT}${server.subscriptionsPath}`
);
