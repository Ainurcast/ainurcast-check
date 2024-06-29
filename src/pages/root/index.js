import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "../../components/productStyles/index.scss";
import Routing from "./routes";
import history from '../../utils/history';
import configureStore from './store';
import { Provider } from "react-redux";
import * as serviceWorker   from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore(history)}>
      <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
