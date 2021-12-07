import xhr from '../config/httpConfig';

//获取菜单列表数据
export const menuList = {
    menulist() {
        return xhr.request({
            url: '/menulist',
            method: 'get',
        })
    }
}