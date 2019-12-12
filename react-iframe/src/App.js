import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const bindEvent = (element, eventName, eventHandler) => {
  if (element.addEventListener) {
    element.addEventListener (eventName, eventHandler, false);
  }
};

const App = () => {
  const [messageApp, setMessageApp] = useState ('');
  const [messageVue, setMessageVue] = useState ('');

  useEffect (() => {
    bindEvent (window, 'message', e => {
      const {type, value} = JSON.parse (e.data);
      switch (type) {
        case 'app':
          setMessageApp (value);
          sendMessage (
            JSON.stringify ({
              type: 'fromReact',
              dest: '',
              value: 'message was changed in react',
            })
          );
          break;
        case 'fromVue':
          setMessageVue (value);
          break;
      }
    });
  });
  var sendMessage = function (msg) {
    window.parent.postMessage (msg, '*');
  };
  const onClickButton = () => {
    sendMessage (
      JSON.stringify ({
        type: 'fromReact',
        dest: 'vue',
        value: Math.random (),
      })
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Message send by App : {messageApp}
        </p>
        {messageVue !== '' ? <p>message send by Vue : {messageVue}</p> : null}
        <button onClick={onClickButton}>send info other </button>

      </header>
    </div>
  );
};

export default App;
