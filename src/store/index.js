import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



const stroe = new Vuex.Store({
    state: {  //用来定义共享数据   this.$store.state.counter
        counter: 100,
    },
    mutations: {  //用来定义对共享数据修改方法  在这里面定义方法 都有一个默认参数 默认参数会将状态对象传递给自定义方法   this.$store.commit('方法名')
        
    }
});
export default stroe;