import { fetchList } from '@/api'

export default {
  async getListRDT({ commit }, params) {
    try {
      const response = await fetchList('/api/rdt', 'GET', params)
      commit('SET_TOTAL_LIST_RDT', response.data._meta.totalPages)
      commit('SET_LIST_RDT', response.data.rdt)
      return response
    } catch (error) {
      return error.response
    }
  }
}