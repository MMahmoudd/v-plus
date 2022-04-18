
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
    getAllItems () {
        return Service.get(`${resource}/evaluation_purposes`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
        return Service.get(`${resource}/evaluation_purposes/${id}`)
        .then((response) => {
          if (response.status === 200) {
              return response.data
          }
        })
    },
    addOneItem (data) {
        return Service.post(`${resource}/evaluation_purposes`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    updateOneItem (id, data) {
        return Service.put(`${resource}/evaluation_purposes/${id}`, data)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    deleteOneItem (id) {
        return Service.delete(`${resource}/evaluation_purposes/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
