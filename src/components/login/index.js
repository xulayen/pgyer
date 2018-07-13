
import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect 
} from 'react-router-dom';

import axios from 'axios';

import { Modal,Spin,Alert } from 'antd';

import './css/index.css';

import config from '../../config';

import {observer, inject} from 'mobx-react';

import DevTools from 'mobx-react-devtools';

/**
 * 
 * 设置雪花背景基础配置
 * **/
import particlesJS from '../../lib/js/particles.js';
import backJson from '../../lib/js/background.json';

const success=Modal.success;



@inject(['loginStore'])  
@observer
class login extends Component {

    constructor(props){
        super(props);
        console.log(this)
    }

    componentDidMount(){
        //设置登录注册背景雪花飘落
        particlesJS('box',backJson);
        console.log(this)
    }

    
    changeUsername = (e) => {
        this.props.loginStore.changeUsername(e.target.value)
    }

    changePassword = (e) => {
        this.props.loginStore.changePassword(e.target.value)
    }

    changeImgcode = (e) => {
        this.props.loginStore.changeImgcode(e.target.value)
    }


    login(){
        let _this=this;

        let isLock=false;
        if(!isLock){
            this.setState({
                loading:true
            })
            isLock=true;
            var data={username:this.props.loginStore.username,pwd:this.props.loginStore.password,imgcode:this.props.loginStore.imgcode};//e10adc3949ba59abbe56e057f20f883e
            axios.post('/api/user/login',data).then(function(pdata){
                if(pdata.data=='1'){
                    isLock=false;
                    success({
                        title: '登录成功！',
                        content: "测试 调取/api/user/login接口:"+pdata.data,
                        onOk() {
                        return new Promise((resolve, reject) => {
                                
                                window.location.href='/';

                        }).catch(() => console.log('Oops errors!'));
                        }
                    })
                    return;
                }
            }).catch(function(error){
                console.log(error);
                isLock=false;
            })
        }
    }

    changeValidCode(e){
        this.refs.imgcode.src=this.refs.imgcode.src+'?rnd='+Math.random();
    }

    render(){

        return (
            <div>
                <div id="box"></div>
                <div className="cent-box">
         
                    <div className="cent-box-header">
                        <h1 className="main-title"></h1>
                        <h2 className="sub-title">蒲公英一物一码营销管理平台</h2>
                    </div>
                
                    <div className="cont-main clearfix">
                        <div className="index-tab">
                            <div className="index-slide-nav">
                                <Link to="/login"  className="active">登录 </Link>
                                <Link to="/reg">注册 </Link>
                                <div className="slide-bar"></div>				
                            </div>
                        </div>
            
                    <div className="login form">
                        
                        <div className="group">
                            <div className="group-ipt email">
                                <input type="text" name="email" id="email"  onChange={ this.changeUsername.bind(this) } className="ipt" placeholder="邮箱地址" required/>
                            </div>
                            <div className="group-ipt password">
                                <input type="password" name="password" id="password" onChange={ this.changePassword.bind(this) } className="ipt" placeholder="输入您的登录密码" required/>
                            </div>
                            <div className="group-ipt verify">
                                <input type="text" name="verify" id="verify" onChange={this.changeImgcode.bind(this)} className="ipt" placeholder="输入验证码" required/>
                                <img src="/api/validcode/getcode" onClick={this.changeValidCode.bind(this)} ref="imgcode" alt="看不清，点击更换" className="imgcode"/>
                            </div>
                        </div>
                        
                    </div>


                    <div className="button">
                        <button type="submit" className="login-btn register-btn" onClick={this.login.bind(this)} id="button">登录</button>
                    </div>
            
                    <div className="remember clearfix">
                        <label className="remember-me"><span className="icon"><span className="zt"></span></span>
                        <input type="checkbox" name="remember-me" id="remember-me" className="remember-mecheck" />记住我</label>
                        <label className="forgot-password">
                            <a href="#">忘记密码？</a>
                        </label>
                    </div>
                </div>
            </div>


            <div className="footer">
                <p>CCN - Aways Makes More</p>
                <p>Designed By 徐大腿 & <a href="http://xulayen.imwork.net">xulayen.com</a> 2018</p>
            </div>
        </div>
        )
    }
}


export default login;
