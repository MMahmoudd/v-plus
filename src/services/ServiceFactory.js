import companiesService from './CompaniesService'
import CompanyBranchesServices from './CompanyBranchesServices'
import companyGroupServices from './companyGroupServices'
import CompanyAreaServices from './CompanyAreaServices'
import CompaniesFloorServices from './CompaniesFloorServices'
import CompanyRoomServices from './CompanyRoomServices'
import AssetsServices from './AssetsServices'
import AssetsTypeServices from './AssetsTypeServices'
import AssetsModelServices from './AssetsModelServices'
import AssetsCategoryServices from './AssetsCategoryServices'
import AssetsBrandServices from './AssetsBrandServices'

const services = {
  companies: companiesService,
  companyGroup: companyGroupServices,
  companyBranches: CompanyBranchesServices,
  CompanyArea: CompanyAreaServices,
  CompaniesFloor: CompaniesFloorServices,
  CompanyRoom: CompanyRoomServices,
  Assets: AssetsServices,
  AssetsType: AssetsTypeServices,
  AssetsModel: AssetsModelServices,
  AssetsCategory: AssetsCategoryServices,
  AssetsBrand: AssetsBrandServices,
}

export const ServiceFactory = {
    get: name => services[name],
}
