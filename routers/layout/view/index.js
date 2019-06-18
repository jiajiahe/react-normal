import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import Header from '../component/header'
import "./style.less"
import Admin from '../../admin'
import QualityDoc from '../../qualityDoc'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            init: true,
            pageType:0,//1:用户，2：角色3：权限4：字典5:无权限
            curLanuage:"1",//1汉语2英语
        }
    }

    componentWillMount() {
        
    }
	
    render() {
        if (this.state.init) {
            return (
                <div id="home">
                    <Header {...this.props}/>
                    <div className='layout-main'>
                        <Route exact path="/lungTransplantation/admin" component={Admin}/>
                        <Route exact path="/lungTransplantation/qualityDoc" component={QualityDoc}/>
                    </div>
                </div>
            )
        }
        return (
            <div id="home" style={{background:"#EAEBED"}}>
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
                <div className="homeLoad">loading</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        layout: state.layout
    }
}

export default withRouter(connect(mapStateToProps)(App))

