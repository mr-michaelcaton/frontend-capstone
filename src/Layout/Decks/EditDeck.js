import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/";

function EditDeck() {
  const history = useHistory();
  const location = useLocation();

  console.log(location);
  
  const { deckId } = useParams();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [_error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((response) => {
        setDeckName(response.name);
        setDeckDescription(response.description);
        console.log(response);
        console.log(
          "Deck Id: ",
          deckId,
          "Deck Name: ",
          deckName,
          "Deck Description: ",
          deckDescription
        );
      })
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId,deckName,deckDescription]);

  const changeHandler = (e) => {
    console.log(e.target.id);
    if (e.target.name === "deckName") {
      setDeckName(e.target.value);
    } else if (e.target.name === "deckDescription") {
      setDeckDescription(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    await updateDeck({ id: deckId, name: deckName, description: deckDescription });
    history.push(`/decks/${deckId}`);
  };

  const cancelHandler = () => history.push(`/decks/${deckId}`);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={location}>Edit Deck</Link>
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
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

export default EditDeck;
