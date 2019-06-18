import React, { Component } from 'react';
import { Form, Row, Col, Button, Input, message } from 'antd';
import './index.less';
const FormItem = Form.Item;

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
    }

    // 保存
    handleSubmit=(e)=>{
        e.preventDefault();
        const { userInfo } = this.props.layout;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.confirmpwd!==values.confirmpwdAgain){
                    message.error('新密码两次输入不一致');
                    return;
                }
                if(values.oldpwd===values.confirmpwd){
                    message.error('新密码和旧密码一致');
                    return;
                }

                this.setState({
                    loading:true
                })
                this.props.dispatch({
                    type:'LAYOUT_EDIT_PASSWORD',
                    data:{
                        oldpwd:values.oldpwd,
                        confirmpwd:values.confirmpwd,
                        loginName:userInfo.jobNum
                    },
                    callback:(res)=>{
                        this.setState({
                            loading:false
                        })
                        if(res.code===200){
                            message.success(res.message);
                            this.props.onCancel();
                        }else{
                            message.error(res.message);
                        }
                    }
                })
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={24} className='editPassword-col-item'>
                        <FormItem   required={false}
                                    label='旧密码:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`oldpwd`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '请输入4~6位密码，由字母或数字组成',
                                    pattern:/^[a-zA-Z0-9]{4,6}$/
                                }],
                            })(
                                <Input placeholder='请输入4~6位密码，由字母或数字组成' autoComplete='off'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className='editPassword-col-item'>
                        <FormItem   required={false}
                                    label='新密码:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`confirmpwd`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '请输入4~6位密码，由字母或数字组成',
                                    pattern:/^[a-zA-Z0-9]{4,6}$/
                                }],
                            })(
                                <Input placeholder='请输入4~6位密码，由字母或数字组成' autoComplete='off' />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className='editPassword-col-item'>
                        <FormItem   required={false}
                                    label='确认新密码:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`confirmpwdAgain`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '请输入4~6位密码，由字母或数字组成',
                                    pattern:/^[a-zA-Z0-9]{4,6}$/
                                }],
                            })(
                                <Input placeholder='请输入4~6位密码，由字母或数字组成' autoComplete='off' />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem className='editAccount-form-footer'>
                            <Button key='submit'
                                    type='primary'
                                    className='admin-btn-primary' 
                                    loading={loading}
                                    htmlType='submit'>保存</Button>
                            <Button key='back'
                                    className='admin-btn-normal'
                                    onClick={this.props.onCancel}>取消</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(App);