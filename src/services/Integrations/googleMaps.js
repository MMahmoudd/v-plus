import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}`

export default {
    fetchOneItem (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/get-facilities-maps-key`)
    },
  addOneItem (data) {
      return Service.post(`${resource}/add-facilities-maps-key`, data)
  },
  updateOneItem (data) {
      return Service.post(`${resource}/update-facilities-maps-key`, data)
  },
  deleteOneItem (id) {
      return Service.delete(`${resource}/bishop_type_setting/${id}`)
    .then((response) => {
      if (response.status === 200) {
          return response.data
      }
  })
  },
}
