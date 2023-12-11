import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipes';

const App = () => {

  const App_ID = "70d9248f";
  const App_Key= "aacf063e6007d07ae828fb5558837f10";

  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`;
  
  useEffect(() => {
    console.log('Effect has been run');
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    // console.log("This is event: ", e);
    // console.log("This is event.target: ", e.target);
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault()
    // console.log("This is event from search 9for preventDefault: ", e);
    setQuery(search);
    setSearch("");
  }

  return (
    <div className='App'>
      <form className='search-form' onSubmit={getSearch}>
        <input className="search-bar" type='text' value={search} onChange={updateSearch}/>
        <button className='search-button' type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
        
      ))}
    </div>
  );
}

export default App;
