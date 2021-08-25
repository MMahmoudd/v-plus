// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/CompanyRoom`
// const token = localStorage.getItem('token')

export default {

  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/GetAll?page=${page}&limit=${itemsPerPage}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/GetById?RoomId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getRoomByFloor (id) {
      return Service.get(`${resource}/GetRoomByFloor?FloorId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPRoom () {
      return Service.get(`${resource}/LKPRoom`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddRoom (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
          console.log(response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
