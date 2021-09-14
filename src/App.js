import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatDetails from "./views/ChatDetails";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat-details">
          <ChatDetails />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
