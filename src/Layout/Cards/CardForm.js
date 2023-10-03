import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function CardForm({ type, setUpdateServer }) {
  const history = useHistory();
  const location = useLocation();

  const homeIcon = <FontAwesomeIcon icon={faHouse} />;

  let pageTitle = "";
  if (type === "edit") {
    pageTitle = "Edit Card";
  } else if (type === "create") {
    pageTitle = "Add Card";
  }

  console.log(location);

  const { deckId, cardId } = useParams();
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const abortController = new AbortController();
    if(cardId){
    readCard(cardId, abortController.signal)
      .then((response) => {
        setCardFront(response.front);
        setCardBack(response.back);
      })
      .catch((error) => setError(error));
    }
    return () => abortController.abort();
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((response) => setDeck(response))
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId]);

  const changeHandler = (e) => {
    if (e.target.name === "cardFront") {
      setCardFront(e.target.value);
    } else if (e.target.name === "cardBack") {
      setCardBack(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    if (type === "edit") {
      e.preventDefault();
      await updateCard({
        id: cardId,
        deckId: Number(deckId),
        front: cardFront,
        back: cardBack,
      });
      setUpdateServer(true);
      history.push(`/decks/${deckId}`);
    } 
    
    else if (type === "create") {
      await createCard(deckId, { front: cardFront, back: cardBack });
      setUpdateServer(true);
      history.push(`/decks/${deckId}/cards/new`);
    }
  };

  const cancelHandler = () => history.push(`/decks/${deckId}`);

  if (error) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{homeIcon} Home</Link>
          </li>
          {deck && type === "edit" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={location}>Edit Card {cardId}</Link>
              </li>
            </>
          ) : (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/decks/${deckId}/cards/new`}>New Card</Link>
              </li>
            </>
          )}
        </ol>
      </nav>
      <h2>{pageTitle}</h2>
      <form>
        <div className="form-group">
          <div className="row py-2 mx-0">
            <label name="cardFront" className="mx-0">
              Front
            </label>
            <textarea
              type="text"
              rows="3"
              name="cardFront"
              id="cardFront"
              className="mx-0 w-100"
              value={cardFront}
              onChange={changeHandler}
            ></textarea>
          </div>
          <div className="row py-2 mx-0">
            <label name="cardBack" className="row mx-0">
              Back
            </label>
            <textarea
              rows="3"
              name="cardBack"
              id="cardBack"
              className="row mx-0 w-100"
              value={cardBack}
              onChange={changeHandler}
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary mx-2"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
