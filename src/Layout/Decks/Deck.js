import React, { useState, useEffect } from "react";
import {
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardList from "../Cards/CardList";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookBookmark,faTrashCan,faPencil, faPlus, faHouse} from '@fortawesome/free-solid-svg-icons'



function Deck({updateServer, setUpdateServer}) {
  const history = useHistory();
  const params = useParams();
  const deckId = params.deckId;

  const bookIcon = <FontAwesomeIcon icon={faBookBookmark} style={{color: "#ffffff",}} />
  const trashIcon = <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />
  const editIcon = <FontAwesomeIcon icon={faPencil} style={{color: "#ffffff",}} />
  const plusSign = <FontAwesomeIcon icon={faPlus} style={{color: "ffffff",}}/>
  const homeIcon = <FontAwesomeIcon icon={faHouse}/>

  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);

  const { url } = useRouteMatch();
  console.log(url);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((response) => {
        console.log(response);
        setDeck(response);
      })
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId,setDeck]);

  const deleteHandler = async (id) => {
    const result = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (result) {
     await deleteDeck(id);
      setUpdateServer(true);
      history.push(`/decks/${deckId}`);
    }
  };

  if (error) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <div className="py-2">
        {!deck ? (
          <h5>Loading...</h5>
        ) : (
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">{homeIcon} Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
              </ol>
            </nav>
            <div>
              <div>
                <div className="row">
                  <h5 className="col-10">{deck.name}</h5>
                </div>
                <div className="row px-3">
                  <h6 className="mb-2 text-muted">{deck.description}</h6>
                </div>
                <div className="row">
                  <div className="col-10">
                    <Link
                      type="button"
                      to={`/decks/${deck.id}/edit`}
                      className="btn btn-secondary"
                    >
                     {editIcon} Edit
                    </Link>
                    <Link
                      type="button"
                      to={`/decks/${deck.id}/study`}
                      className="btn btn-primary mx-2"
                    >
                     {bookIcon} Study
                    </Link>
                    <Link
                      type="button"
                      to={`/decks/${deck.id}/cards/new`}
                      className="btn btn-primary"
                    >
                     {plusSign} Add Cards
                    </Link>
                  </div>
                  <div className="col-2 text-right">
                    <button
                      to={`/decks/${deckId}`}
                      onClick={() => deleteHandler(deck.id)}
                      className="btn btn-danger"
                    >
                     {trashIcon}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="py-3">
        <h3>Cards</h3>
        <CardList deck={deck}updateServer={updateServer}setUpdateServer={setUpdateServer} />
      </div>
    </>
  );
}

export default Deck;
