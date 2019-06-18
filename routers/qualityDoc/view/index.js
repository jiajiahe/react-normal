import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Tabs,Spin,Button } from 'antd';
import Tables from '../component/table/index';
import ExportBulkForm from '../component/exportBulkForm/index'
import './index.less'
const TabPane = Tabs.TabPane;

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            tabIndex:'1',
            visible:false,
        }
    }
    componentDidMount(){
        this.getList('1',{pageNum:1,pageSize:10});
    }
    getList = (tabIndex,data) =>{
        if(tabIndex === '1'){//待审核
            this.props.dispatch({
                type:"QUALITYDOC_LIST_SET",
                data:{...data}
            })
        }else if(tabIndex === '2'){//已通过
            this.getOtherList('0',data);
        }else{//退回
            this.getOtherList('1',data);
        }
    }
    // 通过或退回列表
    getOtherList = (operateFlag,data) =>{
        this.props.dispatch({
            type:"QUALITYDOC_OTHER_LIST_SET",
            data:{operateFlag:operateFlag,...data}
        })
    }
    onTabsChange = (tabIndex) =>{
        this.setState({tabIndex});
        this.getList(tabIndex,{pageNum:1,pageSize:10});
    }
    onModalClick = (visible) =>{
        this.setState({visible})
    }
    //日期字符串转换成时间戳
    add =(m)=>{
        return m<10?'0'+m:m
    }
    timestampToTime = (timestamp,format)=>{
        let time = new Date(timestamp);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        // let s = time.getSeconds();
        if(format === 'y-m-d'){
            return y+'-'+this.add(m)+'-'+this.add(d)
        }else{
            return y+'-'+this.add(m)+'-'+this.add(d)+' '+this.add(h)+':'+this.add(mm);
        }
    }
    render(){
        const {list,otherList,load,numObj} = this.props.qualityDoc;
        const {tabIndex,visible} = this.state;
        return (
            <div id="qualityDoc">
                <Spin spinning={load}>
                    <Tabs onChange={this.onTabsChange} value={tabIndex}>
                        <TabPane tab={<span>待审核&nbsp;&nbsp;{numObj.auditedFormList}</span>} key="1">
                            <Tables tabIndex="1"
                                    load={load}
                                    dataSource={list}
                                    total={numObj.auditedFormList}
                                    getList={this.getList}
                                    timestampToTime={this.timestampToTime}/>
                        </TabPane>
                        <TabPane tab={<span>已通过&nbsp;&nbsp;{numObj.passedFormList}</span>} key="2">
                            <Tables tabIndex="2"
                                    load={load}
                                    dataSource={otherList}
                                    total={numObj.passedFormList}
                                    getList={this.getList}
                                    timestampToTime={this.timestampToTime}/>
                        </TabPane>
                        <TabPane tab={<span>已退回&nbsp;&nbsp;{numObj.returnedFormList}</span>} key="3">
                            <Tables tabIndex="3"
                                    load={load}
                                    dataSource={otherList}
                                    total={numObj.returnedFormList}
                                    getList={this.getList}
                                    timestampToTime={this.timestampToTime}/>
                        </TabPane>
                    </Tabs>
                    {
                        tabIndex === '2'?
                            <Button type="primary" className="export-btn"
                                    onClick={()=>this.onModalClick(true)}>批量导出</Button>
                            :null
                    }
                </Spin>
                <ExportBulkForm visible={visible}
                                 data={otherList}
                                total={numObj.passedFormList}
                                load={load}
                                onClose={()=>this.onModalClick(false)}
                                timestampToTime={this.timestampToTime}>
                </ExportBulkForm>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        qualityDoc:state.qualityDoc
    }
}
export default connect(mapStateToProps)(App);
