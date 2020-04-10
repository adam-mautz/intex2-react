import React from 'react';
import './App.css';
import * as bs from 'react-bootstrap'
import Header from './header.js'
import Home from './homepane.js'
import Search from './search.js'
import Details from './details.js'
import Login from './loginPage.js'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Landing from './realHome.js'


function App() {

  return (
   <Router>
     <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column">
      <bs.Row noGutters className="flex-grow-0 flex-shrink-0 shadow" >
        <bs.Col className="px-0 py-0 ">
        <Header />
        </bs.Col>
      </bs.Row>
      <bs.Row noGutters className="flex-grow-1">
        <bs.Col md="12" className="w-100 mh-100 shadow flex-grow-1 p-1 bg-muted" style={{Width:"100%"}}>
            <Switch>

              <Route path="/search" component={Search} />
              <Route path="/details" component={Details} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Landing} />

            </Switch>
          </bs.Col>
      </bs.Row>
     </bs.Container>
   </Router>
  );
}

export default App;
