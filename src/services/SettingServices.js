
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getFacility () {
        return Service.get(`${resource}/facilities`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    updateFacility (data, id) {
      return Service.post(`${resource}/facilities/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
