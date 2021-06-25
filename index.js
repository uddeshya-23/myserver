
    const { ApolloServer, PubSub } = require('apollo-server');
    const mongoose = require('mongoose');
    const path= require('path')
    const typeDefs = require('./graphql/typeDefs');
    const resolvers = require('./graphql/resolvers');
    const { MONGODB } = require('./config.js');
    
    const pubsub = new PubSub();
    
    const PORT = process.env.PORT || 5000;
   
    //if (process.env.NODE_ENV === 'production'){
    //  app.use(express.static('client/build'));
    //  app.get('*',(req, res) => {
    //    res.sendFile(path.resolve(__dirname, 'client' , 'index.html'));

     // });
   // }
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req, pubsub })
    });
    
    mongoose
      .connect(MONGODB, { useNewUrlParser: true })
      .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
      })
      .then((res) => {
        console.log(`Server running at ${res.url}`);
      })
      .catch(err => {
        console.error(err)
      })