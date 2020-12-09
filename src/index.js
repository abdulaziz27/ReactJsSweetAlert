import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Hello from './Hello';
// import Home from './Home'; 
import Axios from './LatihanCRUD2/Home'; 
import Home from './LatihanCRUD2/Home';
// import BelajarUseState from './useState';
// import UseCallBack from './useCallback';
// import BelajarUseMemo from './useMemo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
