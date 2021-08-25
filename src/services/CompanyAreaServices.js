// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'
const resource = `${API_URL}/CompanyArea`
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
      return Service.get(`${resource}/GetById?AreaId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getAreaByCompany (id) {
      return Service.get(`${resource}/GetAreaByCompany?CompanyId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPArea () {
      return Service.get(`${resource}/LKPArea`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddArea (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
          console.log(response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
