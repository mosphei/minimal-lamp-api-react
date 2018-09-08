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
        const doc=Object.assign({},_item);
        doc.completed=!_item.completed;
        this.props.saveItem(doc);
    }
    render() {
        return (<div>
            <ul  style={{listStyleType:'none'}}>
                {
                    this.props.items.map((item)=>{
                        if (item.parentId === this.props.parentId) {
                            return <ListItem key={item._id} 
                                item={item} items={this.props.items}
                                toggleCompleted={()=>{this.toggleCompleted(item);}}
                                saveItem={(itm)=>{this.props.saveItem(itm)}}
                                removeItem={()=>{this.removeItem(item)}}
                            />
                        }
                    })
                }
            </ul>
            <AddForm parentId={this.props.parentId}
                saveItem={(item) =>{this.props.saveItem(item)}}
            />
        </div>);
    }
}