import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function storeLocalStore(state) {
  window.sessionStorage.setItem("userMsg", JSON.stringify(state));
}

const state = {
  //存储用户权限信息，初始时为空
  info: {
    roles: 'visitor',
    userId: '',
    userHead: ''
  },
  course: {
    courseId: '',
    courseName: ''
  }

};

const getters = {
  getRoles: state => state.info.roles,
  getUserId: state => state.info.userId,
  // getUserHead: state => state.info.userHead,
  getInfo: state => state.info,
  getcourseId: state => state.course.courseId,
  getcourseName: state => state.course.courseName,
};

const mutations = {
  //添加用户权限，如果存在，不添加
  storeRoles(state, roles) {
    state.info.roles = roles;
    storeLocalStore(state);
    console.log('get');
    console.log(this.state.info.roles)
  },
  storeUserId(state, id) {
    state.info.userId = id;
    storeLocalStore(state);
    console.log(state.info.userId)
  },
  // storeUserHead(state, head) {
  //   state.info.userHead = head;
  //   storeLocalStore(state);
  //   console.log(state.info.userHead)
  // },
  storecourseId(state, courseid) {
    state.course.courseId = courseid;
    storeLocalStore(state);
  },
  storecourseName(state, coursename) {
    state.course.courseName = coursename;
    storeLocalStore(state);
  },
};

const actions = {
  storeRoles: ({commit}, {roles}) => {
    commit('storeRoles', {roles});
  },
  storeUserId: ({commit}, {id}) => {
    commit('storeUserId', {id});
  },
  storeUserHead: ({commit}, {head}) => {
    commit('storeUserHead', {head});
  },
  storecourseId: ({commit}, {courseid}) => {
    commit('storecourseId', {courseid});
  },
  storecourseName: ({commit}, {coursename}) => {
    commit('storecourseName', {coursename});
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
