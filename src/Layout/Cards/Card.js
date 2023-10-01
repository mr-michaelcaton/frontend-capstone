import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan,faPencil} from '@fortawesome/free-solid-svg-icons'

function Card({ card, setUpdateServer }) {
  const history = useHistory();
  const trashIcon = <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />
  const editIcon = <FontAwesomeIcon icon={faPencil} style={{color: "#ffffff",}} />

  const deleteHandler = async (id) => {
    const result = window.confirm('Delete this card?\n\nYou will not be able to recover it.')
    if (result){ 
      await deleteCard(id);
      setUpdateServer(true);
      history.push(`/decks/${card.deckId}`);
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-6 card-text">{card.front}</div>
          <div className="col-6 card-text">{card.back}</div>
        </div>
        <br/>
        <div className="row">
          <div className="col text-right">
            <Link
              type="button"
              to={`/decks/${card.deckId}/cards/${card.id}/edit`}
              className="btn btn-primary mx-2"
            >
             {editIcon} Edit
            </Link>
            <button
              onClick={() => deleteHandler(card.id)}
              className="btn btn-danger"
            >
              {trashIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
