<template>
  <div>
    <h2>Neuer Standort</h2>
    <v-form ref="form">
      <v-text-field
        v-model="newLocationForm.name"
        :counter="max"
        :rules="rules"
        label="Standortname"
        @input="handleInput()"
      />
      <v-text-field
        v-model="newLocationForm.comment"
        :counter="max"
        :rules="rules"
        label="Kommentar"
        @input="handleInput()"
      />
      <v-text-field
        v-model="newLocationForm.latitute"
        :counter="max"
        label="Breitengrad"
        @input="handleInput()"
      />
      <v-text-field
        v-model="newLocationForm.longitute"
        :counter="max"
        label="Längengrad"
        @input="handleInput()"
      />
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  prop: ['value'],
  data: () => ({
    newLocationForm: {},
    max: 10
  }),
  computed: {
    ...mapState({
      selectedLocation: (state) => state.locations.selectedLocation
    }),
    rules() {
      const rules = []

      if (this.max) {
        const rule = (v) =>
          (v || '').length <= this.max ||
          `A maximum of ${this.max} characters is allowed`

        rules.push(rule)
      }
      return rules
    }
  },
  methods: {
    handleInput(e) {
      console.log(e)
      this.$emit('input', this.newLocationForm)
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.selectedLocation) {
        this.newLocationForm = JSON.parse(JSON.stringify(this.selectedLocation))
      }
    })
  }
}
</script>
