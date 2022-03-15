
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {

    fetchOneItem () {
      return Service.get(`${resource}/get-user-data`)
    },
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
    deleteUser (id) {
      return Service.delete(`${resource}/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getByType (id) {
      return Service.get(`${resource}/get_user_by_type/${id}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    sendInvite (data) {
      return Service.post(`${resource}/resend_invite`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getPermissons (token) {
        alert(token)
        return Service.get(`${API_URL}/get-permissions-by-user`,
         { headers: { Authorization: 'Bearer ' + token } })
    },
}
