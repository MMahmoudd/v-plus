// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/Assets`
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
      return Service.get(`${resource}/GetById?AssetId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPType () {
      return Service.get(`${resource}/LKPType`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAssets (data) {
      return Service.post(`${resource}/Update`, data)
      .then((response) => {
          console.log(response)
        // if (response.status === 200) {
        //     return response.data
        // }
    })
    },
    addAssets (data) {
      return Service.post(`${resource}/Add`, data)
      .then((response) => {
          console.log(response)
        // if (response.status === 200) {
        //     return response.data
        // }
    })
    },
}
