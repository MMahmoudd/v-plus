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
import AuthenticationServices from './AuthenticationServices'
import roleServices from './roleServices'
import AssetsStatusServices from './AssetsStatusServices'
import ReportsServices from './ReportsServices'

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
  Authentication: AuthenticationServices,
  Role: roleServices,
  AssetsStatus: AssetsStatusServices,
  Reports: ReportsServices,
}

export const ServiceFactory = {
    get: name => services[name],
}
