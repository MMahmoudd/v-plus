import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/neighborhoods`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    getAllItemsById (id) {
        return Service.get(`${resource}/get-all-neighborhood?city_id=${id}`)
    },
    addNeighborhood (neighborhoodName, cityId) {
        return Service.post(`${resource}/neighborhoods`, { name: neighborhoodName, city_id: cityId }).then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
        return Service.get(`${resource}/neighborhoods/${id}`)
        .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
    },
    addOneItem (data) {
        return Service.post(`${resource}/neighborhoods`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    updateOneItem (id, data) {
        return Service.put(`${resource}/neighborhoods/${id}`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    deleteOneItem (id) {
        return Service.delete(`${resource}/neighborhoods/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
