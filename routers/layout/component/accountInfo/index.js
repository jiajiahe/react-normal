import React, { Component } from 'react';
import { Modal } from 'antd';
import iconImage from '../../../assets/icon.png';
import EditAccount from '../editAccount';
import EditMobile from '../editMobile';
import './index.less';

const _departMent={
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

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            editAccountVisible:false,
            editMobileVisible:false
        }
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
                if(!this._editMobileform) return;
                const { resetFields } = this._editMobileform.props.form;
                resetFields();  
            },300)
        })
    }

    // 编辑资料
    editAccount=()=>{
        this.showMode('editAccount');
        this.props.onCancel();
    }

    // 编辑手机号
    editMobile=()=>{
        this.showMode('editMobile');
        // this.props.onCancel();
    }

    render(){
        const { editAccountVisible, editMobileVisible } = this.state;
        const { userInfo } = this.props.layout;

        return (
            <div>
                <div className='cl'>
                    <img    src={iconImage} 
                            className='accountInfo-img'
                            alt='' />
                    <div className='accountInfo-main'>
                        <p className='username'>{userInfo.name}</p>
                        <p className='hospital'>{_departMent[userInfo.departMent]} | {userInfo.jobNum} | {_position[userInfo.position]}</p>
                        <p className='tel'>{userInfo.mobile}<a onClick={this.editMobile}>编辑</a></p>
                    </div>
                </div>
                {/* <div className='accountInfo-modal-footer'>
                    <Button key='submit'
                            type='primary'
                            className='admin-btn-primary' 
                            loading={false}
                            onClick={this.editAccount}>编辑资料</Button>
                </div> */}
                {/* 编辑账号 */}
                <Modal  title='编辑账号'
                        className='modal-box edit-account-modal'
                        visible={editAccountVisible}
                        onCancel={this.hideMode.bind(this,'editAccount')}
                        footer={[]}>
                    <EditAccount onClose={this.hideMode.bind(this,'editAccount')} {...this.props}/>
                </Modal>
                {/* 编辑手机号 */}
                <Modal  title='编辑手机号'
                        className='modal-box edit-mobile-modal'
                        visible={editMobileVisible}
                        onCancel={this.hideMode.bind(this,'editMobile')}
                        footer={[]}>
                    <EditMobile onClose={this.hideMode.bind(this,'editMobile')} {...this.props}
                                wrappedComponentRef={(form) => this._editMobileform = form}/>
                </Modal>
            </div>
        )
    }
}