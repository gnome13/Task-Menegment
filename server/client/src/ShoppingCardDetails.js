import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import "./ShoppingCardDetails.css";
import Badge from 'react-bootstrap/Badge';

class ShoppingCardDetails extends Component {
    state={newFileName:'',redirecttoHome:false,shoppingCard:'',checkedAll:false,isError:false};

    constructor(props) {
        super(props);
        this.state = { shoppingCard: [...this.props.shoppingCard], };
    };
    handleCheckboxChange = (index,e) => {
        var checkedConst;
        checkedConst  = this.state.shoppingCard;
        checkedConst[index].checked= e.target.checked;
        this.setState({shoppingCard: checkedConst});   
        this.setState({newFileName: 'checkedConst'  });
        console.log(checkedConst,this.state.shoppingCard,"checkedConst");
    };
    handleCheckboxAllChange = event =>  {
        var checkedConstall;
        checkedConstall  = this.state.shoppingCard;        
        for (let index = 0; index < this.state.shoppingCard.length; index++) {
            // this.state.shoppingCard[index].checked=event.target.checked;
            checkedConstall[index].checked= event.target.checked;
        }
        this.setState({shoppingCard: checkedConstall});  
        this.setState({ checkedAll: event.target.checked })
    }
    addOrder = () =>{
        this.setState({isError:false});
        for (let index = 0; index < this.state.shoppingCard.length; index++) {
            const element = this.state.shoppingCard[index];
            if(element.checked===true){
                axios.post('/users/order',{userID:element.userID,itemID:element.itemID,quantity:element.quantity
                }).then(res => {
                    if(res.status===201 && index===this.state.shoppingCard.length-1){
                        alert("הזמנות בוצוע בהצלחה !!!!");
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
                console.log(element.userID,); 
                axios.delete('/shoppingCard?userID=' + Number(element.userID)+'&itemID='+Number(element.itemID))
                .then(res => {

                }).catch(err => {
                    console.log(err);
                    this.setState({isError:true});
                });                  
            }                         
            else if(index===this.state.shoppingCard.length-1){
                alert("הזמנות בוצוע בהצלחה !!!!");
                this.setState({redirecttoHome:true});
            }
        }
    }  
    goToHome = () =>{
        this.setState({redirecttoHome:true});
    }    
    render() {
        const elements = this.state.shoppingCard.map((shoppingCard,index) => (

            <div key={index} className = "shoppingCardItems">
                <br/>
                {/* <div className="shoppingCardLeft"></div> */}
                <img className="shoppingCardimg"  style={{borderRadius:'8px'}}  src={shoppingCard.img} alt="  "/>
                <div className="shoppingCardQuality"><h6>כמות :  {shoppingCard.quantity}   </h6></div>
                {/* <div  className="shoppingCardQuality"><input style={{width:'40px'}} onChange = {evt => shoppingCard.quantity = evt.target.value} type='number' value={shoppingCard.quantity}  />  &ensp;:כמות</div> */}
                <div className="shoppingCardPrice"><h6>{shoppingCard.price}  ₪ </h6></div>
                <div className="shoppingCardDesc"><span style={{fontsize:'10px'}}>{shoppingCard.description} </span></div>
                <div className = "shoppingCardCheck" ><input type="checkbox" checked={this.state.shoppingCard[index].checked} value={index} onChange={this.handleCheckboxChange.bind(this, index)} /></div>
                {/* <div className="shoppingCardRight"></div> */}
                <br/><br/>
            </div>
        ))  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }          
        return (
            <div>
                <br></br>
                <h2><Badge pill variant="warning" >  עגלת קניות   </Badge>{' '} </h2>                
                <div>
                    <label>
                        <input type='checkbox' checked={this.state.checkedAll} onChange={this.handleCheckboxAllChange}/>
                        <span style={{fontsize:'10px'}}>בחר הכול</span>
                    </label>
                </div><br/>
                {elements}
                <br/><br/><br/>
                <h5 style={{display: 'inline-block'}} onClick = {this.addOrder}><Badge pill variant="warning" >   &ensp; קנה עכשיו &ensp;   </Badge>{' '} </h5> &ensp;&ensp;&ensp;  <h5 style={{display: 'inline-block'}} onClick = {this.goToHome}><Badge pill variant="warning" >   &ensp; חזור &ensp;   </Badge>{' '} </h5>         
              </div>
        );
    }
}

export default ShoppingCardDetails;