<template
  ><div>
    <v-data-table
      v-if="showLocationTable"
      :headers="headers"
      :items="locationList"
      item-key="_id"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          class="ma-2"
          @click="
            updateLoc(item._id)
            $emit('save-btn', false)
          "
        >
          <v-icon dark>
            mdi-wrench
          </v-icon>
        </v-btn>
        <v-btn class="ma-2" color="red" @click="deleteLocation(item._id)">
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <newLocationForm v-if="showLocationForm" v-model="updateLocationObj" />

    <v-btn
      v-if="showLocationForm"
      :disabled="Object.keys(updateLocationObj).length == 0"
      class="ma-2"
      color="success"
      @click="
        saveLocation()
        $emit('save-btn', true)
      "
    >
      Speichern
    </v-btn>
    <v-btn
      v-if="showLocationForm"
      class="ma-2"
      @click="
        showLocationTable = !showLocationTable
        showLocationForm = !showLocationForm
        $emit('save-btn', true)
        setSelectedLocation({})
        updateLocationObj = {}
      "
    >
      Abbrechen
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import newLocationForm from '~/components/molecules/newLocationForm.vue'
export default {
  prop: ['value'],
  components: {
    newLocationForm
  },
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationList,
      selectedLocation: (state) => state.locations.selectedLocation
    })
  },
  data: () => ({
    showLocationTable: true,
    showLocationForm: false,
    updateLocationObj: {},

    headers: [
      {
        text: 'LocationId',
        value: '_id',
        align: 'left',
        sortable: false
      },
      { text: 'Name', value: 'name' },
      { text: 'Longitute', value: 'longitute' },
      { text: 'Latitute', value: 'latitute' },
      { text: 'Kommentar', value: 'comment' },
      { text: 'Aktionen', value: 'actions' }
    ]
  }),

  methods: {
    ...mapActions('locations', [
      'deleteLocation',
      'setSelectedLocation',
      'updateLocation'
    ]),
    updateLoc(id) {
      console.log('Button clicked with id ' + id)
      this.setSelectedLocation(id)
      this.showLocationForm = true
      this.showLocationTable = false
    },
    saveLocation() {
      this.updateLocation(this.updateLocationObj)
      this.showLocationForm = false
      this.showLocationTable = true
      this.setSelectedLocation({})
    }
  }
}
</script>
