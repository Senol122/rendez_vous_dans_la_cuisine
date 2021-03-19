import React, { Fragment, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Search from '../layout/Search';
import axios from 'axios';
import Recipe from '../layout/Recipe';

const Home = () => {
  const [ recipe, setRecipe ] = useState({});
  const [ wine, setWine ] = useState({});
  const [ alert, setAlert] = useState('');
  

  const searchRecipe = async recipeInput => {
    // Get data from API
    const resRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${recipeInput}&number=1`);

    const resWine = await axios.get(`https://api.spoonacular.com/food/wine/pairing?apiKey=${process.env.REACT_APP_API_KEY}&food=${recipeInput}`);

    // Set state for recipe
    let aux = {
      title: '',
      image: ''
    };
    if(resRecipe.data.totalResults > 0){
      aux.title = resRecipe.data.results[0].title;
      aux.image = resRecipe.data.results[0].image;
    }
    setRecipe(aux);

    // Set state for wine pairing
    let aux2 = {
      title: '',
      description: '',
      image: '',
      pairingText: ''
    };

    if(resWine.data.status !== 'failure'){
      if(resWine.data.productMatches[0]){
        aux2.title = resWine.data.productMatches[0].title;
        aux2.description = resWine.data.productMatches[0].description;
        aux2.image = resWine.data.productMatches[0].imageUrl;
      } else {
        aux2.pairingText = resWine.data.pairingText;
      }
    } else {
      setAlert(`Couldn't find ${recipeInput} in the recipe list.`);
    }
    setWine(aux2);
  }


  return (
    <Fragment>
      <Container className="mt-4 mb-4">
        <h1>Rendez-vous dans la cuisine</h1>
        <p>
          Search the recipe you want, and we will pair the best wine.
          <i className="fas fa-wine-bottle"></i>
        </p>
        <Search searchRecipe={searchRecipe} alert={alert} />
        <Recipe recipe={recipe} wine={wine} />
      </Container>
    </Fragment>
  )
}

export default Home