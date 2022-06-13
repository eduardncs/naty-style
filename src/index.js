import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import MainLoader from './components/MainLoader';
import App from './App';

ReactDOM.render(
    <Suspense fallback={<MainLoader />}>
      <App />
    </Suspense>,
    document.getElementById("root")
  );