import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/transactions`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    filterItems (data) {
        return Service.get(`${resource}/transactions`, { params: data })
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
        return Service.get(`${resource}/transactions/${id}`)
        .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
    },
    addOneItem (data) {
        return Service.post(`${resource}/transactions`, data, {
headers: {
            'content-type': 'multipart/form-data',
        },
})
    },
    updateOneItem (id, data) {
        return Service.post(`${resource}/transactions/${id}`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    deleteOneItem (id) {
        return Service.delete(`${resource}/transactions/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
