import React, { Component } from 'react';
import axios from 'axios';
import PostIt from './PostIt';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            post_it: []
        };
    }

    componentDidMount() {
        Promise.all([
            axios.get('/post_it/'),
            axios.get('/categories/')
        ])
        .then(response => {
            this.setState({
                post_it: response[0].data,
                categories: response[1].data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    renderByCategory = (categoryId) => {
        const postIt = this.state.post_it.filter(item => item.category === categoryId);
        return postIt.map(item => (
            <PostIt key={item.id} {...item} />
        ));
    };

    handleOnClick = async () => {
        try {
            const response = await axios.post('/post_it/', {title: 'New Post It', description: '', category: 1});
            this.setState(state => {
                const post_it = [response.data, ...state.post_it];
                return {post_it};
            });
        } catch (err) {
            console.log(err);
        }
        
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleOnClick}>New</button>
                <div className="row">
                    {
                        this.state.categories.map(category => (
                            <div className="col-md-4" key={category.id}>
                                <h1>{category.title}</h1>
                                { this.renderByCategory(category.id) }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard;