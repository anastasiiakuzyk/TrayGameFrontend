import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Main from "./components/Main";

import "./index.css";
import { QueryClientProvider, QueryClient } from 'react-query';
import {Stats} from "./components/Stats";

const App = (): ReactElement => <Main/>;


ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
              <Switch>
                  <Route path={"/stats"}>
                    <Stats />
                  </Route>
                  <Route path={"/"}>
                    <App />
                  </Route>
              </Switch>
        </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
