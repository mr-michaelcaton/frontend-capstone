import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  useHistory,
} from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyDeck from "./StudyDeck";
import NotEnoughCards from "../Cards/NotEnoughCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";


function StudyDeckLayout() {
  const { deckId } = useParams();
  const homeIcon = <FontAwesomeIcon icon={faHouse} />
  
  const [deck, setDeck] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [error, setError] = useState(undefined);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((response) => {
        setDeck(response);
      })
      .catch((error) => setError(error));
    return () => abortController.abort();
  }, [deckId,setDeck]);

  //click handlers
  const flipHandler = () => {
    setFlipped(!flipped);
  };

  const nextHandler = () => {
    setCurrentCardIndex((currentCardIndex) => currentCardIndex + 1);
    setFlipped(false);
  };

  const lastCardHandler = () => {
    const confirmation = window.confirm(
      "Restart cards?\n\nClick 'cancel' to return to the home page."
    );
    if (confirmation) {
      setCurrentCardIndex(0);
      setFlipped(false);
    } else {
      history.push("/");
    }
  };

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }
  return (
    <>
      {!deck ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">{homeIcon} Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={location}>Study</Link>
              </li>
            </ol>
          </nav>
          <h2>{`Study: ${deck.name}`}</h2>
          <div className="py-2">
            <div>
              <div className="card">
                {deck.cards.length < 3 ? (
                  <NotEnoughCards deck={deck}/>
                ) : (
                  <StudyDeck
                    deck={deck}
                    flipped={flipped}
                    flipHandler={flipHandler}
                    nextHandler={nextHandler}
                    lastCardHandler={lastCardHandler}
                    cardIndex={currentCardIndex}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StudyDeckLayout;
