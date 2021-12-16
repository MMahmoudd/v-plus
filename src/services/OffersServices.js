
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/offers`)
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
      return Service.get(`${resource}/offers/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addOffer (data) {
    console.log(resource + '/offers')
      return Service.post(`${resource}/offers`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateOffer (id, data) {
      return Service.post(`${resource}/offers/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    deleteOffer (id) {
      return Service.delete(`${resource}/offers/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
