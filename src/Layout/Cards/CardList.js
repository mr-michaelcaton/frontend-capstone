import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Card from "./Card";
import { readDeck } from "../../utils/api";

function CardList({ updateServer, setUpdateServer }) {
  const params = useParams();
  const deckId = params.deckId;

  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((response) => {
        console.log(response);
        setDeck(response);
      })
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId, updateServer]);

  if (error) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      {!deck ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {deck.cards &&
            deck.cards.map((card) => (
              <Card
                key={`${deck.id}.${card.id}`}
                card={card}
                setUpdateServer={setUpdateServer}
              />
            ))}
        </>
      )}
    </>
  );
}

export default CardList;
