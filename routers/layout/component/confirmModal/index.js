import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';

export default class App extends Component{
    render(){
        return (
            <div>
                <h6 className='exit-account-title'><i className='exit-account-icon'></i>{this.props.content}</h6>
                <div className='exit-modal-footer'>
                    <Button key='submit'
                            type='primary'
                            className='admin-btn-primary' 
                            loading={this.props.loading || false}
                            onClick={this.props.onOk}>确定</Button>
                    <Button key='back'
                            className='admin-btn-normal'
                            onClick={this.props.onCancel}>取消</Button>
                </div>
            </div>
        )
    }
}