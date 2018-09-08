import React from 'react';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        };
    }
    render() {
    return (<li>
        <div className="input-group mb-3 input-group-lg">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input type='checkbox' checked={this.props.item.completed} 
                        onChange={this.props.toggleCompleted}
                        />
                </div>
            </div>
            <input type="text" value={this.props.item.text} 
                className="form-control" 
                />
        
            {this.props.item.saving ? ' saving... ':''}
            <div className='input-group-append'>
                <button className="btn btn-danger" onClick={()=>{
                    this.props.removeItem(item)
                }}>
                    <i className="glyphicon glyphicon-remove"></i>
                </button>
            </div>
        </div>
        </li>);
    }
}