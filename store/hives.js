import { defineStore } from 'pinia'

export const useHiveStore = defineStore({
  id: 'hive-store',
  state: () => {
    return {
      hiveList: [],
    }
  },
  actions: {
      async fetchHives() {
        // First empty the array...
        this.hiveList = []
        fetch("http://localhost:5000/api/v1/hives")
          .then((response) => response.json())
          .then(({ data }) => (this.hiveList = data))
          .catch((error) => console.log(error));
    }
  },
  getters: {
     getHiveList: state => state.hiveList.data,
  },
})
