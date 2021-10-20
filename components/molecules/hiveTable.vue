<template
  ><div>
    <v-data-table
      v-if="showHiveTable"
      :headers="headers"
      :items="hiveList"
      item-key="_id"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          class="ma-2"
          @click="
            updateH(item._id)
            $emit('save-btn', false)
          "
        >
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
    <hiveForm v-if="showHiveForm" v-model="updateHiveObj" />

    <v-btn
      v-if="showHiveForm"
      class="ma-2"
      :disabled="Object.keys(updateHiveObj).length == 0"
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
      v-if="showHiveForm"
      @click="
        showHiveTable = !showHiveTable
        showHiveForm = !showHiveForm
        $emit('save-btn', true)
        setSelectedHive({})
        updateHiveObj = {}
      "
    >
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
    updateH(id) {
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
