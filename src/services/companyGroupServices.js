// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/CompanyGroup`
// const token = localStorage.getItem('token')

export default {

  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/GetAll`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/GetById?GroupID=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPGroup () {
      return Service.get(`${resource}/LKPGroup`).then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddGroup (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
          console.log(response)
        // if (response.status === 200) {
        //     return response.data
        // }
    })
    },
}
