import React, { Component } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import './index.less';
const FormItem = Form.Item;

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
    }

    //保存新手机号
    handleSubmit=(e)=>{
        e.preventDefault();
        const { userInfo } = this.props.layout;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                this.props.dispatch({
                    type:'LAYOUT_EDIT_MOBILE',
                    data:{
                        jobNum:userInfo.jobNum,
                        newMobile:values.mobile
                    },
                    callback:(res)=>{
                        this.setState({
                            loading:false
                        })
                        if(res.code===200){
                            sessionStorage.setItem('lungUserInfo', JSON.stringify({...userInfo,mobile:values.mobile}));
                            this.props.dispatch({
                                type:'LAYOUT_SET_UERINFO',
                                data:{...userInfo,mobile:values.mobile}
                            });
                            this.props.onClose();
                            message.success(res.message);
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
                    <Col span={24}>
                        <FormItem   required={false}
                                    label='新手机:'
                                    labelCol={{span:5}}
                                    wrapperCol={{span:17}}>
                            {getFieldDecorator(`mobile`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: ' ',
                                    pattern:/^\d{11}$/
                                }],
                            })(
                                <Input autoComplete='off'/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={24}>
                        <FormItem   required={false}
                                    label='验证码:'
                                    labelCol={{span:4}}
                                    wrapperCol={{span:10}}>
                            {getFieldDecorator(`mobile`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: ' ',
                                }],
                            })(
                                <Input autoComplete='off'/>
                            )}
                        </FormItem>
                    </Col>
                </Row> */}
                <Row>
                    <Col span={24}>
                        <FormItem className='editMobile-form-footer'>
                            <Button key='submit'
                                    type='primary'
                                    className='admin-btn-primary' 
                                    loading={loading}
                                    htmlType='submit'>确定</Button>
                            <Button key='back'
                                    className='admin-btn-normal'
                                    onClick={this.props.onClose}>取消</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(App);