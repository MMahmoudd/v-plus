/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}`
export default {
    getLatestRegisteredUser() {
        return Service.get(`${resource}/Statistics/Latest10RegisterUser`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getUserAchievementsStatistics(data) {
        return Service.post(`${resource}/Statistics/UserAchievementsStatistics`, data)
            .then((response) => {
                console.log('response', response)
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getExpenses(year) {
        return Service.post(`${resource}/Statistics/expenses`, { year: +year })
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getRevenues(year) {
        return Service.post(`${resource}/Statistics/revenues`, { year: +year })
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getCommissions(year) {
        return Service.post(`${resource}/Statistics/Commissions`, { year: +year })
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
}