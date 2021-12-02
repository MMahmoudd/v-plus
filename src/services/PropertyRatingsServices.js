import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/property_ratings`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
        return Service.get(`${resource}/property_ratings/${id}`)
        .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
    },
    addOneItem (data) {
        return Service.post(`${resource}/property_ratings`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    updateOneItem (id, data) {
        return Service.put(`${resource}/property_ratings/${id}`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    deleteOneItem (id) {
        return Service.delete(`${resource}/property_ratings/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
