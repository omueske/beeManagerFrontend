<template>
  <div>
    <h2>{{ headline }}</h2>
    <v-form ref="form">
      <v-select
        :items="locationList"
        v-model="hive.locationId"
        label="Standort"
        item-text="name"
        item-value="_id"
        dense
      />
      <v-select
        :items="numbers"
        v-model="hive.number"
        label="Nummer"
        dense
        @change="handleInput()"
      />
      <v-text-field v-model="hive.name" label="Name" @input="handleInput()" />
      <v-select
        :items="stati"
        item-text="name"
        item-value="status"
        v-model="hive.status"
        label="Status"
        @change="handleInput()"
        dense
      />
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
        @change="handleInput()"
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
    headline: 'Neues Volk',
    hive: {},
    queens: [
      { _id: '12ghfgkjhzf', name: 'Test Queen1' },
      { _id: 'hgjhgjhfhfzt', name: 'Test Queen2' },
      { _id: 'gzjguzfztfzft', name: 'Test Queen3' }
    ],
    stati: [
      { status: 'active', name: 'aktiv' },
      { status: 'inactive', name: 'inaktiv' },
      { status: 'empty', name: 'leer' },
      { status: 'dead', name: 'Tot' }
    ],
    numbers: Array.from(Array(100).keys())
  }),
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationList,
      selectedHive: (state) => state.hives.selectedHive
    })
  },
  methods: {
    handleInput(e) {
      console.log(e)
      this.$emit('input', this.hive)
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.selectedHive) {
        this.headline = 'Volk bearbeiten'
        console.log('SelectedHive', this.selectedHive)
        this.hive = JSON.parse(JSON.stringify(this.selectedHive))
        console.log('Hive', this.hive)
      }
    })
  }
}
</script>
