import React, { Component } from 'react';
import axios from 'axios';
import PostIt from './PostIt';
import Categories from './Categories';
import PostItService from '../services/PostItService';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            post_it: [],
            categoryId: -1
        };
    }

    componentDidMount() {
        PostItService.getData().then(data => {
            this.setState({
                categories: data.categories,
                post_it: data.post_it,
                categoryId: data.categories.length > 0 ? data.categories[0].id : -1
            });
        });
    }

    handleOnClickDelete = async (id) => {
        await PostItService.delete(id).then();
        this.setState(state => {
            let post_it = [...state.post_it];
            const updated = post_it.filter(item => item.id !== id);
            return {post_it: updated};
        });
    }

    renderByCategory = (categoryId) => {
        const postIt = this.state.post_it.filter(item => item.category === categoryId);
        return postIt.map(item => (
            <PostIt key={item.id} {...item} onClick={this.handleOnClickDelete} onBlur={this.handleOnBlurPostIt}/>
        ));
    };

    handleOnClick = async () => {
        try {
            const response = await axios.post('/post_it/', {title: 'New Post It', description: '', category: this.state.categoryId});
            this.setState(state => {
                const post_it = [response.data, ...state.post_it];
                return {post_it};
            });
        } catch (err) {
            console.log(err);
        }
        
    }

    handleOnClickCategory = (id) => {
        this.setState({
            categoryId: id
        });
    }

    handleOnBlurPostIt = (id, description) => {
        PostItService.patch(id, description).then(data => {
            this.setState(state => {
                const post_it = [...state.post_it];
                const index = post_it.findIndex(item => item.id === id);
                post_it[index].description = description;
                return [post_it];
            });
        });
    }

    handleAddCategory = (title) => {
        PostItService.addCategory(title).then(data => {
            this.setState(state => {
                const categories = [...state.categories, data.data];
                return {categories};    
            });
        });
    }

    handleDeleteCategory = async () => {
        await PostItService.deleteCategory(this.state.categoryId).then();
        this.setState(state => {
            let categories = [...state.categories];
            const updated = categories.filter(item => item.id !== this.state.categoryId);
            return {
                categories: updated,
                categoryId: state.categories[0].id
            };
        });
    }

    render() {
        return (
            <div style={{marginLeft: '20px', marginRight: '20px'}}>
                <br />
                <Categories
                    categories={this.state.categories}
                    onClick={this.handleOnClickCategory}
                    addCategory={this.handleAddCategory}
                />

                <button className="btn btn-primary" onClick={this.handleOnClick}>New Post It</button>
                { ' ' }
                <button className="btn btn-danger" onClick={this.handleDeleteCategory}>Delete category</button>
                <div className="row">
                    { this.renderByCategory(this.state.categoryId) }
                </div>
            </div>
        )
    }
}

export default Dashboard;