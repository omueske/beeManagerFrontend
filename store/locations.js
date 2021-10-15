export const state = () => ({
  selectedLocation: Object,
  locationList: [{}],
  newLocation: {}
})

export const mutations = {
  SET_LOCATION_LIST(state, locations) {
    state.locationList = locations
  },

  SET_SELECTED_LOCATION(state, locationId) {
    if (locationId != null) {
      const loc = state.locationList.find(
        (location) => location._id === locationId
      )
      state.selectedLocation = loc
    } else {
      state.selectedLocation = {}
    }
  },

  ADD_LOCATION(state, loc) {
    state.locationList.push(loc)
  },

  DELETE_LOCATION(state, locId) {
    const delLocation = state.locationList.findIndex((x) => x._id === locId)
    state.locationList.splice(delLocation, 1)
  },

  UPDATE_LOCATION(state, payload) {
    const location = state.locationList.find((q) => q._id === payload._id)
    Object.assign(location, payload)
  }
}
export const actions = {
  async loadLocations({ commit }) {
    await this.$axios.get('/api/v1/locations').then((res) => {
      if (res.status === 200) {
        commit('SET_LOCATION_LIST', res.data.data)
      } else {
        console.log(res.status)
      }
    })
  },
  async addLocation({ commit }, payload) {
    await this.$axios.post('/api/v1/locations', payload).then((res) => {
      if (res.status === 201) {
        console.log('data', res.data)
        commit('ADD_LOCATION', res.data.data)
      } else {
        console.log(res.status)
      }
    })
  },
  async setSelectedLocation({ commit }, locationId) {
    commit('SET_SELECTED_LOCATION', locationId)
  },
  async deleteLocation({ commit }, locationId) {
    await this.$axios.delete(`/api/v1/locations/${locationId}`).then((res) => {
      if (res.status === 204) {
        commit('DELETE_LOCATION', locationId)
      }
    })
  },
  async updateLocation({ commit }, payload) {
    await this.$axios
      .patch(`/api/v1/locations/${payload._id}`, payload)
      .then((res) => {
        if (res.status == 201) {
          commit('UPDATE_LOCATION', payload)
        } else {
          console.log(res)
        }
      })
  }
}

export const getters = {
  getLocationById: (state) => (id) => {
    const location = state.locationList.find((x) => x._id === id)

    // In Loadingphase of the Page, at can be that the getter is called before the store is filled.
    // Then it will be come to an error
    // So lets check if hives are loaded... if not set an dummy value
    if (location == null || location._id == null) {
      return { number: 'not set' }
    } else {
      return location
    }
  }
}
