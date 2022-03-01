
import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}/profits-reports`

export default {
  getAllItems (options) {
        return Service.get(`${resource}`, { params: options })
    },
}
