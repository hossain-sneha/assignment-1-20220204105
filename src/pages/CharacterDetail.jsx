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

  if (!character) return <p>Loading...</p>;

  <p>
  <strong>Status:</strong> {character.status} <br />
  <strong>Species:</strong> {character.species} <br />
  <strong>Origin:</strong> {character.origin?.name} <br />
  <strong>Location:</strong> {character.location?.name} <br />
  <strong>Episode Count:</strong> {character.episode?.length}
</p>


  return (
    <div className="container my-4">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} className="img-fluid" />
      <p>
        <strong>Status:</strong> {character.status} <br />
        <strong>Species:</strong> {character.species} <br />
      </p>
    </div>
  );
}
