import React from 'react';
import './List.css';
import AddForm from './AddForm';
import ListItem from './ListItem';

export default class List extends React.Component {
    constructor(props){
        super(props);
        const listItems=this.props.items.filter((i)=>{
            return i.parentId === props.parentId;
        });
        this.state={
            newItemText:'',
            showAddForm:listItems.length == 0
        };
        this.toggleCompleted.bind(this);
        this.showAddFormHandler.bind(this);
    }
    showAddFormHandler() {
        this.setState({showAddForm:true});
    }
    toggleCompleted(_item){
        const doc=Object.assign({},_item);
        doc.completed=!_item.completed;
        this.props.saveItem(doc);
    }
    render() {
        return (<ul className="todo-list">
            {
                this.props.items.map((item)=>{
                    if (item.parentId === this.props.parentId) {
                        return <ListItem key={item._id} 
                            item={item} items={this.props.items}
                            toggleCompleted={()=>{this.toggleCompleted(item);}}
                            saveItem={(itm)=>{this.props.saveItem(itm)}}
                            removeItem={(itm)=>{this.props.removeItem(itm)}}
                        />
                    }
                })
            }
            <li>
                { this.state.showAddForm ? 
                    <AddForm parentId={this.props.parentId}
                        saveItem={(item) =>{this.props.saveItem(item)}}
                    />
                    :
                    <button onClick={()=>{this.showAddFormHandler()}} 
                        className='btn btn-default'
                        >
                        New Item
                    </button>
                }
            </li>
        </ul>);
    }
}