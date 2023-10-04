import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Card from "./Card";
import { readDeck } from "../../utils/api";

function CardList({ deck, updateServer, setUpdateServer }) {
  const params = useParams();

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
