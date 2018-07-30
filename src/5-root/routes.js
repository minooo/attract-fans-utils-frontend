import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ARoutes from "../1-pages/0-home/routes";

const allRoutes = [].concat(ARoutes);

export default (
  <HashRouter>
    <Switch>
      {allRoutes.map(item => <Route key={item.path} exact {...item} />)}
    </Switch>
  </HashRouter>
);
