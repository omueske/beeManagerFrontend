<template>
  <div>
    <h2>Neues Volk</h2>
    <v-form ref="form">
      <v-select
        :items="locationList"
        v-model="hive.locationId"
        label="Standort"
        item-text="name"
        item-value="_id"
        dense
      />
      <v-select :items="numbers" v-model="hive.number" label="Nummer" dense />
      <v-text-field v-model="hive.name" label="Name" @input="handleInput()" />
      <v-select
        v-model="hive.queens"
        :items="queens"
        :menu-props="{ maxHeight: '400' }"
        item-text="name"
        item-value="_id"
        label="Königin(en)"
        multiple
        chips
        persistent-hint
      />
      <v-text-field
        v-model="hive.comment"
        label="Kommentar"
        @input="handleInput()"
      />
    </v-form>
    {{ hive }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  prop: ['value'],
  data: () => ({
    hive: {},
    queens: [
      { _id: '12ghfgkjhzf', name: 'Test Queen1' },
      { _id: 'hgjhgjhfhfzt', name: 'Test Queen2' },
      { _id: 'gzjguzfztfzft', name: 'Test Queen3' }
    ],
    numbers: Array.from(Array(100).keys())
  }),
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationList
    })
  },
  methods: {
    handleInput(e) {
      console.log(e)
      this.$emit('input', this.hive)
    }
  }
  // mounted() {
  //   this.$nextTick(function() {
  //     if (this.selectedLocation) {
  //       this.newLocationForm = JSON.parse(JSON.stringify(this.selectedLocation))
  //     }
  //   })
  // }
}
</script>
