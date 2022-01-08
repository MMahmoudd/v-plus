import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/west_facade_setting`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/west_facade_setting/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
  },
  addOneItem (data) {
      return Service.post(`${resource}/west_facade_setting`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  updateOneItem (id, data) {
      return Service.put(`${resource}/west_facade_setting/${id}`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  deleteOneItem (id) {
      return Service.delete(`${resource}/west_facade_setting/${id}`)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
