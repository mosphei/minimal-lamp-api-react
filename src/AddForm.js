import React from 'react';

export default class AddForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            newItemText:''
        };
        this.handleTextInput.bind(this);
    }
    handleTextInput(event) {
        this.setState({
            newItemText:event.target.value
        });
    }
    handleSubmit(evt) {
        evt.preventDefault();
        const doc = {
            text:this.state.newItemText,
            _id:this.state.newItemText.replace(/[^a-zA-Z0-9_-]/g,'')
        };
        //console.log('data',data);
        this.props.saveItem(doc);
        this.setState({newItemText:''});
    }
    render() {
        const buttonClass='btn btn-' + (this.state.newItemText ? 'primary' : 'default'); 
        return (<form className="form-inline" onSubmit={(evt)=>{this.handleSubmit(evt);}}>
            <input type="text" value={this.state.newItemText} onChange={(evt)=>{this.handleTextInput(evt)}}
                className="form-control" placeholder='New Item'
            />
            <button className={buttonClass} >
                Add New Item
            </button>
        </form>);
    }
}