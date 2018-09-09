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
            _id:this.state.newItemText.replace(/[^a-zA-Z0-9_-]/g,''),
            parentId:this.props.parentId
        };
        //console.log('data',data);
        this.props.saveItem(doc);
        this.setState({newItemText:''});
    }
    handleKeyDown(e){
        if (e.keyCode === 27) {
            //escape button
            this.handleCancel(e);
        }
        if (e.keyCode === 13) {
            //enter button
            this.handleSubmit(e);
        }
    }
    handleCancel(e) {
        e.preventDefault();
        this.setState({newItemText:''});
    }
    render() {
        const buttonClass='btn btn-' + (this.state.newItemText ? 'primary' : 'outline-default'); 
        return (<form onSubmit={(evt)=>{this.handleSubmit(evt);}} className="addForm">
            <div className="input-group mb-3 input-group-lg">
                <input type="text" value={this.state.newItemText} 
                    onChange={(evt)=>{this.handleTextInput(evt)}}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    className="form-control" placeholder='New Item'
                />
                <div className='input-group-append'>
                    <button className={buttonClass}
                        onClick={(evt)=>{this.handleSubmit(evt);}}
                        >
                        Save
                    </button>
                    <button className="btn btn-danger" onClick={(e)=>{
                        this.handleCancel(e)
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>);
    }
}