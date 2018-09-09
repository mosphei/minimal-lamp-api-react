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
                items:result.map((i)=>{
                    i.parentId=i.parentId || 'root';
                    return i;
                })
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
        const idx = this.state.items.findIndex((itm)=>{return itm._id === item._id});
        var items=this.state.items.slice();
        if (idx >= 0) {
            items[idx]=item;
            items[idx].saving=true;
        } else {
            items.push({
                _id:item._id,
                text:item.text,
                saving:true
            });
        }
        this.setState({items:items});
        var doc={
            _id:item._id,
            _rev:item._rev,
            text:item.text,
            completed:item.completed,
            parentId:item.parentId
        };
        saveItem(doc)        
        .then((response)=>{
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
                removeItem={(i)=>{
                    this.removeItem(i)
                }}
                saveItem={(item)=>{
                    this.saveItem(item)
                }}
            />
        </div>);
    }
}