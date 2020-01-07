import axios from 'axios';
import LoginService from './LoginService';

const PostItService = {};

PostItService.getData = () => {
    return Promise.all([
        axios.get('/post_it/'),
        axios.get('/categories/')
    ])
    .then(response => {
        return {
            post_it: response[0].data,
            categories: response[1].data
        }
    })
    .catch(err => {
        const response = {
            post_it: [],
            categories: []
        };
        LoginService.validateAuth(401);
        return response;
    });
}
PostItService.delete = async (id) => {
    try {
        await axios.delete(`/post_it/${id}/`);
    } catch (err) {
        console.log(err);
    }
}

PostItService.patch = async (id, description) => {
    try {
        const response = await axios.patch(`/post_it/${id}/`, {description});
        return response;
    } catch (err) {
        console.log(err);
    }
};

PostItService.addCategory = async (title) => {
    try { 
        const response = await axios.post(`/categories/`, {title});
        return response;
    } catch (err) {
        console.log(err)
    }
};

PostItService.deleteCategory = async (id) => {
    try { 
        await axios.delete(`/categories/${id}/`);
    } catch (err) {
        console.log(err)
    }
}

export default PostItService;
