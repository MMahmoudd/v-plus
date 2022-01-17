import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/important_links`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    getOneItem (id) {
        return Service.get(`${resource}/${id}`)
        .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
    },
    addOneItem (data) {
        return Service.post(`${resource}`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    updateOneItem (id, data) {
        return Service.put(`${resource}/${id}`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    deleteOneItem (id) {
        return Service.delete(`${resource}/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
