
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/Authentication`

export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/GetAllUser?page=${page}&limit=${itemsPerPage}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/GetUserById?UserId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateUserData (data) {
      return Service.post(`${resource}/UpdateUser`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addUserData (data) {
      return Service.post(`${resource}/Register`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
      })
    },
}
