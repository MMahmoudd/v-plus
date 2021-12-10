
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/users`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addUser (data) {
      return Service.post(`${resource}/users`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateUser (id, data) {
      return Service.put(`${resource}/users/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    deleteUser (id) {
      return Service.delete(`${resource}/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getByType (id) {
      return Service.get(`${resource}/get_user_by_type/${id}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
}
