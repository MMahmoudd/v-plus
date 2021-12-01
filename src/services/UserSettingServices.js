
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/roles`
export default {
  getAllItems () {
        return Service.get(`${resource}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addRoles (data) {
      return Service.post(`${resource}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateRole (data) {
      return Service.put(`${resource}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    deleteRole (id) {
      return Service.delete(`${resource}/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getAllPermission () {
      return Service.get(`${API_URL}/permission_lists`)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
}
