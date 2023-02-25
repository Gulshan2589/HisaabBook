import React from 'react';
import ReactDOM from 'react-dom/client';//importing react dom
import './index.css';
import App from './App';
import { Provider } from './Context/Context';
import { SpeechProvider } from "@speechly/react-client";

//creating root variable and getting root element of index.html 
const root = ReactDOM.createRoot(document.getElementById('root'));
//rendering the root to our App component
root.render(
    <Provider>
    <SpeechProvider appId="3c4caa52-929e-4a80-94f2-8740ec8bdb32">
        <App />
    </SpeechProvider>
    </Provider>,
);
