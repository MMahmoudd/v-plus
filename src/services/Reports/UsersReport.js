
import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}`
export default {
  getAllItems (itemsPerPage, page, pageNumber) {
    const paginate = (itemsPerPage && itemsPerPage !== '') ? '&itemsPerPage=' + itemsPerPage : ''
    const pageN = (page && page !== '') ? '&page=' + page : ''
    const pagination = pageN + paginate
      return Service.post(`${resource}/customers-reports?${pagination}`)
        .then((response) => {
            if (response.status === 200) {
                return response
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/get-commissions-by-users/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
