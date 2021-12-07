import xhr from '../config/httpConfig';

//查询课程信息
export const searchcourse = {
    search(data) {
        return xhr.request({
            url: '/course/search',
            method: 'get',
            params: data,
        })
    }
}

//添加课程信息
export const addcourse = {
    add(data) {
        return xhr.request({
            url: '/course/add',
            method: 'post',
            data,
        })
    }
}

//删除课程信息
export const removecourse = {
    remove(id) {
        return xhr.request({
            url: '/course/remove?id=' + id,
            method: 'get',
        })
    }
}

//修改课程信息
export const updatacourse = {
    updata(data) {
        return xhr.request({
            url: '/course/updata',
            method: 'post',
            data,
        })
    }
}

//获取总条数
export const countacourse = {
    count() {
        return xhr.request({
            url: '/course/count',
            method: 'get',
        })
    }
}

