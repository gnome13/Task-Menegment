import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Orders.css";
import {Redirect} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

class Orders extends Component {
    state={newFileName:'',redirecttoHome:false,orders:'',isError:false};

    constructor(props) {
        super(props);
        this.state = {orders: [...this.props.orders], };
    };

    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }    
    render() {
        const elements = this.state.orders.map((orders,index) => (

            <div key={index} className = "OrderItems">
                {/* <div className="orderLeft"></div> */}
                <br/>
                <img className="orderImg" style={{borderRadius:'8px'}} src={orders.img} alt="  "/>
                <div className="OrderPrice"  style={{color:'red'}}><h6>{orders.price}  ₪ </h6></div>
                <div className="OrderQuality"><h6>כמות :  {orders.quantity}   </h6></div>
                <div className="OrderDesc" ><span>{orders.description} </span><br/><span>סטטוס : {orders.statusName}   </span>&ensp; &ensp;  &ensp; &ensp; &ensp; &ensp; <span style={{fontsize:'10px'}}> תאריך הזמנה : {orders.date}   </span></div>
                {/* <div className="OrdeRight"></div> */}
            </div>
        ))  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }          
        return (
            <div >
                <h2><Badge pill variant="primary" >  הזמנות   </Badge>{' '} </h2>                              
                <br></br>
                {elements}
                <br></br><br></br>
                <h5 onClick = {this.goToHome}><Badge pill variant="primary" >   &ensp; חזור &ensp;   </Badge>{' '} </h5>  
            </div>
        );
    }
}

export default Orders;