import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import getTasks from './functionHelper.jsx';
import Table from 'react-bootstrap/Table';
import './Tasks.css';
import { MdSearch,MdCheck  } from 'react-icons/md';
import { FaRegEdit, FaRegEye,FaRegTrashAlt,FaArrowsAltV} from "react-icons/fa";

class Tasks extends Component {
    state={tasks:[],taskPage:[],tasksSum:0,isError:false,sortOrderDate:true,sortOrdername:true,rigthText:'', pageNumberOfLines:20,pagecurrentPage:1};

    constructor(props) {
        super(props);
        getTasks(this.getTasksCallback.bind(this));
    }
    componentDidMount() {
        setInterval(() => {
            getTasks(this.getTasksCallback);
        }, 100000)
    }
    getTasksCallback = (data) => {
        if (data.tasks !== null) {
            this.setState({ tasks: data.tasks });
            this.setState({ tasksSum: 'רשימת הלקוחות שלך (' + data.tasks.length + ')'});
            this.setState({ sortOrderDate: !this.state.sortOrderDate });
            this.setState({ sortOrdername: !this.state.sortOrdername });
            this.sortDate();
            this.sortName();
            this.rigthTextFunction();
        }
    }
    sortDate = () =>{
        switch((this.state.sortOrderDate)) {
            case true:
                this.state.tasks.sort(function(a, b){return b.creationDate>a.creationDate ? 1 : -1});
                this.setState({ sortOrderDate: false });
                break;
            case false:
                this.state.tasks.sort(function(a, b){return b.creationDate<a.creationDate ? 1 : -1}); 
                this.setState({ sortOrderDate: true });
                break;
            default:
                this.state.tasks.sort(function(a, b){return a.userID-b.userID});
        }        
    } 
    
    sortName = () =>{
        switch((this.state.sortOrdername)) {
            case true:
                this.state.tasks.sort(function(a, b){return b.clientName>a.clientName ? 1 : -1}); 
                this.setState({ sortOrdername: false });
                break;
            case false:
                this.state.tasks.sort(function(a, b){return b.clientName<a.clientName ? 1 : -1}); 
                this.setState({ sortOrdername: true });
                break;
            default:
                this.state.tasks.sort(function(a, b){return a.userID-b.userID});
        }        
    } 
    rigthTextFunction  = () =>{
        var currentLinesEnd,currentLinesBegin;
        currentLinesEnd=Number(this.state.pageNumberOfLines)*Number(this.state.pagecurrentPage);
        currentLinesBegin=currentLinesEnd-Number(this.state.pageNumberOfLines) + 1 ;
        this.setState({ rigthText: ('מראה ' + currentLinesBegin + ' - ' + currentLinesEnd + ' מתוך ' + this.state.tasks.length + ' תוצאות ') });
        let tasksnew=[];
        for (let index = 0; index < this.state.tasks.length; index++) {
            if (index >=currentLinesBegin-1 && index<= currentLinesEnd-1){
                tasksnew[index]=this.state.tasks[index];
            }
        }
        this.setState({ taskPage: tasksnew });
    }                   
    DateFormat = (createDate) =>{
        const currentdate = new Date(createDate);
        let currentDay,currentMonth;
        if (currentdate.getDate().toString().length===1){
            currentDay="0"+currentdate.getDate();
        }else{
            currentDay=currentdate.getDate();
        }
        if ((currentdate.getMonth() + 1).toString().length===1){
            currentMonth="0"+(currentdate.getMonth() + 1);
        }else{
            currentMonth=(currentdate.getMonth() + 1);
        }        
        return currentDay + "." + currentMonth + "." + currentdate.getFullYear();
    } 
    deleteTask= (taskID,userID) =>{
        this.setState({isError:false});
        if((Number(this.props.userID)===Number(userID) || this.props.boss==='true')){        
            axios.delete(`/tasks/${taskID}`)
            .then(res => {

            }).catch(err => {
                console.log(err);
                this.setState({isError:true});
            });  
        }            
    } 
    addtask = () =>{
        console.log('add');
        this.setState({isError:false});
        axios.post('/tasks',{userID:1,clientName:'fffff',telefon:'324555',email:'kuku@com',creationDate:('2020-07-09T21:00:00.000+00:00'),description:'jjjjjjjjjjj'
        }).then(res => {
            if(res.status===201){
                
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

    updateTask = (index) =>{
        this.setState({isError:false});
        if((Number(this.props.userID)===Number(this.state.tasks[index].userID) || this.props.boss==='true')){
            axios.put('/tasks',{taskID:this.state.tasks[index].taskID,
                userID:this.state.tasks[index].userID,
                clientName:this.state.tasks[index].clientName,
                telefon:this.state.tasks[index].telefon,
                email:this.state.tasks[index].email,
                description:this.state.tasks[index].description
            }).then(res => {
                if(res.status===200){
    
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
 
    }            
    render() {
         
        const tasks = this.state.taskPage.map((task,index) => (
            <tr key={index} className='focusCurcor'>
            <td  style={{ cursor: 'pointer' }}><FaRegTrashAlt onClick={() => this.deleteTask(task.taskID,task.userID)}/> &ensp; &ensp; <FaRegEdit onClick={() => this.updateTask(index)}/>  &ensp; &ensp;<FaRegEye /> </td>
            {(Number(this.props.userID)===Number(task.userID) || this.props.boss==='true') ? 
                    <td>{this.DateFormat(task.creationDate) }&ensp; &ensp; <MdCheck /> </td> : 
                    <td>{this.DateFormat(task.creationDate) }&ensp;&ensp;&ensp;&ensp;&ensp;</td>}
                <td>{task.email}</td>
                <td>{task.telefon}</td>
            <td>{task.clientName} <input type="checkbox"  /></td>
            </tr> 
        ))          
        
        return (
            <div >  
                <br></br>
                <br></br>
                <h2 className='aling tab1 fontWeigth fontColor'>ניהול משימות</h2><div className="tab2"></div>
                <br></br>
                <br></br>
                <MdSearch className='iconstyle'/><input type="text" className='aling tab1 fontWeigth ' placeholder ="... חיפוש משימה"></input><div className="tab2"></div>
                <br></br>
                <br></br> 
                <br></br> 
                <div className='aling tab1 fontWeigth'><button className='fontWeigth tab3' onClick={this.addtask}>משימה חדשה</button><span className='fontWeigth tab4'>{this.state.tasksSum}</span></div><div className="tab2"></div>
                <br></br>
                <br></br>
                                           
                <div className="tab1 tableBorder focusCurcor">
                <Table   hover className='aling' >
                <thead className="p-3 mb-2 bg-light text-dark">
                    <tr>
                        <th>פעולות</th>
                        <th onClick = {this.sortDate}><FaArrowsAltV /> תאריך יצירת המשימה</th>
                        <th >מייל</th>
                        <th>טלפון</th>
                        <th onClick = {this.sortName}><FaArrowsAltV /> שם המשתמש <input type="checkbox"  /></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks}
                </tbody>
                </Table>
                </div>
                <br></br>
                <div className="tab2"></div>
                <div className='tab1 aling'><h6 className='rigthText '>{this.state.rigthText}</h6></div><div className="tab2"></div>
            </div>
                
        );
    }
}

export default Tasks;