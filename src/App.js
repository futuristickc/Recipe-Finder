import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipes';

const App = () => {

  const App_ID = "70d9248f";
  const App_Key= "aacf063e6007d07ae828fb5558837f10";

  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${App_ID}&app_key=${App_Key}`;

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log('Effect has been run');
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  return (
    <div className='App'>
      <form className='search-form'>
        <input className="search-bar" type='text'/>
        <button className='search-button' type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}/>
      ))}
    </div>
  );
}

export default App;
