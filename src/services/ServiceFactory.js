import usersService from './UsersServices'
import customersService from './CustomersServices'
import SettingServices from './SettingServices'

const services = {
  Users: usersService,
  Customers: customersService,
  Setting: SettingServices,

}

export const ServiceFactory = {
  get: (name) => services[name],
}
