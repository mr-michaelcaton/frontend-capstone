import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import AddCards from "./AddCard";
import EditCard from "./EditCard";
import NotFound from "../NotFound";

function CardLayout({updateServer,setUpdateServer}) {
  const { path } = useRouteMatch();

  console.log(`At deck index page, setUpdateServer is: `, setUpdateServer)

  
  return (
    <>
      <Switch>
        <Route exact path={`${path}/new`}>
          <AddCards setUpdateServer={setUpdateServer}/>
        </Route>
        <Route exact path={`${path}/:cardId/edit`}>
          <EditCard setUpdateServer={setUpdateServer}/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default CardLayout;
