import React from 'react';
import './List.css';
import AddForm from './AddForm';

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
        const idx = this.state.items.findIndex((itm)=>{return itm._id === _item._id});
        var items=this.state.items.slice();
        items[idx].completed = !_item.completed
        items[idx].saving=true;
        this.setState({items:items});

        const doc={
            _id:_item._id,
            text:_item.text,
            completed:!_item.completed
        };
        
        saveItem(doc)
        .then((response)=>{
            this.fetchItems();
        })
        .catch((err)=>{
            console.log('err updating item',err);
        });
    }
    render() {
        return (<div>
            <ul className="list-group">
                {
                    this.props.items.map((item)=>{
                        return <li key={item._id} className="list-group-item">
                            <label>
                                <input type='checkbox' checked={item.completed} 
                                    onChange={()=>{this.toggleCompleted(item)}}
                                    />
                                {item.text}
                            </label>
                            {item.saving ? ' saving... ':''}
                            <span className='pull-right' onClick={()=>{
                                this.props.removeItem(item)
                            }}>
                                <i className="glyphicon glyphicon-remove"></i>
                            </span>
                        </li>;
                    })
                }
            </ul>
            <AddForm parentId={this.props.parentId}
                saveItem={(item) =>{this.props.saveItem(item)}}
            />
        </div>);
    }
}