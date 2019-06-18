import React, { Component } from 'react';
import { Form, Row, Col, Button, Icon, Input, Select, Modal, message } from 'antd';
import CreateSuccess from '../createSuccess';
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
            accountSuccessVisible:false,
            loading:false,
            positionOptions:[],
            roleOptions:[]
        }
    }

    // 关闭弹框
    hideMode=(type)=>{
        this.setState({
            [`${type}Visible`]:false
        })
    }

    // 显示弹框
    showMode=(type)=>{
        this.setState({
            [`${type}Visible`]:true
        })
    }

    // 重置密码
    resetPassword=()=>{
        this.showMode('resetPassword');
    }

    // 添加使用者
    add = () => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);

        form.setFieldsValue({
          keys: nextKeys,
        });
    }

    //删除使用者
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
          return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    // 创建提交
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let name=[],
                    jobNum=[],
                    position=[],
                    jobTitle=[],
                    mobile=[],
                    dept=[],
                    roleIdss=[],
                    formItems=[];
                values.keys.forEach((item)=>{
                    formItems.push({
                        name:values[`name${item}`],
                        jobNum:values[`jobNum${item}`],
                        position:values[`position${item}`],
                        jobTitle:values[`jobTitle${item}`],
                        mobile:values[`mobile${item}`],
                        dept:values[`dept${item}`],
                        roleId:values[`roleIdss${item}`],
                        password:'123qwe'
                    })
                    name.push(values[`name${item}`]);
                    jobNum.push(values[`jobNum${item}`]);
                    position.push(values[`position${item}`]);
                    jobTitle.push(values[`jobTitle${item}`]);
                    mobile.push(values[`mobile${item}`]);
                    dept.push(values[`dept${item}`]);
                    roleIdss.push(values[`roleIdss${item}`]);
                });

                let jobNumNew=[],
                    mobileNumNew=[],
                    flag=false;//工号、手机号重复标志
                // 判断工号重复
                for(let i=0;i<jobNum.length;i++){
                    let num=jobNum[i];
                    if(jobNumNew.filter((newN)=>(newN===num)).length>0){
                        message.error(`工号不能重复，工号${num}有多个`);
                        flag=true;
                        return;
                    }
                    jobNumNew.push(num);
                }
                if(flag) return;
                // 判断手机号重复
                for(let i=0;i<mobile.length;i++){
                    let num=mobile[i];
                    if(mobileNumNew.filter((newN)=>(newN===num)).length>0){
                        message.error(`手机号不能重复，手机号${num}有多个`);
                        flag=true;
                        return;
                    }
                    mobileNumNew.push(num);
                }
                
                if(flag) return;

                this.setState({
                    loading:true
                })
                this.props.dispatch({
                    type:'ADMIN_CREATE_ACCOUNT',
                    data:{
                        name:name.join(','),
                        jobNum:jobNum.join(','),
                        position:position.join(','),
                        jobTitle:jobTitle.join(','),
                        mobile:mobile.join(','),
                        dept:dept.join(','),
                        roleIdss:roleIdss.join(','),
                    },
                    callback:(res)=>{
                        this.setState({
                            loading:false
                        })
                        if(res.code===200){
                            this.props.dispatch({
                                type:'ADMIN_SET_NEW_ACCOUNTS',
                                data:formItems
                            })
                            this.props.getAccountList();
                            this.showMode('accountSuccess');
                            this.props.onCancel();
                        }else{
                            if(res.object!==0){
                                if(!!res.object.userPerson){
                                    let jobNums=[];
                                    res.object.userPerson.map((user)=>{
                                        jobNums.push(user.jobNum);
                                        return '';
                                    })
                                    message.error(`工号${jobNums.join('、')}已注册`);
                                }
                                if(!!res.object.mobileList){
                                    let mobiles=[];
                                    res.object.mobileList.map((user)=>{
                                        mobiles.push(user.mobile);
                                        return '';
                                    })
                                    message.error(`手机号${mobiles.join('、')}已注册`);
                                }
                                return;
                            }
                            message.error(res.message);
                        }
                    }
                })
            }
        });
    }

    // 选择科室
    deptChange=(value,key)=>{
        this.setState({
            positionOptions:_positionOptions[value],
            roleOptions:_roleOptions[value]
        })
        this.props.form.resetFields([`position${key}`,`roleIdss${key}`]);
    }

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { accountSuccessVisible, loading, positionOptions, roleOptions } = this.state;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <Row key={`createAccount${index}`}>
                    <Col span={3} className='createAccount-col-item'>
                        <FormItem   required={false}
                                    key={k}>
                            {getFieldDecorator(`name${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    pattern:/^.{1,5}$/,
                                    message: '不超过5位',
                                }],
                            })(
                                <Input placeholder="姓名" autoComplete='off' />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2} className='createAccount-col-item'>
                        <FormItem required={false}
                                    key={k}>
                            {getFieldDecorator(`jobNum${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    pattern:/^\d{5,6}$/,
                                    message: '5-6位数字',
                                }],
                            })(
                            <Input placeholder="工号" autoComplete='off'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={3} className='createAccount-col-item'>
                        <FormItem required={false}
                                    key={k}>
                            {getFieldDecorator(`mobile${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '11位数字',
                                    pattern:/^\d{11}$/
                                }],
                            })(
                            <Input placeholder="手机号" autoComplete='off'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4} className='createAccount-col-item'>
                        <FormItem required={false}
                                    key={k}>
                            {getFieldDecorator(`dept${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                            <Select placeholder='选择科室' 
                                    autoComplete='off'
                                    onChange={(value)=>{this.deptChange(value,k)}}>
                                <Option value='1'>胸外科</Option>
                                <Option value='2'>质控科</Option>
                                <Option value='3'>信息科</Option>
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={3} className='createAccount-col-item'>
                        <FormItem required={false}
                                    key={k}>
                            {getFieldDecorator(`position${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                                <Select placeholder='职务' 
                                        autoComplete='off'>
                                        {
                                            positionOptions.map((position)=>{
                                                return <Option key={`position${position.value}`} value={position.value}>{position.name}</Option>
                                            })
                                        }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4} className='createAccount-col-item'>
                        <FormItem   required={false}
                                key={k}>
                            {getFieldDecorator(`jobTitle${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                                <Select placeholder='职称' 
                                        autoComplete='off'>
                                    <Option value='1'>初级</Option>
                                    <Option value='2'>中级</Option>
                                    <Option value='3'>副高级</Option>
                                    <Option value='4'>正高级</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4} className='createAccount-col-item'>
                        <FormItem   required={false}
                                key={k}>
                            {getFieldDecorator(`roleIdss${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: '必选项',
                                }],
                            })(
                                <Select placeholder='角色' 
                                        autoComplete='off'>
                                        {
                                            roleOptions.map((role)=>{
                                                return <Option key={`position${role.value}`} value={role.value}>{role.name}</Option>
                                            })
                                        }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1} className='createAccount-minus-icon'>
                    {
                        keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                        ) : null
                    }
                    </Col>
                </Row>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                <h6 className='createAccount-title'>使用者</h6>
                {formItems}
                <FormItem>
                    <Button className='admin-btn-normal noMargin'
                            onClick={this.add}>
                        <Icon type="plus" /> 添加使用者
                    </Button>
                </FormItem>
                <FormItem className='createAccount-form-footer'>
                    <Button key='submit'
                            type='primary'
                            className='admin-btn-primary' 
                            loading={loading}
                            htmlType='submit'>创建</Button>
                    <Button key='back'
                            className='admin-btn-normal'
                            onClick={this.props.onCancel}>取消</Button>
                </FormItem>
                {/* 账号创建成功 */}
                <Modal  title='创建成功'
                        className='modal-box account-success-modal'
                        visible={accountSuccessVisible}
                        onCancel={this.hideMode.bind(this,'accountSuccess')}
                        footer={[]}>
                    <CreateSuccess onClose={this.hideMode.bind(this,'accountSuccess')} {...this.props}/>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(App);