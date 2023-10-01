import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function NotEnoughCards({ deck }) {

  const plusSign = <FontAwesomeIcon icon={faPlus} style={{color: "ffffff",}}/>

  const { cards } = deck;
  const [cardLength, setCardLength] = useState(cards ? cards.length : null);

  useEffect(() => {
    if (cards) {
      setCardLength(cards.length);
    }
  }, [cards]);

  return (
    <>
      <div>
        <h3>Not enough cards.</h3>
      </div>
      <div>
        <p>
          You need at least 3 cards to study. There are{" "}
          {!cardLength ? <>Loading...</> : <>{`${deck.cards.length} `}</>}cards
          in this deck.
        </p>
        <Link
          type="button"
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary"
        >
          {plusSign} Add Cards
        </Link>
      </div>
    </>
  );
}

export default NotEnoughCards;
