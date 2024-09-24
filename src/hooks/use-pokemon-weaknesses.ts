import { useEffect, useState } from "react";

import type { PokemonDetail, DamageRelations } from "models";

const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

export function usePokemonWeaknesses(pokemonName: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonWeaknesses = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}${pokemonName}`);
        const pokemonDetail: PokemonDetail = await response.json();
        const weaknessesSet = new Set<string>();

        for (const pokemonType of pokemonDetail.types) {
          const typeResponse = await fetch(pokemonType.type.url);
          const typeData = await typeResponse.json();

          const damageRelations: DamageRelations = typeData.damage_relations;
          damageRelations.double_damage_from.forEach((type) =>
            weaknessesSet.add(type.name)
          );
        }

        setWeaknesses(Array.from(weaknessesSet));
      } catch (error) {
        console.error("Error fetching Pokemon weaknesses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pokemonName) {
      fetchPokemonWeaknesses();
    }
  }, [pokemonName]);

  return { weaknesses, isLoading };
}
