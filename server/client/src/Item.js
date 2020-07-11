import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import "./Item.css";
import Badge from 'react-bootstrap/Badge';

class Item extends Component {
    state={newFileName:'',isNew:'',redirecttoLoginRegistes:false,isError:false,redirecttoHome:false,quantity:''};

    componentWillMount() {
        this.setState({newFileName:'aaaaa'});
    };   
    login = () =>{
        this.setState({ isNew: true });
        this.setState({ redirecttoLoginRegistes: true });
        this.props.setNewUser(false);
    }  ;  
    register = () =>{
        this.setState({ isNew: true });
        this.setState({ redirecttoLoginRegistes: true });
        this.props.setNewUser(true);
    } ; 
    addOrder = () =>{
        this.setState({isError:false});
        axios.post('/users/order',{userID:this.props.user.userID,itemID:this.props.item.itemID,quantity:this.state.quantity
        }).then(res => {
            if(res.status===201){
                alert("הזמנה בוצע בהצלחה !!!!");
                this.setState({redirecttoHome:true})
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
    addshoppingCard = () =>{
        this.setState({isError:false});
        axios.post('/users/shoppingCard',{userID:this.props.user.userID,itemID:this.props.item.itemID,quantity:this.state.quantity
        }).then(res => {
            if(res.status===201){
                alert("פריט בעגלה  !!!!");
                this.setState({redirecttoHome:true})
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
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }         
    render() {
        if(this.state.redirecttoLoginRegistes){
            return <Redirect to = '/Login_register' />
        }  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }         
        return (
            <div >
                <div className = "itemItems">
                    <br/>
                    <img className="ItemImg" style={{borderRadius:'8px'}} src={this.props.item.img} alt="  "/>
                    <div className="ItemPrice" style={{color:'red'}}><h6>{this.props.item.price}  ₪ </h6></div>
                    <div  className="ItemQuality" ><input style={{width:'60px'}} onChange = {evt => this.setState({quantity:evt.target.value})} type='number' value={this.state.quantity} placeholder=" &ensp; &ensp;&ensp;&ensp; &ensp; כמות   " />&ensp; &ensp;: כמות</div>
                    <div className="ItemDesc"><h6>{this.props.item.description} </h6></div>
                    <br/><br/>
                </div>
                {!this.props.user ? <h5 style={{display: 'inline-block'}} onClick = {this.register}><Badge pill variant="info" >   &ensp; צור חשבון &ensp;   </Badge>{' '} </h5>  : ''}&ensp; &ensp; &ensp; 
                {!this.props.user ? <h5 style={{display: 'inline-block'}} onClick = {this.login}><Badge pill variant="info" >   &ensp; התחבר  &ensp;   </Badge>{' '} </h5>  : ''} &ensp; &ensp; &ensp;  

                {/* {!this.props.user ? <Button  variant="outline-dark"  className="Buttons" onClick = {this.register}>צור חשבון</Button> : ''}
                {!this.props.user ? <Button  variant="outline-dark" className="Buttons"  onClick = {this.login}>התחבר</Button> : ''}   
                              */}
                {this.props.user  && this.state.quantity>0 ? <h5 style={{display: 'inline-block'}} onClick = {this.addOrder}><Badge pill variant="info" >   &ensp; קקנה עכשיו  &ensp;   </Badge>{' '} </h5>: ''} &ensp; &ensp; &ensp;
                {this.props.user && this.state.quantity>0 ? <h5 style={{display: 'inline-block'}} onClick = {this.addshoppingCard}><Badge pill variant="info" >   &ensp; הוסיף לעגלה  &ensp;   </Badge>{' '} </h5> : ''} &ensp; &ensp; &ensp;  
                <h5 style={{display: 'inline-block'}} onClick = {this.goToHome}><Badge pill variant="info" >   &ensp; חזור &ensp;   </Badge>{' '} </h5>  

                {/* {this.props.user  && this.state.quantity>0 ? <Button  variant="outline-dark" className="Buttons" onClick = {this.addOrder}>קנה עכשיו</Button> : ''}
                {this.props.user && this.state.quantity>0 ? <Button  variant="outline-dark" className="Buttons"  onClick = {this.addshoppingCard}>הוסיף לעגלה</Button> :''}
                <Button  variant="outline-dark" className="Buttons" onClick = {this.goToHome}> חזור</Button> */}
            </div>
        );
    }
}

export default Item;