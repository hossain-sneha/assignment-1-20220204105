import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then(setCharacter);
  }, [id]);

  if (!character) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto my-6 p-4 border rounded shadow flex gap-6 items-center">
      <img
        src={character.image}
        alt={character.name}
        className="w-48 h-auto rounded"
      />
      <div>
        <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
        <p>
          <strong>Status:</strong> {character.status} <br />
          <strong>Species:</strong> {character.species} <br />
          <strong>Gender:</strong> {character.gender} <br />
          <strong>Origin:</strong> {character.origin.name} <br />
          <strong>Location:</strong> {character.location.name}
        </p>
      </div>
    </div>
  );
}