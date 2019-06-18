import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { Button } from 'antd';
import './style.less';

let jobNum='',
    passWord='';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorMessage:'',
            loading:false
        };
    }

    // 登录
    loginFun=()=>{
        if(!jobNum){
            this.setState({
                errorMessage:'请输入工号'
            });
            return;
        }
        if(!passWord){
            this.setState({
                errorMessage:'请输入4~6位密码，可以输入数字或字母'
            });
            return;
        }
        
        if(!/^[a-zA-Z0-9]{4,6}$/.test(passWord)){
            this.setState({
                errorMessage:'密码格式错误，可以输入4~6位数字或字母'
            });
            return;
        }

        this.setState({
            errorMessage:'',
            loading:true
        });

        this.props.dispatch({
            type:'LOGIN_STATE',
            data:{
                jobNum:jobNum,
                passWord:passWord
            },
            callback:(res)=>{
                this.setState({
                    loading:false
                });
                if(res.code!==200){
                    this.setState({
                        errorMessage:res.message
                    })
                }else{
                    sessionStorage.setItem('lungUserInfo', JSON.stringify(res.object));
                    if(res.object.roleList[0].roleId===4){
                        this.props.history.push('/lungTransplantation/admin');
                    }
                    if(res.object.roleList[0].roleId===3){
                        this.props.history.push('/lungTransplantation/qualityDoc');
                    }else{
                        this.setState({
                            errorMessage:'没有登录权限'
                        })
                    }
                }
            }
        })
        
    }

    // 工号输入
    jobNumChange=(e)=>{
        jobNum=e.target.value;
    }

    // 密码输入
    passWordChange=(e)=>{
        passWord=e.target.value;
    }

    // 密码keyUp事件
    passwordkeyUp=(e)=>{
        let keyCode = e.keyCode || e.which;
        if(keyCode===13){
            this.loginFun();
        }
    }

    render() {
        const { errorMessage,loading } = this.state;

        return (
            <div id='login' className='login-container'>
                {/* 背景图 */}
                <div className='bg'></div>
                {/* 登录框 */}
                <div className='login-form'>
                    <h1 className='login-form-header'>肺移植专科工作站</h1>
                    {/* 用户名 */}
                    <div className='login-form-item'>
                        <label className='login-user-name'></label>
                        <input  type='text' 
                                className='login-form-txt' 
                                placeholder='请输入工号'
                                autoComplete='off'
                                onInput={this.jobNumChange}/>
                    </div>
                    {/* 密码 */}
                    <div className='login-form-item'>
                        <label className='login-password'></label>
                        <input  type='text' 
                                ref={(el)=>this._password=el}
                                className='login-form-txt' 
                                placeholder='请输入4~6位密码，可以输入数字或字母'
                                autoComplete='off'
                                onFocus={()=>{this._password.type='password'}}
                                onKeyUp={this.passwordkeyUp}
                                onInput={this.passWordChange}/>
                    </div>
                    {/* 错误提示 */}
                    <p className={classNames('login-error',{hidden:!errorMessage})}>{errorMessage}</p>
                    {/* 登录按钮 */}
                    <Button     className='login-form-btn'
                                loading={loading}
                                onClick={this.loginFun}>登录</Button>
                </div>
                {/* 页脚 */}
                <div className='login-footer'>
                    {/* <p><i className='ewell-logo'></i>医惠科技</p> */}
                    <p>无锡市人民医院</p>
                    <p>如有问题请联系系统管理员</p>
                </div>
                <a  href='https://joyyoung.gitee.io/lungdonorcentre/' 
                    target='_blank'
                    className='help-icon'></a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login:state.login
    }
}
export default connect(mapStateToProps)(App)
