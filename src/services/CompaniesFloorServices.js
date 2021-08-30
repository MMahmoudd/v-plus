// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/CompanyFloor`
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
      return Service.get(`${resource}/GetById?FloorId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getFloorByBranch (id) {
      return Service.get(`${resource}/GetFloorByBranch?BranchId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPFloor () {
      return Service.get(`${resource}/LKPFloor`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddFloor (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
