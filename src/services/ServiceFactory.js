import usersService from './UsersServices'
import customersService from './CustomersServices'
import SettingServices from './SettingServices'
import EvaluationPurposesServices from './EvaluationPurposesServices'
import CitesServices from './CitesServices'
import RegionServices from './RegionServices'
import NeighborhoodsServices from './NeighborhoodsServices'

const services = {
  Users: usersService,
  Customers: customersService,
  Setting: SettingServices,
  EvaluationPurpose: EvaluationPurposesServices,
  Cites: CitesServices,
  Regions: RegionServices,
  Neighborhoods: NeighborhoodsServices,
}

export const ServiceFactory = {
  get: (name) => services[name],
}
