const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const port = process.env.PORT || 5000;

const app = express();

const connectDB = require("./config/db");

// Connect to Database
connectDB();

// prevent cors error.
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

if (process.env.NODE_ENV === 'production') {
  // Set build folder as static folder
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Project...' })
  })
}

app.listen(port, console.log(`Server running on port ${port}`));
