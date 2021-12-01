import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/cities`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    addCity (cityName, regionId) {
        return Service.post(`${resource}/cities`, { name: cityName, region_id: regionId }).then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
}
