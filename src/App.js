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
    getAllSubitems(_item) {
        var items=this.state.items.filter((i)=>(i.parentId == _item._id));
        if (items.length>0) {
            for (var i=0;i<items.length;i++) {
                items.push(...this.getAllSubitems(items[i]));
            }
        }
        return items;
    }
    removeItem(_item){
        console.log('removing _item',_item);
        const idx = this.state.items.findIndex((itm)=>{return itm._id === _item._id});
        var items=this.state.items.slice();
        items[idx].saving=true;
        this.setState({items:items});
        return new Promise((resolve,reject)=>{
            //first remove all subitems
            var subitems=this.getAllSubitems(_item);
            console.log('also delete subitems ',subitems);
            var subpromises=subitems.map((i)=>(removeItem(i)));
            Promise.all([
                ...subpromises,
                removeItem(_item)
            ])
            .then(()=>{
                const undoToast=(<div className='alert alert-success'
                style={{position:'fixed',bottom:'1%',left:'1%'}}>
                    <button className='btn btn-link' style={{float:'right'}} 
                    onClick={()=>{
                        this.setState({toast:undefined});
                    }}>X</button>
                    Deleted {subitems.length + 1}  item{subitems.length === 0 ? '' : 's'}
                    <button className='btn btn-link' onClick={
                        ()=>{
                            const restoreItems=[_item,...subitems];
                            console.log('undo deletion of ',restoreItems);
                            Promise.all(
                                restoreItems.map((i)=>{
                                    delete i._rev; delete i.saving;
                                    return saveItem(i);
                                })
                            )
                            .then(()=>{
                                this.setState({toast:undefined});
                                this.fetchItems();
                            })
                            .catch((err)=>{
                                console.log('restore items err',err);
                            });
                        }}>
                        UNDO
                    </button>
                </div>);
                this.setState({
                    toast:undoToast
                });
                this.fetchItems();
                resolve(true);
            })
            .catch((err)=>{
                console.log('err removing item',err);
                reject(err);
            });
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
        const toast=this.state.toast;
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
            {toast}
        </div>);
    }
}