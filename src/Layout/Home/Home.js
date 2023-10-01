import React from 'react'
import { Link } from 'react-router-dom'
import DeckList from './DeckList'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function Home({currentData, setUpdateServer}) {

  
  const plusSign = <FontAwesomeIcon icon={faPlus} style={{color: "ffffff",}}/>
  return (
    <>
    <div className="row">
      <div className="col-5">
        <Link type="button" to="/decks/new" className="btn btn-secondary">{plusSign} Create Deck</Link>
      </div>
    </div>
    <div>
      <DeckList currentData={currentData} setUpdateServer={setUpdateServer} />
    </div>
    </>
  )
}

export default Home
