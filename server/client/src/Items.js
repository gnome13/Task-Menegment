import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import "./Items.css";
import Badge from 'react-bootstrap/Badge';

class Items extends Component {
    state={newFileName:'',redirectToItems:false,redirecttoHome:false};

    componentWillMount() {
        this.setState({newFileName:'aaaaa'});
    };  
    getItem = (index) =>{
 
        this.props.setItemIndex(index);
        this.setState({ redirectToItems: true });
    }  ;    
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }  
    render() {
        const elements = this.props.items.map((item,index) => (
            <div key={index} className = "divItems">
                <br/>
                <img className = "divimg"  style={{borderRadius:'8px'}} onClick ={() => this.getItem(index)} src={item.img} alt="  "/>
                <div className="divPrice"  style={{color:'red'}}><h6>{item.price}  ₪ </h6></div> 
                <div className="divDesc"><h6>{item.description} </h6></div>
            </div>
        ))  
        if(this.state.redirectToItems){
            return <Redirect to = '/Item' />
        } 
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }   

        return (
            <div >
                <h2><Badge pill variant="info" >  {this.props.categoroitName}   </Badge>{' '} </h2>                              
                <br></br>
                {elements}
                <br></br><br></br>
                <h5 onClick = {this.goToHome}><Badge pill variant="info" >   &ensp; חזור &ensp;   </Badge>{' '} </h5>  
            </div>
        );
    }
}

export default Items;