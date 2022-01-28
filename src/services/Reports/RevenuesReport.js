import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}/revenues-reports`

export default {
  getAllItems (options) {
    return Service.get(`${resource}`, { params: options })
  },
  getAllItemsByCustomerId (customerId, options) {
    return Service.get(`${API_URL}/get-revenues-by-customers/${customerId}`, {
      params: options,
    })
  },
}
