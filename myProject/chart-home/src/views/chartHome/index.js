import React, {
    Component
} from 'react';
import * as mqtt from "mqtt"
import { Button, Card, Row, Col, Comment, Tooltip, List, Input, Modal, Image } from 'antd';
import moment from "moment"
import BetterScroll from 'better-scroll'
import BScroll from '@better-scroll/core'

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
                        <div>
                            <Comment
                                // actions={item.actions}
                                author={item.sendAccount}
                                // avatar={item.avatar}
                                content={<MsgContent item={item}></MsgContent>}

                                datetime={item.sendTime}
                            />
                        </div>
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
function MsgContent(props) {
    const { msgType, content, _id } = props.item
    if (msgType == "3") {
        return (<div>
            <Image src={content} />
        </div>)
    } else {
        return (<div>
            {content + " " + (_id.indexOf("before") > -1 ? "发送中" : "已发送")}
        </div>)
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
            sendAccount: "rts",
            visible: false,
            modalImgUrl: null,
            modalBlob: null
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

                const scroll = new BScroll(document.querySelector('.card-u'), {
                    scrollX: false,  //开启横向滚动
                    scrollY: true, //关闭竖向滚动
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
    usendMsg = (type) => {
        var { content, msgList, sendAccount, msgList_bef, modalImgUrl } = this.state
        const id = ("before" + (new Date()).getTime()).toString()

        let msgData = {
            "_id": id,
            "content": null,
            "msgType": "2",
            "sendAccount": sendAccount,
            "sendTime": moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }
        if (type == "image") {
            msgData.content = modalImgUrl
            msgData.msgType = "3"
        } else {
            msgData.content = content
        }
        console.log(JSON.stringify(msgData))
        try {
            if (msgData.content) {
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
        const _this = this
        if (item.type.indexOf("image") > -1) {
            console.info(item);
            var blob = item.getAsFile()
            console.log(blob);
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.setState({
                    modalBlob: blob,
                    modalImgUrl: e.target.result,
                    visible: true
                })
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
    handleOk = () => {
        this.usendMsg("image")
        this.setState({
            visible: false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { msgList, content, msgList_bef, visible, modalImgUrl } = this.state
        return (
            <div className="App" onPaste={this.onPaste}>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={20} xl={12}>
                        <Card>
                            <div className="card-u">
                                <MsgRender msgList={msgList} msgList_bef={msgList_bef} />
                            </div>
                        </Card>
                        <div>
                            <TextArea rows={4} value={content} autoSize={{ minRows: 2 }} onChange={this.onChange} />
                            <Button onClick={this.usendMsg} disabled={!content}>发送</Button>
                        </div>
                    </Col>
                </Row>
                <Modal title="发送图片" okText="确认" cancelText="取消" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Image src={modalImgUrl} />
                </Modal>
            </div>
        )
    }
}


export default (Chart);
