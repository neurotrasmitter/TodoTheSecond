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
    language: "Рус",
  },
  getters: {},
  mutations: {
    // setUp vuex
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
    resetUserInfoMutation(state) {
      // eslint-disable-next-line no-unused-vars
      state = {
        userName: "",
        userId: "",
        groups: [],
        records: {},
        language: "Рус",
      };
    },

    // Record
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

    //Record Store
    changeRecordStorageNameMutation(state, { oldPath, newPath }) {
      state.records[newPath] = state.records[oldPath];
      delete state.records[oldPath];
    },
    deleteExistingStorageMutation(state, payload) {
      console.log(state.records[payload.path]);
      delete state.records[payload.path];
    },

    //Group
    addNewGroupMutation(state, { id, name, path }) {
      state.groups.push({ id, userId: state.userId, name, path });
      Vue.set(state.records, path, []);
    },
    changeExistingGroupMutation(state, { name, newPath, oldPath }) {
      const index = getGroupIndex(state.groups, oldPath);
      const group = state.groups[index];
      group.name = name;
      group.path = newPath;
    },
    deleteExistingGroupMutation(state, payload) {
      const index = getGroupIndex(state.groups, payload.path);
      state.groups.splice(index, 1);
    },

    //lang
    changeLanguage(state, { language }) {
      state.language = language;
    },
  },

  actions: {
    // setUp vuex
    setUserInfoAction({ commit }, payload) {
      commit("setUserIdMutation", payload);
      commit("setUserNameMutation", payload);
    },

    // Record
    async addNewRecordAction({ commit }, payload) {
      await axios.post("http://localhost:3004/records", payload.record);
      commit("addNewRecordMutation", payload);
    },
    async changeRecordTextAction({ commit }, payload) {
      await axios.put(
        `http://localhost:3004/records/${payload.record.id}`,
        payload.record
      );
      commit("changeRecordTextMutation", payload);
    },
    async changeRecordStatusAction({ commit }, payload) {
      await axios.put(
        `http://localhost:3004/records/${payload.record.id}`,
        payload.record
      );
      commit("changeRecordStatusMutation", payload);
    },
    async deleteRecordAction({ commit }, payload) {
      await axios.delete(`http://localhost:3004/records/${payload.record.id}`);
      commit("deleteRecordMutation", payload);
    },

    // Group
    async addNewGroupAction(context, payload) {
      await axios.post("http://localhost:3004/groups", {
        id: payload.id,
        userId: context.state.userId,
        name: payload.name,
        path: payload.path,
      });
      context.commit("addNewGroupMutation", payload);
    },
    async changeExistingGroupAction({ commit, state }, payload) {
      const group = {
        id: payload.id,
        userId: state.userId,
        name: payload.name,
        path: payload.newPath,
      };
      await axios.put(`http://localhost:3004/groups/${group.id}`, group);
      commit("changeExistingGroupMutation", payload);
      commit("changeRecordStorageNameMutation", payload);
    },
    async deleteExistingGroupAction({ commit }, payload) {
      await axios.delete(`http://localhost:3004/groups/${payload.id}`);
      commit("deleteExistingGroupMutation", payload);
      commit("deleteExistingStorageMutation", payload);
    },
  },
  modules: {},
});
