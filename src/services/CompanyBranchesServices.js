// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/CompanyBranch`
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
      return Service.get(`${resource}/GetById?BranchId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getBranchByArea (id) {
      return Service.get(`${resource}/GetBranchByArea?AreaId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPBrnch () {
      return Service.get(`${resource}/LKPBrnch`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddBrnch (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
          console.log(response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
