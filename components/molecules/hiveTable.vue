<template
  ><div>
    <v-data-table :headers="headers" :items="hiveList" item-key="_id">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="ma-2">
          <v-icon dark>
            mdi-wrench
          </v-icon>
        </v-btn>
        <v-btn class="ma-2" color="red" @click="deleteHive(item._id)">
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-btn class="ma-2" color="success">
      Speichern
    </v-btn>
    <v-btn class="ma-2">
      Abbrechen
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hiveForm from '~/components/molecules/hiveForm.vue'
export default {
  prop: ['value'],
  components: {
    hiveForm
  },
  computed: {
    ...mapState({
      hiveList: (state) => state.hives.hiveList,
      selectedHive: (state) => state.hives.selectedHive
    })
  },
  data: () => ({
    showHiveTable: true,
    showHiveForm: false,
    updateHiveObj: {},

    headers: [
      {
        text: 'HiveId',
        value: '_id',
        align: 'left',
        sortable: false
      },
      { text: 'Name', value: 'name' },
      { text: 'Königinnen', value: 'queens' },
      { text: 'Kommentar', value: 'comment' },
      { text: 'Aktionen', value: 'actions' }
    ]
  }),

  methods: {
    ...mapActions('hives', ['deleteHive', 'setSelectedHive', 'updateHive']),
    updateLoc(id) {
      console.log('Button clicked with id ' + id)
      this.setSelectedHive(id)
      this.showHiveForm = true
      this.showHiveTable = false
    },
    saveHive() {
      this.updateHive(this.updateHiveObj)
      this.showHiveForm = false
      this.showHiveTable = true
      this.setSelectedHive({})
    }
  }
}
</script>
