import usersService from './UsersServices'
import customersService from './CustomersServices'
import SettingServices from './SettingServices'
import EvaluationPurposesServices from './EvaluationPurposesServices'
import CitesServices from './CitesServices'
import RegionServices from './RegionServices'
import NeighborhoodsServices from './NeighborhoodsServices'
import SamplesServices from './SamplesServices'
import PropertyRatingsServices from './PropertyRatingsServices'
import PropertyTypesServices from './PropertyTypesServices'
import UserSettingServices from './UserSettingServices'
import TransactionsServices from './TransactionsServices'
import OffersServices from '@/services/OffersServices'
import BillingServices from '@/services/BillingServices'
import ExpenseServices from './ExpenseServices'
import constructionConditionsService from './ConstructionConditionsService'
import EvaluationCurrenciesServices from './EvaluationCurrenciesServices'
import ReportTypesServices from './ReportTypesServices'
import ValueBasiListsServices from './ValueBasiListsServices'
import ValueHypothesisListsServices from './ValueHypothesisListsServices'
import WorkingStatusesServices from './WorkingStatusesServices'

const services = {
  Users: usersService,
  Customers: customersService,
  Setting: SettingServices,
  Samples: SamplesServices,
  EvaluationPurpose: EvaluationPurposesServices,
  Cites: CitesServices,
  Regions: RegionServices,
  Neighborhoods: NeighborhoodsServices,
  PropertyRatings: PropertyRatingsServices,
  PropertyTypes: PropertyTypesServices,
  UserSetting: UserSettingServices,
  Transactions: TransactionsServices,
  Offers: OffersServices,
  Bills: BillingServices,
  Expense: ExpenseServices,
  constructionConditions: constructionConditionsService,
  EvaluationCurrencies: EvaluationCurrenciesServices,
  ReportTypes: ReportTypesServices,
  ValueBasiLists: ValueBasiListsServices,
  ValueHypothesisLists: ValueHypothesisListsServices,
  WorkingStatuses: WorkingStatusesServices,

}

export const ServiceFactory = {
  get: (name) => services[name],
}
