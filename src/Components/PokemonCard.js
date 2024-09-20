import React, { useState, useEffect } from "react";
import axios from "axios";
import "../PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  return (
    <div className="pokemon-card">
      {details ? (
        <>
          <img src={details.sprites.front_default} alt={pokemon.name} />
          <h3>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonCard;
