import React from 'react';
import List from './List';
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
        this.saveItem.bind(this);
    }
    componentDidMount(){
        this.fetchItems();
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
        const idx = this.state.items.findIndex((itm)=>{return itm._id === _item._id});
        var items=this.state.items.slice();
        items[idx].saving=true;
        this.setState({items:items});

        removeItem(_item)
        .then((r)=>{
            this.fetchItems();
        })
        .catch((err)=>{
            console.log('err removing item',err);
        });
    }
    saveItem(item) {
        console.log('App.js saveItem item',item);
        saveItem(item)        
        .then((response)=>{
            this.setState({newItemText:''});
            this.fetchItems();
        })
        .catch((err)=>{
            console.log('err adding item',err);
        });
    }
    render(){
        return (<div className='container'>
            <h1>TODO</h1>
            <List items={this.state.items} parentId='root' 
                removeItem={(item)=>{
                    this.removeItem(item)
                }}
                saveItem={(item)=>{
                    this.saveItem(item)
                }}
            />
        </div>);
    }
}