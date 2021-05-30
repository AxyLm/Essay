import './App.css';
import { Button } from 'antd';
const mqtt = require("mqtt")
function App(data) {
  console.log(data,typeof data)
  const msg =  data && typeof data == "string"?JSON.parse(data):{}
  return (
    <div className="App">
      <Button>{JSON.stringify(data)}</Button>
      <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
    </div>
  );
}

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
export default App;
