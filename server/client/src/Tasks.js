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
        }, 10000)
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
    render() {
         
        const tasks = this.state.taskPage.map((task,index) => (
            <tr key={index} className='focusCurcor'>
            <td  style={{ cursor: 'pointer' }}><FaRegTrashAlt /> &ensp; &ensp; <FaRegEdit />  &ensp; &ensp;<FaRegEye /> </td>
            {(Number(this.props.userID)===Number(task.userID) || this.props.boss===true) ? 
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
                <div className='aling tab1 fontWeigth'><button className='fontWeigth tab3'>משימה חדשה</button><span className='fontWeigth tab4'>{this.state.tasksSum}</span></div><div className="tab2"></div>
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