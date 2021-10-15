<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Völker</h1>
        <hiveTable v-if="showHiveTable" @save-btn="toggleNewLocationButton" />
        <v-btn class="ma-2" @click="showHiveForm = true">
          &nbsp;Neues Volk
        </v-btn>
        <hiveForm v-model="hive" v-if="showHiveForm" />
        <v-btn
          v-if="showHiveForm"
          class="ma-2"
          color="success"
          @click="saveHive()"
        >
          Speichern
        </v-btn>
        {{ hive }}
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import hiveTable from '~/components/molecules/HiveTable.vue'
import hiveForm from '~/components/molecules/hiveForm.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    hiveForm,
    hiveTable
  },
  data: () => ({
    showHiveTable: true,
    showHiveForm: false,
    hive: {}
  }),
  methods: {
    ...mapActions('hives', ['addHive']),

    toggleNewHiveButton(value) {
      this.showNewHiveButton = value
    },
    saveHive() {
      this.addHive(this.hive)
      this.showHiveForm = true
      this.toggleNewHiveButton(true)
    }
  }
}
</script>
