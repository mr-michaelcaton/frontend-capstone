import React, { useState} from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import Deck from "./Deck";
import CreateDeck from "../Home/CreateDeck";
import EditDeck from "./EditDeck";
import StudyDeckLayout from "./StudyDeckLayout";
import CardLayout from "../Cards";

function DeckLayout({updateServer, currentData,setUpdateServer}) {
  const { path } = useRouteMatch();

  console.log(`At deck index page, setUpdateServer is: `, setUpdateServer)

  return (
    <>
        <Switch>
          <Route exact path={`${path}/new`}>
            <CreateDeck setUpdateServer={setUpdateServer}/>
          </Route>
          <Route exact path={`${path}/:deckId`}>
            <Deck currentData={currentData} updateServer={updateServer} setUpdateServer={setUpdateServer}/>
          </Route>
          <Route exact path={`${path}/:deckId/edit`}>
            <EditDeck setUpdateServer={setUpdateServer}/>
          </Route>
          <Route exact path={`${path}/:deckId/study`}>
            <StudyDeckLayout />
          </Route>
          <Route path="/decks/:deckId/cards">
            <CardLayout updateServer={updateServer}setUpdateServer={setUpdateServer}/>
          </Route>
        </Switch>
    </>
  );
}

export default DeckLayout;
