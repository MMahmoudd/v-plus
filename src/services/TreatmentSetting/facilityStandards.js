import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}`

export default {
  create (data) {
    return Service.post(`${resource}/FacilityStandards`, data)
  },
  update (id, data) {
    return Service.put(`${resource}/FacilityStandards/${id}`, data)
  },
  getOne (id) {
    return Service.get(`${resource}/FacilityStandards/${id}`)
  },
  getAll () {
    return Service.get(`${resource}/FacilityStandards`)
  },
  deleteOne (id) {
    return Service.delete(`${resource}/FacilityStandards/${id}`)
  },
}
