import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faH } from "@fortawesome/free-solid-svg-icons";

function EditCard({setUpdateServer}) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const homeIcon = <FontAwesomeIcon icon={faHouse}/>
  const { deckId, cardId } = params;

  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [_error, setError] = useState(undefined);

  //Initial useEffect to load the deck - empty dependency array
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((response) => {
        setDeck(response);
      })
      .catch((error) => setError(error));

    readCard(cardId, abortController.signal)
      .then((response) => {
        console.log(response);
        setCurrentCard(response);
      })
      .catch((error) => setError(error));
    return () => abortController.abort();
  }, [deckId,cardId]);

  useEffect(() => {
  if(currentCard){
  setCardFront(currentCard.front);
  setCardBack(currentCard.back);
}
  },[currentCard])

  const changeHandler = (e) => {
    console.log(e.target.id);
    if (e.target.name === "front") {
      setCardFront(e.target.value);
    } else if (e.target.name === "back") {
      setCardBack(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(`Submitted Card Data: ID: ${cardId}, deckId: ${deckId}, front: ${cardFront}, back: ${cardBack}`);
    await updateCard({
      id: cardId,
      deckId: Number(deckId),
      front: cardFront,
      back: cardBack,
    });
    setUpdateServer(true);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div>
      {!currentCard ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">{homeIcon} Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={location}>{`Edit Card ${currentCard.id}`}</Link>
              </li>
            </ol>
          </nav>
          <h2>Edit Card</h2>
          <form>
            <div className="form-group">
              <div className="row py-2 mx-0">
                <label htmlFor="front" className="mx-0">
                  Front
                </label>
                <textarea
                  rows="3"
                  name="front"
                  id="front"
                  className="mx-0 w-100"
                  value={cardFront}
                  onChange={changeHandler}
                ></textarea>
              </div>
              <div className="row py-2 mx-0">
                <label htmlFor="back" className="row mx-0">
                  Back
                </label>
                <textarea
                  rows="3"
                  name="back"
                  id="back"
                  className="row mx-0 w-100"
                  value={cardBack}
                  onChange={changeHandler}
                ></textarea>
              </div>
              <div>
                <Link
                  type="button"
                  to={`/decks/${deckId}`}
                  className="btn btn-secondary"
                >
                  Cancel
                </Link>
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
        </>
      )}
    </div>
  );
}

export default EditCard;
