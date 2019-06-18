import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Table, Divider} from 'antd';
import './index.less';
import PackJson from '../../../../../package.json';

class ExportForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys:[],
            current:1,
            pageSize:10
        }
    }

    onChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    onOk = () =>{
        const {selectedRowKeys} = this.state;
        let formIds = selectedRowKeys.toString();
        if(selectedRowKeys.length > 1){
            window.open(PackJson.proxy + axios.baseIp + "/exportBatchPdf?formIds="+formIds,'_self');
        }else if(selectedRowKeys.length === 1){
            window.open(PackJson.proxy + axios.baseIp + '/exportSinglePdf?formIds='+formIds,'_self');
        }
        this.onCancel();
    }

    onCancel = () =>{
        this.setState({selectedRowKeys:[]})
        this.props.onClose();
    }

    onPageChange = (current,pageSize) =>{
        this.setState({
            current,pageSize
        });
        this.props.getList(this.props.tabIndex,{pageNum:current,pageSize:pageSize});
    }
    onShowSizeChange = (current,pageSize) =>{
        this.setState({
            current,pageSize
        })
        this.props.getList(this.props.tabIndex,{pageNum:current,pageSize:pageSize});
    }

    render() {
        const {visible,data,total} = this.props;
        const {current,pageSize,selectedRowKeys} = this.state;
        const columns = [{
            title: '提交时间',
            dataIndex: 'submit_time',
            render: (text) => {
                return (
                    <span>{this.props.timestampToTime(text)}</span>
                )
            },
        }, {
            title: '提交医生',
            dataIndex: 'submit_person',
        }, {
            title: '表单名',
            dataIndex: 'content_title'
        }, {
            title: '受体信息',
            dataIndex: 'recipientName',
            render: (text, row, index) => {
                return (
                    <span>{row.content_json.recipientName || ''}</span>
                )
            }
        }, {
            title: '供体信息',
            dataIndex: 'donnerInfo',
            render: (text, row) => {
                return (
                    <div>
                        <span>{row.content_json.name || ""}</span>
                        <Divider type="vertical" className="line"/>
                        <span>{row.content_json.sex === '0'?"男":row.content_json.sex === "1"?"女":""}</span>
                        <Divider type="vertical" className="line"/>
                        <span>{row.content_json.age? row.content_json.age + '岁':""}</span>
                    </div>
                )
            }
        }];
        const pagination = {
            current:current,
            pageSize:pageSize,
            total:total || 0 ,
            showQuickJumper:true,
            showSizeChanger:true,
            showTotal:(total)=>(`共 ${total || 0 } 条`),
            onChange:this.onPageChange,
            onShowSizeChange:this.onShowSizeChange
        }
        const rowSelection = {
            selectedRowKeys:selectedRowKeys,
            onChange:this.onChange
        };

        return (
            <Modal className="modal-box"
                   title="批量导出"
                   visible={visible}
                   width={800}
                   onCancel={this.onCancel}
                   footer={
                       [
                           <Button key="submit" type="primary" onClick={this.onOk}>
                               批量导出
                           </Button>,
                           <Button key="back" onClick={this.onCancel}>取消</Button>,
                       ]}>
                <Table className="table"
                       rowKey="id"
                       columns={columns}
                       pagination={pagination}
                       dataSource={data}
                       rowSelection={rowSelection}/>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        qualityDoc: state.qualityDoc
    }
}

export default connect(mapStateToProps)(ExportForm);
