import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import "./LoginRegister.css";


class LoginRegister extends Component {
    state = { email:'', password:'',isError:false,newuser:false};
    
    login = () =>{
        this.setState({isError:false});
        axios.post('/users/login',{email:this.state.email,password:this.state.password
        }).then(res => {
            //res.data is user
            if(res.status===200){
                this.props.history.push(`/Tasks/${res.data.userID}/${res.data.boss}`);
            }
            else{
                this.setState({isError:true});
                console.log(`error code : &{res.status}`);
            }
        }).catch(err => {
            console.log(err);
            this.setState({isError:true});
        });
    }
    register = () =>{
        this.setState({isError:false});
        axios.post('/users/register',{email:this.state.email,password:this.state.password
        }).then(res => {
            if(res.status===201){
                this.setState({redirecttoDetails:true})
                this.props.history.push(`/Tasks/${res.data.userID}/${res.data.boss}`);
            }
            else{
                this.setState({isError:true});
                console.log(`error code : &{res.status}`);
            }
        }).catch(err => {
            console.log(err);
            this.setState({isError:true});
        });
    }   
    
    onSelect= (e) =>{

        if (e==='link-1') { this.setState({newuser:true})}
        else {  this.setState({newuser:false})  }        

    }
 
    render() {
        const disabled = !this.state.email || !this.state.password;
        let activeTab= '';
        if(this.state.newuser){ activeTab= 'link-1'
        }
        else{activeTab= 'link-2'}  ;
               
        return (

            <div style={{textAlign: 'center'}}>
               <Nav variant="tabs" className="justify-content-center" defaultActiveKey={activeTab} onSelect={this.onSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">הצטרפות</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">כניסה</Nav.Link>
                    </Nav.Item>
                </Nav>   
                <br/><br/>                      
                 <input style={{width:'350px'}} onChange = {evt => this.setState({email:evt.target.value})} type = 'email' placeholder=" &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; מייל"   /> 
                <br/><br/>
                 <input style={{width:'350px'}} onChange = {evt => this.setState({password:evt.target.value})} type = 'password' placeholder=" &ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;  &ensp; &ensp; &ensp; סיסמה"/> 
                <br/><br/><br/>
                {this.state.isError ? <p style={{color:'red'}}>Login Error</p> : ""}
                {this.state.newuser ? <Button  variant="outline-dark"  disabled={disabled} onClick = {this.register}>צור חשבון</Button> : <Button  variant="outline-dark" disabled={disabled}  onClick = {this.login}>כניסה</Button>}                
            </div>
        );
    }            
};

export default LoginRegister;