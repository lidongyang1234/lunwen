import axios from 'axios';
import {STATUS_OK, STATUS, TIMEOUT, baseURL} from './config';

const xhr = axios.create({
    baseURL: 'http://192.168.98.1:8070',
    //baseURL: 'http://192.168.2.215:8070',
    //baseURL: 'http://192.168.31.159:8070',
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
    data: {},

    // `status` 来自服务器响应的 HTTP 状态码
    status: 200,

    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: 'OK',

    // `headers` 服务器响应的头
    headers: {},

    // `config` 是为请求提供的配置信息
    config: {},
    // 'request'
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: {}
});

export default xhr;