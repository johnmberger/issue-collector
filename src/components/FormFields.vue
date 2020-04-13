<template>
  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col class="my-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Product Prioritization & Request Form
        </h1>

        <p class="subheading font-weight-regular">
          Please submit your request for work intake and a member of the product
          team will review your request.
        </p>
      </v-col>
      <v-col class="pa-2" cols="12">
        <v-form ref="form" v-model="valid">
          <v-text-field
            outlined
            v-model="name"
            :rules="rules"
            name="name"
            class="input-field"
            label="Your Name"
            required
          ></v-text-field>
          <v-menu
            ref="date"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                v-model="dateFormatted"
                :rules="rules"
                class="input-field"
                label="Due Date"
                hint="MM/DD/YYYY format"
                prepend-inner-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <v-textarea
            outlined
            v-model="request"
            :rules="rules"
            class="input-field"
            name="request"
            label="Your Request or Idea"
            required
          ></v-textarea>

          <v-select
            v-model="urgency"
            :items="urgencyItems"
            label="Urgency - Select One"
            outlined
            :rules="rules"
            required
          ></v-select>

          <v-btn
            :disabled="!valid || submitting"
            :loading="submitting"
            color="success"
            class="mr-4"
            @click="submit"
            block
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'FormFields',

  data: vm => ({
    valid: true,
    name: '',
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    request: '',
    urgency: '',
    urgencyItems: ['Just an idea', 'Low', 'Medium', 'High', 'Blocker'],
    rules: [v => !!v || 'Required']
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async submit() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('submitEmail', {
          name: this.name,
          date: this.dateFormatted,
          request: this.request,
          urgency: this.urgency
        });
        this.reset();
        this.resetValidation();
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  },
  computed: {
    ...mapState(['submitting']),
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  }
};
</script>
<style scoped lang="scss">
.urgency {
  p {
    padding: 8px;
    margin-bottom: 0px;
  }
  text-align: left;
}
.input-field {
  padding-top: 10px !important;
}
</style>
