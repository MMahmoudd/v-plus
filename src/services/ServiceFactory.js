import companiesService from './CompaniesService'
import CompanyBranchesServices from './CompanyBranchesServices'
import companyGroupServices from './companyGroupServices'
import CompanyAreaServices from './CompanyAreaServices'
import CompaniesFloorServices from './CompaniesFloorServices'
import CompanyRoomServices from './CompanyRoomServices'

const services = {
  companies: companiesService,
  companyGroup: companyGroupServices,
  companyBranches: CompanyBranchesServices,
  CompanyArea: CompanyAreaServices,
  CompaniesFloor: CompaniesFloorServices,
  CompanyRoom: CompanyRoomServices,
}

export const ServiceFactory = {
    get: name => services[name],
}
