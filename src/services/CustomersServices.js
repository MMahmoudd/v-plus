
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/customers`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/customers/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addUser (data) {
      return Service.post(`${resource}/customers`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateUser (id, data) {
      return Service.post(`${resource}/customers/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    })
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    deleteUser (id) {
      return Service.delete(`${resource}/customers/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
