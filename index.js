const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    Recipe.create(data)
      .then((recipe) => {
        recipe.forEach((recipeTitle) => console.log(recipeTitle.title));
        return recipe;
      })
      .then(() => {
        return Recipe.findOneAndUpdate(
          { title:"Rigatoni alla Genovese"},
          { duration: 100 },
          {new: true}
        ).then(
          console.log("Great update!!"));
      })
      .then(() => {
        return Recipe.deleteOne(
          { title: "Carrot Cake" }
          ).then(
          console.log("Great remove!!")
        );
      })
      .then(() => {
        mongoose.connection.close().then(console.log("Great closing!!"));
      })
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
  });
