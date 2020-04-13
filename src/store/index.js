import Vue from 'vue';
import Vuex from 'vuex';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.VUE_APP_SENDGRID_API_KEY);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    submitting: false,
    error: false
  },
  mutations: {
    setSubmit(state, status) {
      state.submitting = status;
    }
  },
  actions: {
    async submitEmail({ commit }, { name, dateFormatted, request, urgency }) {
      commit('setSubmit', true);
      try {
        const msg = {
          to: 'Salesforcerequest@cardlytics.com',
          from: 'Salesforcerequest@cardlytics.com',
          subject: 'Product Request Form Submittion',
          html: ` \
          <p>Name: <strong>${name}</strong></p> \
          <p>Due Date: <strong>${dateFormatted}</strong></p> \
          <p>Idea or Suggestion: <strong>${request}</strong></p> \
          <p>Urgency: <strong>${urgency}</strong></p> \
        `
        };
        await sgMail.send(msg);
      } catch (e) {
        console.log(e);
      } finally {
        commit('setSubmit', false);
      }
    }
  }
});
