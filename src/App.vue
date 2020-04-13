<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/cardlytics_logo.svg')"
          transition="scale-transition"
          height="40"
        />
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <FormFields />
    </v-content>
  </v-app>
</template>

<script>
import FormFields from './components/FormFields';

export default {
  name: 'App',

  components: {
    FormFields
  }
};
</script>

<style>
body {
  background-color: ghostwhite;
}
</style>
