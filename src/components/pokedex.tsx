import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition } from "hooks";
import { usePokemonWeaknesses } from "hooks/use-pokemon-weaknesses";
import type { Pokemon } from "models";

import { useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";

import "../assets/css/pokedex.css";
import addIcon from "../assets/icons/add.svg";
import removeIcon from "../assets/icons/remove.svg";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);

  const { weaknesses, isLoading: weaknessesLoading } = usePokemonWeaknesses(selectedPokemon?.name || "");

  const [team, setTeam] = useState<Pokemon[]>([]); // State for the team

  const addToTeam = (pokemon: Pokemon | undefined) => {
    if (pokemon && team.length < 6 && !team.some((p) => p.name === pokemon.name)) {
      setTeam([...team, pokemon]);
    } else {
      alert("Alto vaquero! Haz llegado al maximo de integrantes para tu equipo.")
    }
  };

  const removeFromTeam = (pokemonToRemove: Pokemon) => {
    setTeam(team.filter((pokemon) => pokemon.name !== pokemonToRemove.name));
  };

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <div className="screen main-screen">
          {selectedPokemon && (
            <>
              <img
                className={c(
                  "sprite",
                  "obfuscated",
                  ready && "ready",
                  ready && `ready--${randomMode()}`
                )}
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
              <button className="add-to-team" onClick={() => selectedPokemon && addToTeam(selectedPokemon)}>
                <img src={addIcon} alt="Add" />
              </button>
            </>
          )}
        </div>
        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
        <div className="pokemon-info">
          <h4>Type</h4>
          <div className="types">
            {selectedPokemon?.types?.map((type) => (
              <span key={type.type.name} className={`chip ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
          <h4>Weaknesses</h4>
          <div className="weaknesses">
            {weaknessesLoading ? (
              <span>Loading weaknesses...</span>
            ) : (
              weaknesses?.map((weakness) => (
                <span key={weakness} className={`chip ${weakness}`}>
                  {weakness}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>

      <div className="pokedex-team">
        <h3>Your team ({team.length}/6)</h3>
        <ul>
          {team.map((pokemon) => (
            <li key={pokemon.name}>
              <div className="team-pokemon">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <span>{pokemon.name}</span>
                <button onClick={() => removeFromTeam(pokemon)}>
                  <img src={removeIcon} alt="Remove" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
