import request from '../utils/request';

// post
export function postInfo(data) {
    return request({
        url: 'xxx',
        method: 'post',
        type: 'baseUrl',
        data
    });
}

// get
export function getInfo(params) {
    return request({
        url: 'xxx',
        method: 'get',
        type: 'baseUrl',
        params
    });
}
