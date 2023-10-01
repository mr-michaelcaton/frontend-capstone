import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function CreateDeck({setUpdateServer}) {
  const history = useHistory();
  const homeIcon = <FontAwesomeIcon icon={faHouse}/>


  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  console.log("In Create Deck, set update server is: ",setUpdateServer);

  const changeHandler = (e) => {
    console.log(e.target.id);
    if (e.target.id === "name") {
      setDeckName(e.target.value);
    } else if (e.target.id === "description") {
      setDeckDescription(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    await createDeck({ name: deckName, description: deckDescription });
    setUpdateServer(true);
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{homeIcon} Home</Link>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
          >
            <Link to={`/decks/`}>New Deck</Link>
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form>
        <div className="form-group">
          <div className="row py-2 mx-0">
            <label htmlFor="deckName" className="mx-0">
              Name
            </label>
            <input
              type="text"
              htmlFor="deckName"
              id="name"
              className="mx-0 w-100"
              placeholder="Deck Name"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="row py-2 mx-0">
            <label htmlFor="deckDescription" className="row mx-0">
              Description
            </label>
            <textarea
              rows="5"
              htmlFor="deckDescription"
              id="desctiption"
              className="row mx-0 w-100"
              placeholder="Brief description of the deck"
              onChange={changeHandler}
            ></textarea>
          </div>
          <div>
            <Link type="button" to="/" className="btn btn-secondary">
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
    </div>
  );
}

export default CreateDeck;
