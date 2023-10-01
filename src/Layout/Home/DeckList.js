import React, { useState, useEffect } from "react";
import DeckSummary from "./DeckSummary";

function DeckList({currentData, setUpdateServer }) {

  console.log(`Current Data value at DeckList.js is : ${currentData}`);
  let deckList;
  if (currentData) {
    deckList = currentData.map((deck) => {
      return (
        <DeckSummary
          key={deck.id}
          deck={deck}
          setUpdateServer={setUpdateServer}
        />
      );
    });
  }

  console.log(`deckList at DeckList.js is : ${deckList}`);


  return (<>{currentData === undefined ? <div><h2>Loading...</h2></div> : <div>{deckList}</div>}</>);
}

export default DeckList;
