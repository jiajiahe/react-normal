import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Tabs, Input, Button, Modal, message } from 'antd';
import ListTable from '../component/listTable';
import CreateAccount from '../component/createAccount';
import EditAccount from '../../layout/component/editAccount';
import ResetPassword from '../component/resetPassword';
import ConfirmModal from '../../layout/component/confirmModal';
import './index.less'
const TabPane = Tabs.TabPane;
const Search = Input.Search;
let searchVal='';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            createAccountVisible:false,
            editAccountVisible:false,
            resetPasswordVisible:false,
            resetPasswordSuccessVisible:false,
            inUseVisible:false,
            accountList:[],
            loading:false,
            stopUseVisible:false,
            deleteVisible:false,
            listLoading:false
        }
    }

    componentWillMount(){
        // 获取账号列表
        this.getAccountList(searchVal);
    }

    getAccountList=(value)=>{
        const { userInfo } = this.props.layout;
        this.setState({
            listLoading:true
        })
        this.props.dispatch({
            type:'ADMIN_GET_ACCOUNT_LIST',
            data:{
                nameOrjobNum:value
            },
            callback:(res)=>{
                this.setState({
                    listLoading:false
                })
                if(res.code===200){
                    this.setState({
                        accountList:[...res.object.filter((item)=>(item.jobNum!==userInfo.jobNum))]
                    })
                }else{
                    message.error(res.message);
                }
            }
        })
    }

    onTabsChange=(key)=>{
        console.log(key);
    }

    // 显示弹框
    showMode=(type)=>{
        this.setState({
            [`${type}Visible`]:true
        })
    }

    // 关闭弹框
    hideMode=(type)=>{
        this.setState({
            [`${type}Visible`]:false,
            loading:false
        },()=>{
            setTimeout(()=>{
                if(!!this._editAccountform){
                    const { resetFields } = this._editAccountform.props.form;
                    resetFields();
                }
                if(!!this._createAccountform){
                    const { resetFields } = this._createAccountform.props.form;
                    resetFields();
                }
            },300)
        })
    }

    // 重置密码
    resetPassword=()=>{
        this.showMode('resetPassword');
    }

    // 搜索
    onSearch=(value)=>{
        searchVal=value;
        // 获取账号列表
        this.getAccountList(value);
    }

    // 编辑账号成功
    editAccountSuccess=()=>{
        this.hideMode('editAccount');
        this.getAccountList(searchVal);
    }

    // 重置密码确定按钮
    resetPasswordFun=()=>{
        const { curUser } = this.props.layout;
        this.setState({
            loading:true
        })
        this.props.dispatch({
            type:'ADMIN_RESET_PASSWORD',
            data:{
                jobNum:curUser.jobNum
            },
            callback:(res)=>{
                this.setState({
                    loading:false
                });
                if(res.code!==200){
                    message.error(res.message);
                    return;
                }
                this.hideMode('resetPassword');
                this.showMode('resetPasswordSuccess');
            }
        })
    }

    // 停用账号
    stopUseFun=()=>{
        const { curUser } = this.props.layout;
        this.setState({
            loading:true
        })
        this.props.dispatch({
            type:'ADMIN_CHANGE_ACCOUNT_STATUS',
            data:{
                jobNum:curUser.jobNum
            },
            callback:(res)=>{
                this.setState({
                    loading:false
                });
                if(res.code!==200){
                    message.error(res.message);
                    return;
                }
                message.success(res.message);
                this.hideMode('stopUse');
                this.getAccountList(searchVal);
            }
        })
    }

    // 启用账号
    inUseFun=()=>{
        const { curUser } = this.props.layout;
        this.setState({
            loading:true
        })
        this.props.dispatch({
            type:'ADMIN_CHANGE_ACCOUNT_STATUS',
            data:{
                jobNum:curUser.jobNum
            },
            callback:(res)=>{
                this.setState({
                    loading:false
                });
                if(res.code!==200){
                    message.error(res.message);
                    return;
                }
                message.success(res.message);
                this.hideMode('inUse');
                this.getAccountList(searchVal);
            }
        })
    }

    // 删除账号
    deleteFun=()=>{
        const { curUser } = this.props.layout;
        this.setState({
            loading:true
        })
        this.props.dispatch({
            type:'ADMIN_DELETE_ACCOUNT',
            data:{
                jobNum:curUser.jobNum
            },
            callback:(res)=>{
                this.setState({
                    loading:false
                });
                if(res.code!==200){
                    message.error(res.message);
                    return;
                }
                message.success(res.message);
                this.hideMode('delete');
                this.getAccountList(searchVal);
            }
        })
    }

    render(){
        const   { 
                    createAccountVisible, 
                    editAccountVisible, 
                    resetPasswordVisible, 
                    accountList, 
                    resetPasswordSuccessVisible, 
                    loading,
                    stopUseVisible,
                    inUseVisible,
                    deleteVisible,
                    listLoading
                } = this.state;

        return (
            <div id='admin-box'>
                <Tabs   onChange={this.onTabsChange}>
                    <TabPane tab={<span className='tab'>全部状态</span>} key='1'>
                        <ListTable  showEdit={this.showMode.bind(this,'editAccount')}
                                    resetPassword={this.resetPassword}
                                    stopUse={this.showMode.bind(this,'stopUse')}
                                    inUse={this.showMode.bind(this,'inUse')}
                                    delete={this.showMode.bind(this,'delete')}
                                    dataSource={accountList}
                                    loading={listLoading}
                                    {...this.props}/>
                    </TabPane>
                    <TabPane tab={<span className='tab'>使用中</span>} key='2'>
                        <ListTable  showEdit={this.showMode.bind(this,'editAccount')}
                                    resetPassword={this.resetPassword}
                                    stopUse={this.showMode.bind(this,'stopUse')}
                                    inUse={this.showMode.bind(this,'inUse')}
                                    delete={this.showMode.bind(this,'delete')}
                                    dataSource={accountList.filter((item)=>(item.status===0))}
                                    loading={listLoading}
                                    {...this.props}/>
                    </TabPane>
                    <TabPane tab={<span className='tab'>已停止</span>} key='3'>
                        <ListTable  showEdit={this.showMode.bind(this,'editAccount')}
                                    resetPassword={this.resetPassword}
                                    stopUse={this.showMode.bind(this,'stopUse')}
                                    inUse={this.showMode.bind(this,'inUse')}
                                    delete={this.showMode.bind(this,'delete')}
                                    dataSource={accountList.filter((item)=>(item.status===1))}
                                    loading={listLoading}
                                    {...this.props}/>
                    </TabPane>
                </Tabs>
                {/* 右侧内容 */}
                <div className='admin-header-right'>
                    {/* 搜索框 */}
                    <Search
                        placeholder='姓名或工号'
                        onSearch={this.onSearch}
                        className='search-box'
                    />
                    {/* 创建账号 */}
                    <Button type="primary" 
                            className='admin-btn-primary'
                            onClick={this.showMode.bind(this,'createAccount')}>创建账号</Button>
                    {/* 导入账号 */}
                    {/* <Button className='admin-btn-normal'>导入账号</Button> */}
                </div>
                {/* 创建账号 */}
                <Modal  title='创建账号'
                        className='modal-box create-account-modal'
                        visible={createAccountVisible}
                        onCancel={this.hideMode.bind(this,'createAccount')}
                        footer={[]}>
                    <CreateAccount  onCancel={this.hideMode.bind(this,'createAccount')} 
                                    wrappedComponentRef={(form) => this._createAccountform = form}
                                    getAccountList={this.getAccountList}
                                    {...this.props}/>
                </Modal>
                {/* 编辑账号 */}
                <Modal  title='编辑账号'
                        className='modal-box edit-account-modal'
                        visible={editAccountVisible}
                        onCancel={this.hideMode.bind(this,'editAccount')}
                        footer={[]}>
                    <EditAccount    onSuccess={this.editAccountSuccess}
                                    onCancel={this.hideMode.bind(this,'editAccount')} 
                                    {...this.props}
                                    wrappedComponentRef={(form) => this._editAccountform = form}/>
                </Modal>
                {/* 重置密码确认框 */}
                <Modal  title=''
                        className='modal-box exit-account-modal'
                        visible={resetPasswordVisible}
                        onCancel={this.hideMode.bind(this,'resetPassword')}
                        footer={[]}>
                    <ConfirmModal   onCancel={this.hideMode.bind(this,'resetPassword')}
                                    onOk={this.resetPasswordFun}
                                    loading={loading}
                                    content='确定要重置密码吗？'/>
                </Modal>
                {/* 重置密码 */}
                <Modal  title=''
                        className='modal-box reset-password-modal'
                        visible={resetPasswordSuccessVisible}
                        onCancel={this.hideMode.bind(this,'resetPasswordSuccess')}
                        footer={[]}>
                    <ResetPassword onCancel={this.hideMode.bind(this,'resetPasswordSuccess')}/>
                </Modal>
                {/* 停用账号 */}
                <Modal  title=''
                        className='modal-box exit-account-modal'
                        visible={stopUseVisible}
                        onCancel={this.hideMode.bind(this,'stopUse')}
                        footer={[]}>
                    <ConfirmModal   onCancel={this.hideMode.bind(this,'stopUse')}
                                    onOk={this.stopUseFun}
                                    loading={loading}
                                    content='确定要停用该账号吗？'/>
                </Modal>
                {/* 启用账号 */}
                <Modal  title=''
                        className='modal-box exit-account-modal'
                        visible={inUseVisible}
                        onCancel={this.hideMode.bind(this,'inUse')}
                        footer={[]}>
                    <ConfirmModal   onCancel={this.hideMode.bind(this,'inUse')}
                                    onOk={this.inUseFun}
                                    loading={loading}
                                    content='确定要启用该账号吗？'/>
                </Modal>
                {/* 删除账号 */}
                <Modal  title=''
                        className='modal-box exit-account-modal'
                        visible={deleteVisible}
                        onCancel={this.hideMode.bind(this,'delete')}
                        footer={[]}>
                    <ConfirmModal   onCancel={this.hideMode.bind(this,'delete')}
                                    onOk={this.deleteFun}
                                    loading={loading}
                                    content='确定要删除该账号吗？'/>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        layout: state.layout,
        admin:state.admin
    }
}

export default connect(mapStateToProps)(App)