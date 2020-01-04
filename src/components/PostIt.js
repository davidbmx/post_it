import React, { Component } from 'react';
import axios from 'axios';

class PostIt extends Component {
    
    constructor() {
        super();
    }

    handleOnBlurTitle = async (ev) => {
        let content = ev.target.innerText;
        if (content == '') {
            content = 'New Post It';
            ev.target.innerText = content;
        }
        try {
            const response = await axios.patch(`/post_it/${this.props.id}/`, {title: content.trim()});
        } catch (err) {
            console.log(err);
        }
    }

    handleOnFocusTitle = ev => {
        if (ev.target.innerText == 'New Post It') {
            ev.target.innerText = "";
        }
    }

    handleOnBlurDescription = async (ev) => {
        const content = ev.target.innerText;
        try {
            const response = await axios.patch(`/post_it/${this.props.id}/`, {description: content.trim()});
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const {title, description} = this.props;
        return (
            <div className="card text-white bg-primary mb-3">
                <div
                    className="card-header"
                    contentEditable="true"
                    onBlur={this.handleOnBlurTitle}
                    onFocus={this.handleOnFocusTitle}
                >{ title }</div>
                <div className="card-body">
                    <p className="card-text post_it_edit" contentEditable="true" onBlur={this.handleOnBlurDescription}>{description}</p>
                </div>
            </div>
        )
    }
}

export default PostIt;
