import React, { Component } from 'react';
import { Form, Row, Col, Button, Input, Select, message } from 'antd';
import './index.less';
const FormItem = Form.Item;
const Option = Select.Option;

const _positionOptions={
    1:[
        {
            name:'住院医师',
            value:'1'
        },
        {
            name:'主任医师',
            value:'2'
        },
        {
            name:'主治医师',
            value:'5'
        },
        {
            name:'副主任医师',
            value:'6'
        }
    ],
    2:[
        {
            name:'质控医师',
            value:'3'
        }
    ],
    3:[
        {
            name:'管理员',
            value:'4'
        }
    ]
}

const _roleOptions={
    1:[
        {
            name:'供体医生',
            value:'1'
        },
        {
            name:'审核医生',
            value:'2'
        }
    ],
    2:[
        {
            name:'质控医生',
            value:'3'
        }
    ],
    3:[
        {
            name:'管理员',
            value:'4'
        }
    ]
}

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            positionOptions:[],
            roleOptions:[]
        }
    }

    componentDidMount(){
        const userInfo = this.props.layout.curUser;
        this.setState({
            positionOptions:_positionOptions[userInfo.departMent],
            roleOptions:_roleOptions[userInfo.departMent]
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.layout.curUser.jobNum === nextProps.layout.curUser.jobNum) return;
        const userInfo = nextProps.layout.curUser;
        this.setState({
            positionOptions:_positionOptions[userInfo.departMent],
            roleOptions:_roleOptions[userInfo.departMent]
        })
    }

    // 保存
    handleSubmit=(e)=>{
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                this.props.dispatch({
                    type:'LAYOUT_EDIT_UERINFO',
                    data:values,
                    callback:(res)=>{
                        this.setState({
                            loading:false
                        })
                        if(res.code===200){
                            this.props.onSuccess();
                            message.success(res.message);
                        }else{
                            message.error(res.message);
                        }
                    }
                })
            }
        });
    }

    // 选择科室
    deptChange=(value)=>{
        this.setState({
            positionOptions:_positionOptions[value],
            roleOptions:_roleOptions[value]
        })
        this.props.form.setFieldsValue({
            position:undefined,
            roleId:undefined
        });
    }

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { loading, positionOptions, roleOptions } = this.state;
        const userInfo = this.props.layout.curUser;
        getFieldDecorator('name',{initialValue:userInfo.name});
        getFieldDecorator('jobNum',{initialValue:userInfo.jobNum});
        getFieldDecorator('mobile',{initialValue:userInfo.mobile});
        getFieldDecorator('dept',{initialValue:userInfo.departMent});
        getFieldDecorator('position',{initialValue:userInfo.position+''});
        getFieldDecorator('jobTitle',{initialValue:userInfo.jobTitle});
        getFieldDecorator('roleId',{initialValue:userInfo.roleList.length>0?userInfo.roleList[0].roleId+'':''});

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='姓名:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            <span>{getFieldValue('name')}</span>
                        </FormItem>
                    </Col>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='工号:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            <span>{getFieldValue('jobNum')}</span>
                        </FormItem>
                    </Col>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='手机号:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`mobile`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '11位数字',
                                    pattern:/^\d{11}$/
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='科室:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`dept`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                                <Select placeholder='选择科室'
                                        onChange={this.deptChange}>
                                    <Option value='1'>胸外科</Option>
                                    <Option value='2'>质控科</Option>
                                    <Option value='3'>信息科</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='职务:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`position`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                                <Select placeholder='职务'>
                                    {
                                        positionOptions.map((position)=>{
                                            return <Option key={`position${position.value}`} value={position.value+''}>{position.name}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='职称:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`jobTitle`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: false,
                                    whitespace: true,
                                    message: ' ',
                                }],
                            })(
                                <Select placeholder='职称'>
                                    <Option value='1'>初级</Option>
                                    <Option value='2'>中级</Option>
                                    <Option value='3'>副高级</Option>
                                    <Option value='4'>正高级</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} className='editAccount-col-item'>
                        <FormItem   required={false}
                                    label='角色:'
                                    labelCol={{span:6}}
                                    wrapperCol={{span:18}}>
                            {getFieldDecorator(`roleId`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                                <Select placeholder='角色'>
                                    {
                                        roleOptions.map((role)=>{
                                            return <Option key={`position${role.value}`} value={role.value+''}>{role.name}</Option>
                                        })
                                    }
                                </Select>
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