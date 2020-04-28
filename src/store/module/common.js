//import { Message } from 'element-ui';

const common = {
    state: {
        token: ''
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        token: (state, token) => {
            state.token = token;
        }
    },
    actions: {}
};

export default common;
