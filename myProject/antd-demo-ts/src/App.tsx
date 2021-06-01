import React, {
  Component
} from 'react';
import * as mqtt from "mqtt"
import { Button, Card, Row, Col, Comment, Tooltip, List, Input } from 'antd';
import moment from "moment"
import "./index.css"
const { TextArea } = Input;
function MsgRender(props) {
  const { msgList, msgList_bef } = props
  if (msgList && msgList.length > 0) {
    return (
      <div>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={msgList}
          renderItem={item => (
            <li>
              <Comment
                // actions={item.actions}
                author={item.sendAccount}
                // avatar={item.avatar}
                content={item.content + " " + (item._id.indexOf("before") > -1 ? "发送中" : "已发送")}
                datetime={item.sendTime}
              />
            </li>
          )}
        />
        <MsgRender msgList={msgList_bef}></MsgRender>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msgList_bef: [],
      msgList: [],
      content: "",
      connect: null,
      sendAccount: "rts"
    }
  }
  componentDidMount = () => {
    this.initMsg()
    this.watchMsg()
  }
  async initMsg() {
    return await this.$axios.post("http://live.frp.soulfree.cn/msg/getMsgs").then(res => {
      if (res.code === 200) {
        this.setState({
          msgList: res.data
        })
      }
    })
  }
  watchMsg() {
    // "ws://192.168.0.106:8083/mqtt"
    if (this.state.connect) {
      return false
    }
    const _this = this
    const connect = mqtt.connect("ws://frp.soulfree.cn:7083/mqtt", {
      username: "chartHome",
      password: "bm08sLRDIbPHI5JGz7"
    })

    connect.on("connect", function () {
      connect.subscribe('sendmsg', {
        qos: 2,
      }, function (err, granted) {
        if (!err) {
          console.log('sendmsg 订阅成功')
        } else {
          console.error(err);
        }
      })
      connect.on('message', function (topic, message) {
        _this.updateMsg(message.toString(), "append")
      })
      _this.setState({
        connect: connect
      })
    })
  }
  updateMsg(msg, type) {
    console.log(JSON.parse(JSON.stringify(msg)))
    console.log(JSON.parse(JSON.stringify(this.state.msgList)));
    msg = typeof msg === "string" ? JSON.parse(msg) : msg;
    let msgList = this.state.msgList || []
    const { sendAccount } = this.state
    let addFlag = false
    for (const item of msgList) {
      if (!addFlag && msg._id && msg._id === item._id) {
        addFlag = true
        break
      }
    }
    // 仅更新 其他人发送的消息
    if (!addFlag && type === "append" && msg._id != "60b45a82590e7b4a21d91c16") {
      msgList.push(msg)
    }
    this.setState({
      msgList: msgList
    })
  }
  onChange = ({ target: { value } }) => {
    this.setState({ content: value });
  };
  usendMsg = () => {
    var { content, msgList, sendAccount, msgList_bef } = this.state
    const id = ("before" + (new Date()).getTime()).toString()
    let msgData = {
      "_id": id,
      "content": content,
      "msgType": "2",
      "sendAccount": sendAccount,
      "sendTime": moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    }
    console.log(JSON.stringify(msgData))
    try {
      if (content) {
        this.setState({ content: "" })
        // 更新本人消息 状态为before
        msgList_bef.push(msgData)
        this.setState({ msgList_bef: msgList_bef })
        var sendMsg = JSON.parse(JSON.stringify(msgData))
        delete sendMsg._id
        this.$axios.post("http://live.frp.soulfree.cn/msg/sendMsg", sendMsg).then(res => {
          if (res.code == 200) {
            for (const index in msgList_bef) {
              let item = msgList_bef[index]
              if (id == item._id) {
                msgList_bef.splice(index, 1)
              }
            }
            this.setState({ msgList_bef: msgList_bef })
            msgData._id = res.data.param._id
            this.updateMsg(msgData, "append")
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  }
  imgRender = (item) => {
    console.log(item)
    if (item.type.indexOf("image") > -1) {
      console.info(item);
      var blob = item.getAsFile(),
        reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;
        console.log(img);
        document.getElementById('testInput').appendChild(img);
      };
      reader.readAsDataURL(blob);

    } else if (item.kind === "string") {
      item.getAsString((str) => {
        // str 是获取到的字符串
        console.info(str);
        this.setState({
          content: str
        })
      })
    }
  }
  onPaste = (e) => {

    console.log(e);
    var clipboardData = e.clipboardData,//谷歌
      i = 0,
      items, item, types;
    console.log('0')

    if (clipboardData) {
      console.log('1')
      items = clipboardData.items;
      console.log(items)
      if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
          this.imgRender(items[i]);
        }
      }
    }
  }
  render() {
    const { msgList, content, msgList_bef } = this.state
    return (
      <div className="App" onPaste={this.onPaste}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={20} xl={12}>
            <Card className="card-u">
              <div>
                <MsgRender msgList={msgList} msgList_bef={msgList_bef} />
              </div>
              <div>
                <TextArea rows={4} value={content} autoSize={{ minRows: 2 }} onChange={this.onChange} />
                <Button onClick={this.usendMsg} disabled={!content}>发送</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <div class="box" contenteditable="true" id="testInput">
        </div>
      </div>
    )
  }
}


export default (Chart);
