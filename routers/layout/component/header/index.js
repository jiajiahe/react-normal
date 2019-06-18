import React, {Component} from 'react';
import userIcon from '../../../assets/i-user-titlebar.png';
import EditPassword from '../editPassword';
import AccountInfo from '../accountInfo';
import ConfirmModal from '../confirmModal';
import { Modal, Menu, Dropdown } from 'antd';
import './index.less';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            editPasswordVisible:false,
            accountInfoVisible:false,
            exitAccountVisible:false
        }
    }

    componentWillMount(){
        let userInfo = JSON.parse(sessionStorage.getItem('lungUserInfo'));
        if(!userInfo){
            this.props.history.replace('/lungTransplantation/login');
            return;
        }
        
        this.props.dispatch({
            type:'LAYOUT_SET_UERINFO',
            data:userInfo
        })
    }

    // 账号相关
    getMenu=()=>{
        return (
            <Menu>
                <Menu.Item className='account-info-item'>
                    <a onClick={this.showMode.bind(this,'accountInfo')}>账号信息</a>
                </Menu.Item>
                <Menu.Item className='account-info-item'>
                    <a onClick={this.showMode.bind(this,'editPassword')}>修改密码</a>
                </Menu.Item>
                <Menu.Item className='account-info-item'>
                    <a onClick={this.showMode.bind(this,'exitAccount')}>退出</a>
                </Menu.Item>
            </Menu>
        )
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
            [`${type}Visible`]:false
        },()=>{
            setTimeout(()=>{
                if(!this._editPassword) return;
                const { resetFields } = this._editPassword.props.form;
                resetFields();  
            },300)
        })
    }

    // 退出
    exitAccount=()=>{
        sessionStorage.removeItem('lungUserInfo');
        this.props.history.push('/lungTransplantation/login');
    }

    render() {
        const { editPasswordVisible, accountInfoVisible, exitAccountVisible } = this.state;
        const { userInfo } = this.props.layout;

        return (
            <div id="header" className='header-box'>
                {/* 背景图 */}
                <div className='bg'></div>
                {/* 左侧logo && title */}
                <h1 className='layout-logo'>肺移植专科工作站</h1>
                {/* 右侧用户名 */}
                <Dropdown overlay={this.getMenu()}>
                <div className='layout-username'>
                    {/* 头像 */}
                    <img src={userIcon} alt='头像'/>
                    <span>{userInfo.name}</span>
                </div>
                </Dropdown>
                {/* 账号信息 */}
                <Modal  title='账号信息'
                        className='modal-box account-info-modal'
                        visible={accountInfoVisible}
                        onCancel={this.hideMode.bind(this,'accountInfo')}
                        footer={[]}>
                    <AccountInfo onCancel={this.hideMode.bind(this,'accountInfo')} {...this.props}/>
                </Modal>
                {/* 修改密码 */}
                <Modal  title='修改密码'
                        className='modal-box edit-password-modal'
                        visible={editPasswordVisible}
                        onCancel={this.hideMode.bind(this,'editPassword')}
                        footer={[]}>
                    <EditPassword   onCancel={this.hideMode.bind(this,'editPassword')} 
                                    {...this.props}
                                    wrappedComponentRef={(form) => this._editPassword = form}/>
                </Modal>
                {/* 退出账号 */}
                <Modal  title=''
                        className='modal-box exit-account-modal'
                        visible={exitAccountVisible}
                        onCancel={this.hideMode.bind(this,'exitAccount')}
                        footer={[]}>
                    <ConfirmModal   onCancel={this.hideMode.bind(this,'exitAccount')}
                                    onOk={this.exitAccount}
                                    content='确定要退出该账号吗？'/>
                </Modal>
            </div>
        )
    }
}
