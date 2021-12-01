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
    addNeighborhood (neighborhoodName, cityId) {
        return Service.post(`${resource}/neighborhoods`, { name: neighborhoodName, city_id: cityId }).then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
}
