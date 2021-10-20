export const state = () => ({
  selectedHive: Object,
  hiveList: [{}],
  newHive: {},
  components: {
    hiveTable: true,
    hiveForm: false,
    newHiveButton: true,
  }
})

export const mutations = {
  SET_HIVE_LIST(state, hives) {
    state.hiveList = hives
  },

  SET_SELECTED_HIVE(state, hiveId) {
    if (hiveId != null) {
      const selectedHive = state.hiveList.find((hive) => hive._id === hiveId)
      state.selectedHive = selectedHive
    } else {
      state.selectedHive = {}
    }
  },

  ADD_HIVE(state, hive) {
    state.hiveList.push(hive)
  },

  DELETE_HIVE(state, hiveId) {
    console.log("DELETE", hiveId)
    const hive = state.hiveList.findIndex((x) => x._id === hiveId)
    state.hiveList.splice(hive, 1)
  },

  UPDATE_HIVE(state, hive) {
    const h = state.hiveList.find((q) => q._id === hive._id)
    Object.assign(h, hive)
  }
}
export const actions = {
  async loadHives({ commit }) {
    await this.$axios.get('/api/v1/hives').then((res) => {
      if (res.status === 200) {
        commit('SET_HIVE_LIST', res.data.data)
      } else {
        console.log(res.status)
      }
    })
  },
  async addHive({ commit }, payload) {
    await this.$axios.post('/api/v1/hives', payload).then((res) => {
      if (res.status === 201) {
        console.log('Payload', JSON.stringify(payload))
        console.log('data', res.data)
        commit('ADD_HIVE', res.data.data)
      } else {
        console.log(res.status)
      }
    })
  },
  async setSelectedHive({ commit }, hiveId) {
    commit('SET_SELECTED_HIVE', hiveId)
  },
  async deleteHive({ commit }, hiveId) {
    await this.$axios.delete(`/api/v1/hives/${hiveId}`).then((res) => {
      if (res.status === 204) {
        commit('DELETE_HIVE', hiveId)
      }
    })
  },
  async updateHive({ commit }, payload) {
    await this.$axios
      .patch(`/api/v1/hives/${payload._id}`, payload)
      .then((res) => {
        if (res.status == 201) {
          commit('UPDATE_HIVE', payload)
        } else {
          console.log(res)
        }
      })
  }
}

export const getters = {
  getHiveById: (state) => (id) => {
    const hive = state.hiveList.find((x) => x._id === id)
    return hive
    // In Loadingphase of the Page, at can be that the getter is called before the store is filled.
    // Then it will be come to an error
    // So lets check if hives are loaded... if not set an dummy value
    // if (location == null || location._id == null) {
    //   return { number: 'not set' }
    // } else {
    //   return location
    // }
  }
}
