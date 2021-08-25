// import axios from 'axios'
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/AssetModel`
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
      return Service.get(`${resource}/GetById?TypeId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getModelByBrand (id) {
      return Service.get(`${resource}/GetModelByBrand?BrandId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPModel () {
      return Service.get(`${resource}/LKPModel`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddAssetsModel (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
          console.log(response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
