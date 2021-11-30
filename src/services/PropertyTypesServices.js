import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/property_types`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
}
