import React from "react";
import { Link, useLocation, useRouteMatch, useParams } from "react-router-dom";
import {readDeck} from '../utils/api'

function BreadcrumbNavigator() {
  const params =useParams();
  const location = useLocation();
  const routeOutput = useRouteMatch();


  console.log(`Params: `, params);
  console.log('Location: ',location);
  console.log('Route Output ',routeOutput);

  let currentLink = "";

  const crumbArray = location.pathname.split('/')
  .filter((crumb) => {return crumb !== ''})

  const crumbs = crumbArray.map((crumb,index) => {
    currentLink += `/${crumb}`

    if(index !== crumbArray.length-1){
    return (
      <li key={index} className='breadcrumb-item'>
        <Link  to={currentLink}>{crumb}</Link>
      </li>
    )}
    else {
      return (
        <li key={index} className='breadcrumb-item active' aria-current='page'>
          <Link to={currentLink}>{crumb}</Link>
        </li>
      )
    }
  })


  return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to='/'>Home</Link>
          </li>
          {crumbs}
        </ol>
      </nav>
  );
}

export default BreadcrumbNavigator;
