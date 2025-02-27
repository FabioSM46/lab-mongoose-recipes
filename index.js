const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const oneRecipe = {
      title: "chocolate cookies",
      level: "Easy Peasy",
      ingredients: [""],
      cuisine: "american",
      dishType: "breakfast",
      image: "",
      duration: 1,
      creator: "chef Fabio",
    };

    return Recipe.create(oneRecipe);
  })
  .then((recipe) => {
    console.log(recipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((array) => {
    array.forEach((element) => {
      console.log(element.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Rigatoni duration updated!");
    return
  })
  .then(()=>{
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => {
    console.log("Carrot Cake sold out!");
    return
  })
  .then(()=>{
    mongoose.connection.close()
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
