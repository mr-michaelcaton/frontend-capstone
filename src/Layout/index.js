import React, {useState, useEffect} from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import { listDecks } from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";
import HomeLayout from "./Home/";
import DeckLayout from './Decks'

function Layout() {

  const [updateServer, setUpdateServer] = useState(true);
  const [currentData, setCurrentData] = useState(undefined);
  const [error, setError] = useState(undefined);
  
  useEffect(() => {
    const abortController = new AbortController();
    if(updateServer){
    listDecks(abortController.signal)
    .then(response => { 
      console.log(`Initial Data Call Response is : ${response}`);
      setCurrentData(response);
      setUpdateServer(false);
    })
    .catch(error => setError(error));
  }
    return () => abortController.abort();
  },[updateServer]);

  console.log("Update Server @ Top Level: ",updateServer);


  if (error) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomeLayout currentData={currentData} setUpdateServer={setUpdateServer}/>
          </Route>
          <Route path='/decks'>
            <DeckLayout currentData={currentData} updateServer={updateServer} setUpdateServer={setUpdateServer}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
