import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CreateDeck from "./CreateDeck";

function HomeLayout({currentData,setUpdateServer}) {

  return (
    <>
        <Switch>
        <Route exact path="/">
          <Home currentData={currentData} setUpdateServer={setUpdateServer}/>
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck setUpdateServer={setUpdateServer} />
        </Route>
      </Switch>
    </>
  );
}

export default HomeLayout;
