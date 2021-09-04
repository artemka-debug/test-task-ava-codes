import React           from 'react';
import ReactDOM        from 'react-dom';
import 'index.css';
import App             from 'components/App/App';
import Modal           from 'react-modal';
import {ROOT_SELECTOR} from "./constants";
import {faTimes}       from '@fortawesome/free-solid-svg-icons'
import {library}       from "@fortawesome/fontawesome-svg-core";

library.add(faTimes)

Modal.setAppElement(`#${ROOT_SELECTOR}`)

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById(ROOT_SELECTOR)
);
