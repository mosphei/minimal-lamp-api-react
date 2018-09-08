import React from 'react';
import './List.css';
import AddForm from './AddForm';
import ListItem from './ListItem';

export default class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            newItemText:'',
            showAddForm:false
        };
        this.toggleCompleted.bind(this);
    }
    
    toggleCompleted(_item){
        const doc={
            _id:_item._id,
            _rev:_item._rev,
            text:_item.text,
            completed:!_item.completed
        };
        this.props.saveItem(doc);
    }
    render() {
        return (<div>
            <ul  style={{listStyleType:'none'}}>
                {
                    this.props.items.map((item)=>{
                        return <ListItem key={item._id} 
                            item={item} 
                            toggleCompleted={()=>{this.toggleCompleted(item);}}
                            saveItem={(itm)=>{this.props.saveItem(itm)}}
                            removeItem={()=>{this.removeItem(item)}}
                        />
                    })
                }
            </ul>
            <AddForm parentId={this.props.parentId}
                saveItem={(item) =>{this.props.saveItem(item)}}
            />
        </div>);
    }
}