import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Button } from 'antd';

const mqtt = require("mqtt")

const list = []
function App(data) {
  if (data) {
    list.push(data)
  }
  const listItems = list.map((number) =>
        <Button>{number}</Button>
      );
  const element = (
    <div className="App">
      <div>
        {listItems}
      </div>
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'))
};



const connect = mqtt.connect("ws://192.168.0.106:8083/mqtt", {
  username:"chartHome",
  password:"bm08sLRDIbPHI5JGz7"
})
connect.on("connect", function () {
  connect.subscribe('sendmsg', {
    qos:2
  }, function(err,granted){
      if(!err){
          console.log('sendmsg 订阅成功')
      }
  })
  

  connect.on('message', function (topic, message) {
    // message is Buffer
    App(message.toString())
  })
})
App()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
