import React from 'react';
import List from './List';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        const subitems=this.props.items.filter((i)=>{return i.parentId === props.item._id});
        const allCompleted=subitems.reduce((acc,curr)=>{
            console.log(curr);
            return acc && !!curr.completed;
        },true);
        console.log('subitems ('+allCompleted+')',subitems);
        this.state={
            text:props.item.text,
            subitems:subitems,
            expanded:!props.item.completed && !allCompleted
        };
    }
    handleTextChange(evt){
        this.setState({
            text:evt.target.value
        });
    }
    handleKeyPress(evt) {
        console.log('keypress evt',evt.keyCode);
        if (evt.keyCode === 27) {
            //escape button
            this.cancelTextChange();
        }
        if (evt.keyCode === 13) {
            //enter button
            this.saveTextChange();
        }
        
    }
    toggleExpanded() {
        const expanded=!this.state.expanded;
        this.setState({expanded:expanded});
    }
    cancelTextChange(){
        this.setState({
            text:this.props.item.text
        });
    }
    saveTextChange(){
        this.props.saveItem({
            _id:this.props.item._id,
            _rev:this.props.item._rev,
            completed:this.props.item.completed,
            text:this.state.text
        });
    }
    render() {
        let appendButtons;
        if (this.props.item.saving) {
            appendButtons=[
                <span className='input-group-text' key='saving'>
                    saving...
                </span>
            ];
        } else if (this.state.text === this.props.item.text) {
            appendButtons=[
                <button className="btn btn-outline-default" key='opener'
                    onClick={()=>{this.toggleExpanded();}}
                    >
                    <i className={"glyphicon glyphicon-menu-"+(this.state.expanded ? 'up':'down')}></i>
                </button>,
                <button className="btn btn-danger" key='remover'
                    onClick={()=>{
                        this.props.removeItem(this.props.item)
                    }}>
                    <i className="glyphicon glyphicon-remove"></i>
                </button>
            ];
        } else {
            appendButtons=[
                <button className="btn btn-primary" key='savebutton'
                    onClick={()=>{this.saveTextChange()}}
                    >
                    Save
                </button>,
                <button className="btn btn-danger" key='cb'
                    onClick={()=>{
                        this.cancelTextChange()
                    }}
                    >
                    Cancel
                </button>
            ];
        }
    const itemCompleted=!!this.props.item.completed;
    return (<li>
        <div className="input-group mb-3 input-group-lg">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input type='checkbox' checked={itemCompleted} 
                        onChange={this.props.toggleCompleted}
                        />
                </div>
            </div>
            <input type="text" value={this.state.text} 
                className="form-control" 
                onChange={(event)=>{this.handleTextChange(event)}}
                onKeyDown={this.handleKeyPress.bind(this)}
                />
            <div className='input-group-append'>
                {appendButtons}
            </div>
        </div>
        {this.state.expanded ? 
            <div style={{paddingLeft:'1em'}}>
                <List parentId={this.props.item._id} 
                    items={this.props.items} 
                    removeItem={(itm)=>{
                        this.props.removeItem(itm)
                    }}
                    saveItem={(itm)=>{
                        this.props.saveItem(itm)
                    }}
                />            
            </div>
            :
            ''
        }
        </li>);
    }
}