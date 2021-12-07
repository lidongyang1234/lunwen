import xhr from '../config/httpConfig';

//查询学生信息
export const searchstudent = {
    search(data) {
        return xhr.request({
            url: '/studentsinformation/search',
            method: 'get',
            params: data,
        })
    }
}

//添加学生信息
export const addstudent = {
    add(data) {
        return xhr.request({
            url: '/studentsinformation/add',
            method: 'post',
            data,
        })
    }
}

//修改学生信息
export const updatastudent = {
    updata(data) {
        return xhr.request({
            url: '/studentsinformation/updata',
            method: 'post',
            data,
        })
    }
}

//删除学生信息
export const removestudent = {
    remove(id) {
        return xhr.request({
            url: '/studentsinformation/remove?id=' + id,
            method: 'get',
        })
    }
}

//获取总条数
export const countstudent = {
    count() {
        return xhr.request({
            url: '/studentsinformation/count',
            method: 'get',
        })
    }
}