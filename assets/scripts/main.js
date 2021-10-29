// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/recipe1.json',
  'assets/recipes/recipe2.json',
  'assets/recipes/recipe3.json',
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.
    
    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
    Promise.all(recipes.map(recipeLink => fetch(recipeLink)))
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      data.forEach((v, i) => {
        recipeData[i] = v;
      });
    }).then(() => {
      if(Object.keys(recipeData).length == recipes.length) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  Object.entries(recipeData).slice(0, 3).forEach(([k, v]) => {
    let currentRec = document.createElement('recipe-card', `recipe-card-${k}`);
    currentRec.data = v;
    document.querySelector('main').appendChild(currentRec);
  })
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    if(button.innerText == "Show more") {
      button.innerText = "Show less"
      Object.entries(recipeData).slice(3, 6).forEach(([k, v]) => {
        let currentRec = document.createElement('recipe-card', `recipe-card-${k}`);
        currentRec.data = v;
        document.querySelector('main').appendChild(currentRec);
      })
    } else if(button.innerText == "Show less") {
      button.innerText = "Show more";
      let main = document.querySelector('main');
      main.removeChild(main.lastChild);
      main.removeChild(main.lastChild);
      main.removeChild(main.lastChild);
    }    
  });
}