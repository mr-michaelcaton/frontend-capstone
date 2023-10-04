import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import NotFound from "../NotFound";
import CardForm from "./CardForm";

function CardLayout({setUpdateServer}) {
  const { path } = useRouteMatch();
  
  return (
    <>
      <Switch>
        <Route exact path={`${path}/new`}>
          <CardForm type="create"setUpdateServer={setUpdateServer}/>
        </Route>
        <Route exact path={`${path}/:cardId/edit`}>
          <CardForm type="edit"setUpdateServer={setUpdateServer}/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default CardLayout;
