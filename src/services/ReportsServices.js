import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/Report`

export default {
  GetProcedures () {
        return Service.get(`${resource}/GetProcedures`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    ExcuteProcedure (data) {
      return Service.post(`${resource}/ExcuteProcedure`, data)
      .then((response) => {
        if (response.status === 200) {
            return response
        }
    })
    },
}
