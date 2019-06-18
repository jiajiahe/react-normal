import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import './index.less';

const _departMent={
    1:'胸外科',
    2:'质控科',
    3:'信息科'
}

export default class App extends Component{

    // 编辑
    onEdit=(user)=>{
        this.props.dispatch({
            type:'LAYOUT_SET_CURUSER',
            data:user
        })
        this.props.showEdit();
    }

    // 重置密码
    resetPassword=(user)=>{
        this.props.dispatch({
            type:'LAYOUT_SET_CURUSER',
            data:user
        })
        this.props.resetPassword();
    }

    // 停用
    stopUseFun=(user)=>{
        this.props.dispatch({
            type:'LAYOUT_SET_CURUSER',
            data:user
        })
        this.props.stopUse();
    }

    // 启用
    inUseFun=(user)=>{
        this.props.dispatch({
            type:'LAYOUT_SET_CURUSER',
            data:user
        })
        this.props.inUse();
    }

    // 删除
    deleteFun=(user)=>{
        this.props.dispatch({
            type:'LAYOUT_SET_CURUSER',
            data:user
        })
        this.props.delete();
    }

    render(){
        return(
            <Table  className='admin-listTable'
                    rowKey='userId'
                    loading={this.props.loading}
                    pagination={
                        {
                            pageSize:10,
                            showSizeChanger:true,
                            showQuickJumper:true,
                            showTotal:(total)=>(`共 ${total} 条`)
                        }
                    }
                    dataSource={ this.props.dataSource }
                    columns={
                        [
                            {
                                title:'姓名',
                                dataIndex:'name',
                                key:'name'
                            },
                            {
                                title:'工号',
                                dataIndex:'jobNum',
                                key:'jobNum'
                            },
                            {
                                title:'手机号',
                                dataIndex:'mobile',
                                key:'mobile'
                            },
                            {
                                title:'科室',
                                dataIndex:'departMent',
                                key:'departMent',
                                filtered:true,
                                filterIcon:<Icon type='down' className='filter-icon'/>,
                                filters: [{
                                            text: '胸外科',
                                            value: '1',
                                        }, {
                                            text: '质控科',
                                            value: '2',
                                        }, {
                                            text: '信息科',
                                            value: '3',
                                        }],
                                onFilter: (text, record) => +record.departMent===+text,
                                render:(text,record)=>{
                                    return _departMent[text];
                                }
                            },
                            {
                                title:'角色',
                                dataIndex:'roleList',
                                key:'roleList',
                                render:(text,record)=>{
                                    return record.roleList.length>0 ? record.roleList[0].roleName:''
                                }
                            },
                            {
                                title:'状态',
                                dataIndex:'status',
                                key:'status',
                                render:(text,record)=>{
                                    return +text===0 ? 
                                                <span className='green-font'>使用中</span>:
                                                <span className='red-font'>已停止</span>
                                }
                            },
                            {
                                title:'操作',
                                dataIndex:'operate',
                                key:'operate',
                                width:'300px',
                                render:(text,record)=>{
                                    return (
                                        <div>
                                            <a onClick={this.onEdit.bind(this,record)}>编辑</a>
                                            <span className='split'>|</span>
                                            <a onClick={this.resetPassword.bind(this,record)}>重置密码</a>
                                            { +record.status===0 && <span className='split'>|</span> }
                                            { +record.status===0 && <a onClick={this.stopUseFun.bind(this,record)}>停用</a> }
                                            { +record.status===1 && <span className='split'>|</span> }
                                            { +record.status===1 && <a className='green-font' onClick={this.inUseFun.bind(this,record)}>启用</a> }
                                            { +record.status===1 && <span className='split'>|</span> }
                                            { +record.status===1 && <a className='red-font' onClick={this.deleteFun.bind(this,record)}>删除</a> }
                                        </div>
                                    )
                                }
                            }
                        ]
                    }
            >
            </Table>
        )
    }
}