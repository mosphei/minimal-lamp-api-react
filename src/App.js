import React from 'react';
import {fetchItems,removeItem,saveItem} from './service.js';

var table='sampleTodos';
var apiUrl='./api.php';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            items:[]
        };
        this.fetchItems.bind(this);
        this.removeItem.bind(this);
        this.handleTextInput.bind(this);
    }
    componentDidMount(){
        this.fetchItems();
    }
    handleTextInput(event) {
        this.setState({
            newItemText:event.target.value
        });
    }
    fetchItems(){
        fetchItems()
        .then((result)=>{
            this.setState({
                items:result
            });
        })
        .catch((err)=>{
            console.log('err getting items',err);
        });
    }
    removeItem(_item){
        removeItem(_item)
        .then((r)=>{
            this.fetchItems();
        })
        .catch((err)=>{
            console.log('err removing item',err);
        });
    }
    addNewItem() {
        const doc = {
            text:this.state.newItemText,
            _id:this.state.newItemText.replace(/[^a-zA-Z0-9_-]/g,'')
        };
        //console.log('data',data);
        saveItem(doc)
        
        .then((response)=>{
            this.setState({newItemText:''});
            this.fetchItems();
        })
        .catch((err)=>{
            console.log('err adding item',err);
        });
    }
    toggleCompleted(_item){
        const doc={
            _id:_item._id,
            text:_item.text,
            completed:!_item.completed
        };
        //console.log('data',data);
        saveItem(doc)
        .then((response)=>{
            this.fetchItems();
        })
        .catch((err)=>{
            console.log('err updating item',err);
        });
    }
    render(){
        return (<div className='container'>
            <h1>TODO</h1>
            <ul className="list-group">
                {
                    this.state.items.map((item)=>{
                        return <li key={item._id} className="list-group-item">
                            <label>
                                <input type='checkbox' checked={item.completed} 
                                    onChange={()=>{this.toggleCompleted(item)}}
                                    />
                                {item.text}
                            </label>
                            <span className='pull-right' onClick={()=>{
                                this.removeItem(item)
                            }}>
                                <i className="glyphicon glyphicon-remove"></i>
                            </span>
                        </li>;
                    })
                }
            </ul>
            <div style={{paddingTop:'1em'}}>
                <input type="text" value={this.state.newItemText} onChange={(evt)=>{this.handleTextInput(evt)}}
                    className="form-control" placeholder='New Item'
                />
                <button className="btn btn-default" onClick={()=>{this.addNewItem()}}>
                    Add New Item
                </button>
            </div>
        </div>);
    }
}