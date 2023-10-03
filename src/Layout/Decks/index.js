import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import Deck from "./Deck";
import StudyDeckLayout from "./StudyDeckLayout";
import CardLayout from "../Cards";
import DeckForm from "./DeckForm";

function DeckLayout({updateServer, currentData,setUpdateServer}) {
  const { path } = useRouteMatch();

  console.log(`At deck index page, setUpdateServer is: `, setUpdateServer)

  return (
    <>
        <Switch>
          <Route exact path={`${path}/new`}>
            <DeckForm type={"create"}setUpdateServer={setUpdateServer}/>
          </Route>
          <Route exact path={`${path}/:deckId`}>
            <Deck currentData={currentData} updateServer={updateServer} setUpdateServer={setUpdateServer}/>
          </Route>
          <Route exact path={`${path}/:deckId/edit`}>
            <DeckForm type={"edit"} setUpdateServer={setUpdateServer}/>
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
