import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/general_location`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/general_location/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
  },
  addOneItem (data) {
      return Service.post(`${resource}/general_location`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  updateOneItem (id, data) {
      return Service.put(`${resource}/general_location/${id}`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  deleteOneItem (id) {
      return Service.delete(`${resource}/general_location/${id}`)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
