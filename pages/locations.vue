<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <!-- <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5" /> -->
        <h1>Standorte</h1>
        {{ showNewLocationButton }}
        <locationTable
          v-if="showLocationTable"
          v-model="showNewLocationButton"
          @save-btn="toggleNewLocationButton"
        />
        <v-btn
          class="ma-2"
          v-if="showNewLocationButton"
          @click="
            showNewLocationForm = !showNewLocationForm
            showLocationTable = !showLocationTable
            showNewLocationButton = !showNewLocationButton
          "
        >
          &nbsp;Neuer Standort
        </v-btn>
        <div v-if="showNewLocationForm">
          <newLocationForm v-model="newLocation" />
          {{ newLocation }}
          <v-btn class="ma-2" color="success" @click="saveLocation()">
            Speichern
          </v-btn>
          <v-btn
            class="ma-2"
            @click="
              showNewLocationForm = !showNewLocationForm
              showLocationTable = !showLocationTable
              newLocation = {}
              showNewLocationButton = !showNewLocationButton
            "
          >
            Abbrechen
          </v-btn>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

//
<script>
import locationTable from '~/components/molecules/locationTable.vue'
import newLocationForm from '~/components/molecules/newLocationForm.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    locationTable,
    newLocationForm
  },
  data: () => ({
    showNewLocationForm: false,
    showLocationTable: true,
    showNewLocationButton: true,
    newLocation: {}
  }),
  methods: {
    ...mapActions('locations', ['addLocation']),
    saveLocation() {
      this.addLocation(this.newLocation)
      this.showNewLocationForm = false
      this.showLocationTable = true
    },
    toggleNewLocationButton(value) {
      this.showNewLocationButton = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
