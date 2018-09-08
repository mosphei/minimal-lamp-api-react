import React from 'react';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text:props.item.text
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
                <span className='input-group-text'>saving...</span>
            ];
        } else if (this.state.text === this.props.item.text) {
            appendButtons=[
                <button className="btn btn-outline-default">
                    <i className="glyphicon glyphicon-menu-down"></i>
                </button>,
                <button className="btn btn-danger" onClick={()=>{
                    this.props.removeItem(item)
                }}>
                    <i className="glyphicon glyphicon-remove"></i>
                </button>
            ];
        } else {
            appendButtons=[
                <button className="btn btn-primary"
                    onClick={()=>{this.saveTextChange()}}
                    >
                    Save
                </button>,
                <button className="btn btn-danger" onClick={()=>{
                    this.cancelTextChange()
                }}>
                    Cancel
                </button>
            ];
        }
    return (<li>
        <div className="input-group mb-3 input-group-lg">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input type='checkbox' checked={this.props.item.completed} 
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
        </li>);
    }
}