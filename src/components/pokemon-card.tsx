import type { Pokemon } from "models";

import "../assets/css/pokemon-card.css";

type Props = {
  pokemon: Pokemon;
  onClick: () => void;
};

export function PokemonCard({ pokemon, onClick }: Props) {
  return (
    <article className="pokemon-card" role="listitem" onClick={onClick}>
      <>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <p>{pokemon.name}</p>
      </>
    </article>
  );
}
