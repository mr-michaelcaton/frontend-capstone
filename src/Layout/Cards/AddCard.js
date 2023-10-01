import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function AddCard({setUpdateServer}) {
  const history = useHistory();
  const location = useLocation();

  console.log(setUpdateServer);
  const homeIcon = <FontAwesomeIcon icon={faHouse}/>

  const params = useParams();
  const { deckId } = params;

  const [deck, setDeck] = useState(null);
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
    return () => abortController.abort();
  }, [deckId]);

  const changeHandler = (e) => {
    console.log(e.target.id);
    if (e.target.id === "front") {
      setCardFront(e.target.value);
    } else if (e.target.id === "back") {
      setCardBack(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await createCard(deckId, { deckId: deckId, front: cardFront, back: cardBack });
    setUpdateServer(true);
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
    {!deck? (<h2>Loading...</h2>):(
      <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{homeIcon} Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={location}>Add Card</Link>
          </li>
        </ol>
      </nav>
      <h2>{deck ? deck.name : "Loading..."}: Add Card</h2>
      <form>
        <div className="form-group">
          <div className="row py-2 mx-0">
            <label htmlFor="front" className="mx-0">
              Front
            </label>
            <textarea
              rows="3"
              htmlFor="front"
              id="front"
              className="mx-0 w-100"
              placeholder="Front side of card"
              onChange={changeHandler}
            ></textarea>
          </div>
          <div className="row py-2 mx-0">
            <label htmlFor="back" className="row mx-0">
              Back
            </label>
            <textarea
              rows="3"
              htmlFor="back"
              id="back"
              className="row mx-0 w-100"
              placeholder="Back side of card"
              onChange={changeHandler}
            ></textarea>
          </div>
          <div>
            <Link type="button" to={`/decks/${deckId}`} className="btn btn-secondary">
              Done
            </Link>
            <button
              type="submit"
              className="btn btn-primary mx-2"
              onClick={submitHandler}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
    )}
    
    </>
  );
}

export default AddCard;
