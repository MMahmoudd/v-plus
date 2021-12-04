
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/bills`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
  getCustomer () {
        return Service.get(`${resource}/customers`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/bills/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addBill (data) {
      return Service.post(`${resource}/bills`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateBill (id, data) {
      return Service.put(`${resource}/bills/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    deleteBill (id) {
      return Service.delete(`${resource}/bills/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
