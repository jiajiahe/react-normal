import React, { Component } from 'react';
import successImg from '../../../assets/i-success.png';
import { Table } from 'antd';
import './index.less';

const _role={
    1:'供体医生',
    2:'审核医生',
    3:'质控医生',
    4:'管理员'
}

const _dept={
    1:'胸外科',
    2:'质控科',
    3:'信息科'
}

const _position={
    1:'住院医师',
    2:'主任医师',
    3:'质控医师',
    4:'管理员',
    5:'主治医师',
    6:'副主任医师'
}

const _jobTitle={
    1:'初级',
    2:'中级',
    3:'质控医师',
    4:'副高级',
    5:'正高级'
}

export default class App extends Component{
    render(){
        const { newAccounts } = this.props.admin;

        return(
            <div>
                {/* 头部成功提示 */}
                <div className='createSuccess-header cl'>
                    <img    src={successImg} 
                            width='24' 
                            height='24' 
                            className='createSuccess-img'
                            alt='' />
                    <div className='createSuccess-tip'>
                        <h6>创建成功！</h6>
                        <p>账号数量：{newAccounts.length}</p>
                    </div>
                </div>
                {/* 表格 */}
                <Table  className='admin-listTable'
                        pagination={false}
                        dataSource={newAccounts}
                        columns={[
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
                                dataIndex:'dept',
                                key:'dept',
                                render:(text,record)=>{
                                    return _dept[text]
                                }
                            },
                            {
                                title:'职务',
                                dataIndex:'position',
                                key:'position',
                                render:(text,record)=>{
                                    return _position[text]
                                }
                            },
                            {
                                title:'职称',
                                dataIndex:'jobTitle',
                                key:'jobTitle',
                                render:(text,record)=>{
                                    return _jobTitle[text]
                                }
                            },
                            {
                                title:'角色',
                                dataIndex:'roleId',
                                key:'roleId',
                                render:(text,record)=>{
                                    return _role[text]
                                }
                            },
                            {
                                title:'初始密码',
                                dataIndex:'password',
                                key:'password'
                            }
                        ]
                    }>
                </Table>
            </div>
        )
    }
}