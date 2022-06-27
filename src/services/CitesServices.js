/* eslint-disable space-before-function-paren */
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`
export default {
    getAllItems(itemsPerPage, page) {
        return Service.get(`${resource}/cities?itemsPerPage=${itemsPerPage}&page=${page}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getAllItemsById(id) {
        return Service.get(`${resource}/get-all-city?region_id=${id}`)
    },
    addCity(cityName, regionId) {
        return Service.post(`${resource}/cities`, { name: cityName, region_id: regionId }).then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem(id) {
        return Service.get(`${resource}/cities/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    addOneItem(data) {
        return Service.post(`${resource}/cities`, data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    updateOneItem(id, data) {
        return Service.put(`${resource}/cities/${id}`, data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    deleteOneItem(id) {
        return Service.delete(`${resource}/cities/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
}
