import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/working_statuses`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/working_statuses/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
  },
  addOneItem (data) {
      return Service.post(`${resource}/working_statuses`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  updateOneItem (id, data) {
      return Service.put(`${resource}/working_statuses/${id}`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  deleteOneItem (id) {
      return Service.delete(`${resource}/working_statuses/${id}`)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
