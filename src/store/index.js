import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import getRecordIndex from "@/helpers/getRecordIndex";
import getGroupIndex from "@/helpers/getGroupIndex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userId: "",
    groups: [],
    records: {},
  },
  getters: {},
  mutations: {
    setUserNameMutation(state, payload) {
      state.userName = payload.name;
    },

    setUserIdMutation(state, payload) {
      state.userId = payload.id;
    },

    setGroupsMutation(state, payload) {
      state.groups = payload.groups;
    },

    setRecordsMutation(state, payload) {
      state.records = payload.records;
    },

    addNewRecordMutation(state, payload) {
      state.records[payload.storage].push(payload.record);
    },

    changeRecordTextMutation(state, payload) {
      payload.record.text = payload.text;
    },

    changeRecordStatusMutation(state, payload) {
      payload.record.checked = !payload.record.checked;
      if (payload.record.checked === true) {
        payload.record.completionTime = Date.now();
      }
    },
    deleteRecordMutation(state, payload) {
      let index = getRecordIndex(
        state.records[payload.storage],
        payload.record
      );
      state.records[payload.storage].splice(index, 1);
    },
    resetUserInfoMutation(state) {
      // eslint-disable-next-line no-unused-vars
      state = { userName: "", userId: "", groups: [], records: {} };
    },
    addNewGroupMutation(state, { id, name, path }) {
      state.groups.push({ id, userId: state.userId, name, path });
      state.records[path.slice(1)] = [];
    },
    changeExistingGroupMutation(state, { name, path }) {
      const index = getGroupIndex(state.groups, path);
      const group = state.groups[index];
      group.name = name;
      group.path = path;
    },
  },
  actions: {
    setUserInfoAction({ commit }, payload) {
      commit("setUserIdMutation", payload);
      commit("setUserNameMutation", payload);
    },
    async addNewRecordAction({ commit }, payload) {
      commit("addNewRecordMutation", payload);
      await axios.post("http://localhost:3000/records", payload.record);
    },
    async changeRecordTextAction({ commit }, payload) {
      commit("changeRecordTextMutation", payload);
      await axios.put(
        `http://localhost:3000/records/${payload.record.id}`,
        payload.record
      );
    },
    async changeRecordStatusAction({ commit }, payload) {
      commit("changeRecordStatusMutation", payload);
      await axios.put(
        `http://localhost:3000/records/${payload.record.id}`,
        payload.record
      );
    },
    async deleteRecordAction({ commit }, payload) {
      commit("deleteRecordMutation", payload);
      await axios.delete(`http://localhost:3000/records/${payload.record.id}`);
    },
    async addNewGroupAction(context, payload) {
      context.commit("addNewGroupMutation", payload);
      await axios.post("http://localhost:3000/groups", {
        id: payload.id,
        userId: context.state.userId,
        name: payload.name,
        path: payload.path,
      });
    },
    async changeExistingGroupAction({ commit, state }, payload) {
      commit("changeExistingGroupMutation", payload);
      const index = getGroupIndex(state.groups, payload.path);
      const group = state.groups[index];
      group.path = payload.path;
      group.name = payload.name;
      await axios.put(`http://localhost:3000/groups/${group.id}`, group);
    },
  },
  modules: {},
});
