import Vue from "vue"
import Vuex from "vuex"
import router from "./router"
import http from "./http-common";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            id: '',
            name: '',
            addr: '',
            tel: '',
            allergy: ''
        },
        isLogin: false,
        isLoginError: false,
    },
    mutations: {
        //로그인 성공
        loginSuccess(state, loginInfo){
            state.isLogin = true
            state.isLoginError = false
            state.userInfo.id = loginInfo.id
            state.userInfo.name = loginInfo.mname
            state.userInfo.addr = loginInfo.addr
            state.userInfo.tel = loginInfo.tel
            state.userInfo.allergy = loginInfo.allergy
            window.console.log(state.userInfo)
        },
        //로그인 실패
        loginError(state){
            state.isLogin = false
            state.isLoginError = true
        },
        logout(state){
            state.isLogin = false
            state.isLoginError = false
            state.userInfo = {
                id: '',
                name: '',
                addr: '',
                tel: '',
                allergy: ''
            }
            window.console.log("로그아웃")
        }
    },
    actions: {
        //로그인 시도
        login({commit}, loginObj){
            http
            .get("/memlist/" + loginObj.id)
            .then(response => {
                if(response.data.resvalue.password == loginObj.pw){
                    commit("loginSuccess", response.data.resvalue)
                    router.push("/").catch(err => {err})
                    alert(response.data.resvalue.mname +" 님이 로그인 하셨습니다.")
                }else{
                    commit("loginError")
                    alert("로그인 실패!!1")
                }
            })
            .catch(() => {
                commit("loginError")
                alert("로그인 실패!!1")
            })
        },
        logout({commit}){
            alert("로그아웃햇지")
            commit("logout")
            router.push("/").catch(err => {err})
        }
    }
})