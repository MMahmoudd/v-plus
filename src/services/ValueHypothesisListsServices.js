import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
    getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/value_hypothesis_lists`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/value_hypothesis_lists/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
  },
  addOneItem (data) {
      return Service.post(`${resource}/value_hypothesis_lists`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  updateOneItem (id, data) {
      return Service.put(`${resource}/value_hypothesis_lists/${id}`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  deleteOneItem (id) {
      return Service.delete(`${resource}/value_hypothesis_lists/${id}`)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
