import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "./ItemsUpdate.css";
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

class ItemsUpdate extends Component {
    state={newFileName:'',redirecttoHome:false,items:[],isError:false,fileAdd:'',files:[],img:[],
    imgAdd:'',description:'',price:'',imgNew:''};

    constructor(props) {
        super(props);
        this.state = { items: [...this.props.items], };
        let arr = new Array(this.props.items.length).fill('');
        this.state.files=arr; 
    }; 

    descriptionChange = (index,e) => {
        var descriptionConst;
        descriptionConst  = this.state.items;
        descriptionConst[index].description= e.target.value;
        this.setState({items: descriptionConst});   
    };  

    priceChange = (index,e) => {
        console.log(index);
        var priceConst;
        priceConst  = this.state.items;
        priceConst[index].price= e.target.value;
        this.setState({items: priceConst});   
    };     
    // getItem = (index) =>{
    //     this.props.setItemIndex(index);
    // }  ;  
    updateFile = (index,evt) =>{
        var fileConst;
        fileConst  = this.state.files;
        fileConst[index]= evt.target.files[0];
        this.setState({files: fileConst});  
    }  ; 
    updateNewFile = (index,evt) =>{
        // var stam=evt.target.files[index];
       this.state.fileAdd=evt.target.files[index];
       this.setState({fileAdd:evt.target.files[index]});
        console.log(this.state.fileAdd,evt.target.files[0],'fileAdd') ;       
    }        
    loadToServerUpdateItem = (index,mode) =>{

        if ((this.state.files[index] && mode==='update') || (this.state.fileAdd && mode==='add')){
            let formData = new FormData();
            // formData.append('someFile',this.state.file);
            if (mode==='update'){
                formData.append('someFile',this.state.files[index]);
            }
            else{
                console.log(this.state.fileAdd,'this.state.fileAdd');
                formData.append('someFile',this.state.fileAdd);    
            }            
            const config = {headers: {'content-type':'multipart/form-data'}}
            axios.post('/api',formData,config)
            .then(res =>{
              if(res.status===201){
                console.log(res.data.file,'res.data.file.filename');
                this.setState({newFileName:res.data.file.filename});
                if(mode==='update'){
                    var pictureConst;
                    pictureConst  = this.state.items;
                    console.log(res.data.file,'res.data.file.filename');
                    pictureConst[index].picture= res.data.file.filename;
                    this.setState({items: pictureConst});   
                }
                axios.get(`/images/${this.state.newFileName}`,{responseType:'blob'})
                .then(res=>{
                    if ( res.status===200 ) {
                        const reader = new FileReader();
                        reader.readAsDataURL(res.data);
                        const _this = this;
                        reader.onload = function(){
                            const imageDataURL = reader.result;
                            _this.setState({img:imageDataURL});
                            if(mode==='update'){
                                pictureConst.img= imageDataURL;
                                _this.state.items[index]={...pictureConst};
                                _this.setState({newFileName:''});
                                _this.updateItem(index);
                            }
                            else{
                                _this.addItem() ;   
                            }
                        }
                    }
                    else{
                        console.log(`error status code :${res.status} `)
                    }
                }).catch(err=>console.log(err));
              }
              else{
                console.log(`error status code ${res.status}`);
              }
            })
            .catch(err =>console.log(err));            
        }
        else{
            if(mode==='update'){
                this.setState({newFileName:''});
                this.updateItem(index);
            }
            else{
                this.addItem() ;   
            }
        }
    };    
    updateItem = (index) =>{
        this.setState({isError:false});
    
        axios.put('/items',{itemID:this.state.items[index].itemID,
            categoriotID:this.state.items[index].categoriotID,
            description:this.state.items[index].description,
            picture:this.state.items[index].picture,
            price:this.state.items[index].price
        }).then(res => {
            if(res.status===200){
                var checkedConst;
                checkedConst  = this.state.items;
                checkedConst[index]= res.data;
                this.setState({items: checkedConst}); 
                // console.log(this.state.items,'this.state.items') ;
                this.props.setItems(this.state.items);
                this.getItems (this.props.categoriotIndex);
                // console.log(this.state.items,'this.state.items') ;

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
    addItem = () =>{
        this.setState({isError:false});
    
        axios.post('/items',{
            categoriotID:this.state.items[0].categoriotID,
            description:this.state.description,
            picture:this.state.newFileName,
            price:this.state.price
        }).then(res => {
            if(res.status===201 ){
                
                this.setState({newFileName:'add'});
                this.setState({items: [...this.state.items, res.data]});                
                this.props.setItems(this.state.items);
                this.getItems (this.props.categoriotIndex);
                this.setState({price:''});
                this.setState({description:''});
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
    getItems = (index) =>{

        // console.log(index);
        axios
        .get('/items?categoriotID=' + Number(index))
        .then(res => {
          this.setState({ items: res.data });
           for (let index1 = 0; index1 < this.state.items.length; index1++) {
               let item = this.state.items[index1];
               axios.get(`/images/${item.picture}`,{responseType:'blob'})
               .then(res=>{
                   if ( res.status===200 ) {
                       const reader = new FileReader();
                       reader.readAsDataURL(res.data);
                       const _this = this;
                       reader.onload = function(){
                           const imageDataURL = reader.result;
                           _this.setState({img:imageDataURL});
                            item= {...item,  img: imageDataURL };
                            _this.state.items[index1]={...item,  img: imageDataURL };
                            setTimeout(() => { 
                                if (index1===_this.state.items.length-1)  {
                                    // console.log('if',_this.state.items);
                                    _this.props.setItems(_this.state.items);
                                    _this.setState({img:''});
                                }   
                            }, 2000);                                              
                       }
                   }
                   else{
                       console.log(`error status code :${res.status} `)
                   }
               }).catch(err=>console.log(err));         
               
           } 
        })
        .catch(err => console.log(err));
    } ;    
    goToHome = () =>{
        this.props.setItems('');
        this.setState({redirecttoHome:true});
    }       
    render() {
        const elements = this.state.items.map((item,index) => (
            <div key={index} >
                <div className="ItemsUpdateLeft">
                    {/* <Button  variant="outline-dark" className="Buttons"  onClick ={() => this.loadToServerUpdateItem(index,'update')} > עדכון </Button>                  */}
                    <h5 style={{display: 'inline-block'}} onClick ={() => this.loadToServerUpdateItem(index,'update')}><Badge pill variant="secondary" >   &ensp; עדכון &ensp;   </Badge>{' '} </h5>  
                </div>
                <img className="ItemsUpdateimg" src={item.img} alt="  "/>
                {/* <img  src={item.img} alt="  "/> */}
                <div className="ItemsUpdatePrice">
                    ₪ <input style={{width:'50px',textAlign: 'right'}} onChange={this.priceChange.bind(this, index)} type = 'number' value={item.price}  /> מחיר 
                </div> 
                <div className="ItemsUpdateQuality">
                    <input type="file" name="file" id= {index} className="inputfile" onChange={this.updateFile.bind(this, index)}  />
                    <label for={index} variant="outline-dark"  className="Buttons"><strong>בחר קובץ</strong></label>   
                </div> 
                <div className="ItemsUpdateDesc">
                    <input style={{width:'600px',textAlign: 'right'}} onChange={this.descriptionChange.bind(this, index)} type = 'text'  value={item.description}  /> 
                </div>
                <br/><br/>                  
            </div>
        ))  
        if(this.state.redirecttoHome){
            return <Redirect to = '/' />
        }          
        return (
            <div className = "Homediv">
                <br></br>
                <h2><Badge pill variant="secondary" > &ensp;  {this.props.categoroitName} &ensp;  </Badge>{' '} </h2>                  
                {/* <h2>{this.props.categoroitName}</h2> */}
                {elements}
                <br></br>

                <div  >
                    <div className="ItemsUpdateLeft">
                        {/* <Button  variant="outline-dark" className="Buttons"  onClick ={() => this.loadToServerUpdateItem(100,'add')}> הוספה </Button>  */}
                        <h5 style={{display: 'inline-block'}} onClick ={() => this.loadToServerUpdateItem(100,'add')}><Badge pill variant="secondary" >    &ensp; הוספה &ensp;     </Badge>{' '} </h5> &ensp;&ensp;&ensp; 

                    </div>                            
                    <img className="ItemsUpdateimg"  src={this.state.imgNew} alt="  "/>
                    <div className="ItemsUpdatePrice">
                        ₪ <input style={{width:'50px',textAlign: 'right'}} onChange = {evt => this.setState({price:evt.target.value})}  type = 'number' value={this.state.price}  /> מחיר 
                    </div> 
                    <div className="ItemsUpdateQuality">
                        <input type="file" name="file" id="fileAdd" className="inputfile"  onChange={evt => this.setState({fileAdd:evt.target.files[0]})}  />
                        <label for="fileAdd" variant="outline-dark"  className="Buttons"><strong>בחר קובץ</strong></label>   
                    </div> 
                    <div className="ItemsUpdateDesc">
                        <input style={{width:'600px',textAlign: 'right'}} onChange = {evt => this.setState({description:evt.target.value})}  type = 'text'  value={this.state.description}  /> 
                    </div>
                    <br/><br/>                  
                </div>

                <h5  onClick = {this.goToHome}><Badge pill variant="secondary" >   &ensp; חזור &ensp;   </Badge>{' '} </h5>                  

                {/* <Button  variant="outline-dark" className="Buttons" onClick = {this.goToHome}> חזור</Button> */}
            </div>
        );
    }
}

export default ItemsUpdate;