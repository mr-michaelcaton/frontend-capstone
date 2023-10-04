import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function DeckForm({ type, setUpdateServer }) {
  const history = useHistory();
  const location = useLocation();

  const homeIcon = <FontAwesomeIcon icon={faHouse} />;

  let pageTitle = "";
  if(type === "edit"){
    pageTitle = "Edit Deck";
  }
  else if(type === "create"){
    pageTitle = "Create Deck";
  }

  console.log(location);

  const { deckId } = useParams();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    if(type === "edit"){
    readDeck(deckId, abortController.signal)
    .then((response) => {
      setDeckName(response.name);
      setDeckDescription(response.description);
    })
    .catch((error) => setError(error));
  }

    return () => abortController.abort();
  }, [deckId, type,setDeckName,setDeckDescription]);

  const changeHandler = (e) => {
    if (e.target.name === "deckName") {
      setDeckName(e.target.value);
    } else if (e.target.name === "deckDescription") {
      setDeckDescription(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (type === "edit") {
      await updateDeck({
        id: deckId,
        name: deckName,
        description: deckDescription,
      });
      setUpdateServer(true);
      history.push(`/decks/${deckId}`);
    } else if (type === "create") {
      await createDeck({ name: deckName, description: deckDescription });
      setUpdateServer(true);
      history.push("/");
    }
  };

  const cancelHandler = () => {
    if (type === "edit") {
      history.push(`/decks/${deckId}`);
    } else if (type === "create") {
      history.push("/");
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
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{homeIcon} Home</Link>
          </li>
          {type === "edit" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deckName}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={location}>Edit Deck</Link>
              </li>
            </>
          ) : (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/decks/`}>New Deck</Link>
              </li>
            </>
          )}
        </ol>
      </nav>
      <h2>{pageTitle}</h2>
      <form>
        <div className="form-group">
          <div className="row py-2 mx-0">
            <label name="deckName" className="mx-0">
              Name
            </label>
            <input
              type="text"
              name="deckName"
              id="name"
              className="mx-0 w-100"
              value={deckName}
              onChange={changeHandler}
            ></input>
          </div>
          <div className="row py-2 mx-0">
            <label name="deckDescription" className="row mx-0">
              Description
            </label>
            <textarea
              rows="5"
              name="deckDescription"
              id="desctiption"
              className="row mx-0 w-100"
              value={deckDescription}
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

export default DeckForm;
