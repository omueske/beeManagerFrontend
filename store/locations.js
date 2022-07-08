import { defineStore } from 'pinia'

export const useLocationStore = defineStore({
  id: 'location-store',
  state: () => {
    return {
      locationList: [],
    }
  },
  actions: {
    async fetchLocations() {
      // First empty the array...
      this.locationList = []
      fetch("http://localhost:5000/api/v1/locations")
        .then((response) => response.json())
        .then(({ data }) => (this.locationList = data))
        .catch((error) => console.log(error));
    },
    async storeLocation(location) {
      console.log("Location", location)
      console.log(JSON.parse(JSON.stringify(location)))
      console.log("Location", location)
      fetch("http://localhost:5000/api/v1/locations", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
      })
        .then((response) => response.json())
        .then(({ data }) => (this.locationList.push(data)))
        .catch((error) => console.log(error));

     
    }
  },
  getters: {
     getHiveList: state => state.locationList.data,
  },
})
