<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Völker</h1>
        <hiveTable v-if="showHiveTable" @save-btn="toggleNewHiveButton" />
        <v-btn
          class="ma-2"
          v-if="showNewHiveButton"
          @click="
            showHiveForm = true
            showHiveTable = false
            showNewHiveButton = false
          "
        >
          &nbsp;Neues Volk
        </v-btn>
        <div v-if="showHiveForm">
          <hiveForm v-model="hive" />
          <v-btn
            class="ma-2"
            color="success"
            @click="
              saveHive()
              $emit('save-btn', true)
            "
          >
            Speichern
          </v-btn>
          <v-btn
            class="ma-2"
            @click="
              showHiveForm = !showHiveForm
              showHiveTable = !showHiveTable
              hive = {}
              showNewHiveButton = !showNewHiveButton
            "
          >
            Abbrechen
          </v-btn>
        </div>
        {{ hive }}
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import hiveTable from '~/components/molecules/hiveTable.vue'
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
    showNewHiveButton: true,
    hive: {}
  }),
  methods: {
    ...mapActions('hives', ['addHive']),

    toggleNewHiveButton(value) {
      this.showNewHiveButton = value
    },
    saveHive() {
      this.addHive(this.hive)
      this.showHiveForm = false
      this.showNewHiveButton = true
      this.showHiveTable = true
    }
  }
}
</script>
