const express = require("express");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
// const { renderGraphiQL } = require('graphiql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "events",
    fields: {
      events: {
        type: new GraphQLList(GraphQLString),
        resolve: () => ["testing", "coding"],
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutation",
    fields: {
      createEvent: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve: (parent, args) => {
          return args.name;
        },
      },
    },
  }),
});


app.use("/graphql", createHandler({ 
  schema,
  graphiql: true 
}));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
