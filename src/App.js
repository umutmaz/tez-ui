
import { Switch, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import SignupModal from "./components/SignupModal"

import { useState } from "react";
function App() {

  return (
    <>
    <Switch>

      <Route exact path="/" component={()=>(<Dashboard />)}/>
      <Route path="/home" component={()=>(<Home />)}/>
      <Route exact path="/signup" component={()=>(<SignupModal />)}/>
    </Switch>

    </>
  );
}

export default App;
