<template>
  <div>Anzahl Locations: {{ locationStore.locationList.length }}</div>
    <v-btn @click="toggleShowNewLocation()" v-if="!showNewLocation">Neuer Standort</v-btn>
    <v-btn @click="toggleShowNewLocation()" color="error" v-if="showNewLocation">Abbrechen</v-btn>
  <NewLocation v-if="showNewLocation" />
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Längengrad
        </th>
        <th class="text-left">
          Breitengrad
        </th>
        <th class="text-left">
          Kommentar
        </th>
        <th class="text-left">
          Aktions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in locationStore.locationList"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.longitude }}</td>
        <td>{{ item.latitude }}</td>
        <td>{{ item.comment }}</td>
        <td><v-btn
        icon="mdi-pencil"
        color="secondary"
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        color="red"
      ></v-btn></td>
      </tr>
    </tbody>
  </v-table>

  <div>{{ locationStore.locationList }}</div>
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
    showNewLocation: false,
  }),
  
  methods: {
    toggleShowNewLocation () {
      this.showNewLocation = !this.showNewLocation
    }
  },
});
</script>
