<template>
  <div>
    <TheHeader title="Standorte"/>
    <location />
  </div>
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