
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/Role`
const permissionResource = `${API_URL}/RolePermission`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/GetAll`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/GetById?RoleId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPRole () {
      return Service.get(`${resource}/LKPRole`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddRole (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getAllpermissions (itemsPerPage, page, pageNumber) {
      return Service.get(`${permissionResource}/GetPermissions`)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
  addRoleToPermission (data) {
    return Service.post(`${permissionResource}/AddRoleToPermission`, data)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
