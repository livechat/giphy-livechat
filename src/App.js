import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatDetails from "./views/ChatDetails";
import Settings from "./views/Settings";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat-details">
          <ChatDetails />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
