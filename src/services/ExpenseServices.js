
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
    fetchOneItem (id) {
      return Service.get(`${resource}/expense_calendars/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    addExpense (data) {
      return Service.post(`${resource}/expense_calendars`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateExpense (id, data) {
      return Service.put(`${resource}/expense_calendars/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
