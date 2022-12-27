import './App.css';
import { useEffect, useState } from 'react';
import PokemonThumbnail from './components/PokemonThumbnail';


function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10');


  // it is supposed to show 10 pokemons byt there are 10 duplicated pokemons on the first page
  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    //get more pokemons
    setLoadMore(data.next);

    function createPokemonObject (results) {
      results.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setAllPokemons( currentList => [...currentList, data]);
        // await allPokemons.sort((a, b) => a.id - b.id);
        // allPokemons.push(data);
      });
    }
    createPokemonObject(data.results);
    await console.log(data);
    // await console.log(allPokemons);
  }

useEffect(() => {
  getAllPokemons();
  
}, []);



  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">

          {allPokemons.map( (pokemon, index) =>
            <PokemonThumbnail 
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
            />
          )}

        </div>
        <button className="load-more" onClick={() => getAllPokemons()} >Load more</button>
      </div>
    </div>
  );
}

export default App;
