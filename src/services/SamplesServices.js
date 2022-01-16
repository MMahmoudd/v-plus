import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (isUser) {
        return Service.get(`${resource}/samples?is_user=${isUser}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/samples/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
  },
  addOneItem (data) {
      return Service.post(`${resource}/samples`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  updateOneItem (id, data) {
      return Service.put(`${resource}/samples/${id}`, data)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  deleteOneItem (id) {
      return Service.delete(`${resource}/samples/${id}`)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
