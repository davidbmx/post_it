import React, { Component } from 'react';
import axios from 'axios';

class PostIt extends Component {
    
    constructor() {
        super();
    }

    handleOnBlurDescription = async (ev) => {
        const content = ev.target.innerText;
        this.props.onBlur(this.props.id, content.trim());
    }

    render() {
        const { description } = this.props;
        return (
            <div className="col-md-4" style={{padding: '10px'}}>
                <div className="card text-white bg-primary">
                    <div className="card-header">
                        <button onClick={() => this.props.onClick(this.props.id)} className="btn btn-primary pull-right">x</button>
                    </div>
                    <div className="card-body">
                        <p className="card-text post_it_edit" contentEditable="true" onBlur={this.handleOnBlurDescription}>{description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostIt;
