import React from "react";
import {Link, useHistory} from 'react-router-dom'
import {deleteDeck} from '../../utils/api'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookBookmark, faEye,faTrashCan} from '@fortawesome/free-solid-svg-icons'


function DeckSummary({deck, setUpdateServer}) {

  const history = useHistory();
  const bookIcon = <FontAwesomeIcon icon={faBookBookmark} style={{color: "#ffffff",}} />
  const eyeIcon = <FontAwesomeIcon icon={faEye} style={{color: "#ffffff",}} />
  const trashIcon = <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />


  const deleteHandler = async (id) => {
    const result = window.confirm('Delete this deck?')
    if (result){ 
      await deleteDeck(Number(id));
      setUpdateServer(true);
      history.push('/');
    }
  };

  return (
    <>
      <div className="py-2">
        <div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5 className="card-title col-10">{deck.name}</h5>
                  <div className="col text-right">
                    {deck.cards.length} cards
                  </div>
              </div>
              <div className="row px-3">
                <h6 className="card-subtitle mb-2 text-muted">{deck.description}</h6>
              </div>
              <div className="row">
                <div className="col-10">
              <Link type="button" to={`/decks/${deck.id}`} className="btn btn-secondary">{eyeIcon} View</Link>
              <Link type="button" to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">{bookIcon} Study</Link>
              </div>
              <div className="col-2 text-right">
              <Link type="button" to="/" onClick={() => deleteHandler(deck.id)} className="btn btn-danger">{trashIcon}</Link>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default DeckSummary;
