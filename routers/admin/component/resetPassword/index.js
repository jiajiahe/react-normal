import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';

export default class App extends Component{
    render(){
        return (
            <div>
                <h6 className='reset-success-title'><i className='reset-success-icon'></i>重置密码成功！</h6>
                <p className='reset-success-content'>账号密码已重置为默认密码，</p>
                {/* <p className='reset-success-content'>并发送至注册手机号</p> */}
                <div className='resetPassword-form-footer'>
                    <Button key='submit'
                            type='primary'
                            className='admin-btn-primary' 
                            loading={false}
                            onClick={this.props.onCancel}>确定</Button>
                    <Button key='back'
                            className='admin-btn-normal'
                            onClick={this.props.onCancel}>取消</Button>
                </div>
            </div>
        )
    }
}