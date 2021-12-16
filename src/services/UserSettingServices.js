
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
      console.log('uu: ', `${resource}`)
      return Service.post(`${resource}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
      }).catch(error => {
        console.log('error: ', error)
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
    updatePermissions (id, data) {
      return Service.post(`${API_URL}/role_update_permissions/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    }).catch(error => {
          console.log('error: ', error)
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
