
<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="location.name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="location.longitude"
      label="Längengrad"
      required
    ></v-text-field>

    <v-text-field
      v-model="location.latitude"
      label="Breitengrad"
      required
    ></v-text-field>

    <v-text-field
      v-model="location.comment"
      label="Kommentar"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="save()"
    >
      Speichern
    </v-btn>
  </v-form>
  {{ location }}
</template>

<script>
import { useLocationStore } from "~/store/locations";

export default defineComponent({
  setup() {
    const locationStore = useLocationStore();
    locationStore.fetchLocations();

    return { locationStore };
  },
  data: () => ({
    valid: true,
    location: {
        name: '',
        latitude: '',
        longitude: '',
        comment: ''
    },
    nameRules: [
        v => !!v || 'Name wird benötigt',
       // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      //...mapActions(useLocationStore, ['save']),
      save () {
        console.log(this.location)
        //locationStore.save(location)
        this.locationStore.storeLocation(this.location)
        this.reset()
      }
    },
});
</script>