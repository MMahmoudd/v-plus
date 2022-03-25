
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
    fetchOneItem: () => Service.get(`${resource}/get-user-data`),
    updateUser (data) {
      return Service.post(`${resource}/update-users`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    forgotPassword: (data) => Service.post(`${resource}/forget-password`, data),
    resetPassword: (data) => Service.post(`${resource}/reset-password`, data),
}
