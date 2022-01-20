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

import bishopTypeSetting from './TreatmentSetting/bishop_type_setting'
import designSetting from './TreatmentSetting/design_setting'
import eastFacadeSetting from './TreatmentSetting/east_facade_setting'
import northFacadeSetting from './TreatmentSetting/north_facade_setting'
import westFacadeSetting from './TreatmentSetting/west_facade_setting'
import southFacadeSetting from './TreatmentSetting/south_facade_setting'
import electricCurrentSetting from './TreatmentSetting/electric_current_setting'
import entranceFloorTypeSetting from './TreatmentSetting/entrance_floor_type_setting'
import generalLocation from './TreatmentSetting/general_location'
import indoorTypeSetting from './TreatmentSetting/indoor_type_setting'
import insulationTypeSetting from './TreatmentSetting/insulation_type_setting'
import neighborSetting from './TreatmentSetting/neighbor_setting'
import propertyLevelSetting from './TreatmentSetting/property_level_setting'
import receptionFloorTypeSetting from './TreatmentSetting/reception_floor_type_setting'
import roomFloorTypeSetting from './TreatmentSetting/room_floor_type_setting'
import streetLightingSetting from './TreatmentSetting/street_lighting_setting'
import streetSetting from './TreatmentSetting/street_setting'
import structureConstructionSetting from './TreatmentSetting/structure_construction_setting'
import LinksServices from './LinksServices'

const services = {
  Users: usersService,
  Customers: customersService,
  Setting: SettingServices,
  Samples: SamplesServices,
  Links: LinksServices,
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
  // نوع الاسقف
  bishopTypeSetting: bishopTypeSetting,
  // التصميم
  designSetting: designSetting,
  // الواجهة الشرقية
  eastFacadeSetting: eastFacadeSetting,
  // التيار الكهربي
  electricCurrentSetting: electricCurrentSetting,
  // نوع أرضية المدخل
  entranceFloorTypeSetting: entranceFloorTypeSetting,
  // الموقع العام
  generalLocation: generalLocation,
  // نوع أرضية الأحواش
  indoorTypeSetting: indoorTypeSetting,
  // نوع العزل
  insulationTypeSetting: insulationTypeSetting,
  // الجار
  neighborSetting: neighborSetting,
  // الواجهة الشمالية
  northFacadeSetting: northFacadeSetting,
  // المنسوب
  propertyLevelSetting: propertyLevelSetting,
  // نوع أرضية الاستقبال
  receptionFloorTypeSetting: receptionFloorTypeSetting,
  // نوع أرضية الغرف
  roomFloorTypeSetting: roomFloorTypeSetting,
  // الواجهة الجنوبية
  southFacadeSetting: southFacadeSetting,
  // اضاءه الشوارع
  streetLightingSetting: streetLightingSetting,
  // الشوارع
  streetSetting: streetSetting,
  // الهيكل الانشائي
  structureConstructionSetting: structureConstructionSetting,
  // الواجهة الغربية
  westFacadeSetting: westFacadeSetting,

}

export const ServiceFactory = {
  get: (name) => services[name],
}
