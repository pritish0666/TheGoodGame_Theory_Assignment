import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PokemonCard from "./Components/PokemonCard";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching Pokémon data
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonData = response.data.results;
        setPokemons(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    };

    fetchPokemons();
  }, []);

  // Filtered Pokémon based on search input
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="pokemon-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
