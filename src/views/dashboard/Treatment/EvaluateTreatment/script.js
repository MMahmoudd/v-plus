 /* eslint-disable vue/valid-v-model */
  // import TransactionsBar from './TransactionsBar.vue'
  // import Swal from 'sweetalert2'
  import { copyText } from 'vue3-clipboard'
  import { Loader } from '@googlemaps/js-api-loader'
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  import staticLists from '../staticData.json'
  import { uuid } from 'vue-uuid'
  import NumbersToWords from 'tafgeetjs'
  import draggable from 'vuedraggable'
  const loader = new Loader('AIzaSyACo4RXxzSABqvI3S_Q3_nQ2YIW4HfJuXI')
  const CustomersService = ServiceFactory.get('Customers')
  const EvaluationPurposeService = ServiceFactory.get('EvaluationPurpose')
  // ! TODO : change this later
  const UsersServices = ServiceFactory.get('Users')
  const RegionsServices = ServiceFactory.get('Regions')
  const CitesServices = ServiceFactory.get('Cites')
  const NeighborhoodsServices = ServiceFactory.get('Neighborhoods')
  const PropertyRatingsServices = ServiceFactory.get('PropertyRatings')
  const PropertyTypesServices = ServiceFactory.get('PropertyTypes')
  const SamplesServices = ServiceFactory.get('Samples')
  const TransactionsServices = ServiceFactory.get('Transactions')
  const ReportTypesServices = ServiceFactory.get('ReportTypes')
  const ValueHypothesisListsServices = ServiceFactory.get('ValueHypothesisLists')
  const ValueBasiListsServices = ServiceFactory.get('ValueBasiLists')
  const constructionConditionsService = ServiceFactory.get('constructionConditions')
  const WorkingStatusesServices = ServiceFactory.get('WorkingStatuses')
  const EvaluationCurrenciesServices = ServiceFactory.get('EvaluationCurrencies')
  /**
   * * third library
   */
  const Swal = () => import('sweetalert2')
  // const watchUs = (array, f) => {
  //   const result = {}
  //   array.forEach(item => {
  //     result[item] = function () {
  //       // eslint-disable-next-line no-new-func
  //       f(...f.arguments)
  //     }
  //   })

  //   return result
  // }

  export default {
    name: 'EvaluateTreatment',
    display: 'Transitions',
    order: 7,
    components: {
      draggable,
      // TransactionsBar,
    },
    filters: {
      money: function (value) {
        if (!value) {
          return ''
        }
        return (+value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      },
    },
    data: () => ({
      panel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      pandelHasBeenOpened: {},
      scrollItems: [
        { ref: '1', name: 'الملاحق' },
        { ref: '2', name: 'نطاق العمل' },
        { ref: '3', name: 'تفاصيل العقار' },
        { ref: '4', name: 'احداثيات العقار' },
        { ref: '5', name: 'وصف العقار' },
        { ref: '6', name: 'حدود وأطوال العقار' },
        { ref: '7', name: 'معلومات رخصة البناء' },
        { ref: '8', name: 'مكونات العقار' },
        { ref: '9', name: 'تصنيف مستوى تشطيبات البناء' },
        { ref: '10', name: 'المرافق المتوفرة' },
        { ref: '11', name: 'المحيط المؤثر' },
        { ref: '12', name: 'الأساليب' },
        { ref: '13', name: 'الصور الفوتوغرافيه' },
        { ref: '14', name: 'بيانات إضافيه' },

      ],
      successSnackbar: false,
      successMessage: '',
      errorSnackbar: false,
      timeout: 3000,
      dataLoading: false,
      buttonsLoading: {
        save: false,
        send: false,
        cancel: false,
        suspend: false,
        back: false,
        approve: false,
      },
      buttonsDialog: {
        show: false,
        title: '',
        body: '',
        saveButton: {
          text: 'تأكيد',
          color: '',
          class: 'ma-2 light-green-btn',
          icon: '',
          action: '',
        },
      },
      statuses: Object.freeze({
        1: 'مسودة',
        2: 'تحت التقييم',
        3: 'تحت المراجعة',
        4: 'قيد الاعتماد',
        5: 'معتمدة',
        6: 'مرسلة',
        7: 'معلقة',
        8: 'ملغية',
      }),
      staticLists: { ...staticLists },
      customersList: [],
      evaluationPurposeList: [],
      appraisersList: [],
      previewsList: [],
      coordinatorsList: [],
      regionsList: [],
      citesList: [],
      neighborhoodsList: [],
      appraisalFeesList: [],
      appraisalValueList: [],
      samplesList: [],
      valuesUsedList: [
        {
          id: 'القيمة السوقية',
          name: 'القيمة السوقية',
        },
        {
          id: 'الإيجار السوقي',
          name: 'الإيجار السوقي',
        },
        {
          id: 'القيمة المنصفة',
          name: 'القيمة المنصفة',
        },
        {
          id: 'القيمة الاستثمارية',
          name: 'القيمة الاستثمارية',
        },
        {
          id: 'القيمة التكاملية',
          name: 'القيمة التكاملية',
        },
        {
          id: 'قيمة التصفية',
          name: 'قيمة التصفية',
        },
        {
          id: 'القيمة العادلة',
          name: 'القيمة العادلة',
        },
        {
          id: 'القيمة السوقية العادلة',
          name: 'القيمة السوقية العادلة',
        },
        {
          id: 'أخرى',
          name: 'أخرى',
        },
      ],
      feesUsedValuesList: [

      ],
      propTypeList: [
        {
          id: 'فيلا سكنية',
          name: 'فيلا سكنية',
        },
        {
          id: 'فيلا',
          name: 'فيلا',
        },
        {
          id: 'أرض',
          name: 'أرض',
        },
        {
          id: 'برج مكتبي',
          name: 'برج مكتبي',
        },
        {
          id: 'برج',
          name: 'برج',
        },
        {
          id: 'عماره',
          name: 'عماره',
        },
        {
          id: 'معارض',
          name: 'معارض',
        },
        {
          id: 'مواقف + مستودعات',
          name: 'مواقف + مستودعات',
        },
        {
          id: 'مستودعات',
          name: 'مستودعات',
        },
        {
          id: 'ورشة',
          name: 'ورشة',
        },
        {
          id: 'محلات',
          name: 'محلات',
        },
        {
          id: 'عمائر',
          name: 'عمائر',
        },
        {
          id: 'مبنى أرض مقهى',
          name: 'مبنى أرض مقهى',
        },
        {
          id: 'فلل',
          name: 'فلل',
        },
        {
          id: 'مدرسة',
          name: 'مدرسة',
        },
        {
          id: 'منجرة',
          name: 'منجرة',
        },
        {
          id: 'مركز تجاري',
          name: 'مركز تجاري',
        },
        {
          id: 'عدد 4 قطع أراضي فضاء',
          name: 'عدد 4 قطع أراضي فضاء',
        },
        {
          id: 'أرض فضاء',
          name: 'أرض فضاء',
        },
        {
          id: 'حوش',
          name: 'حوش',
        },
        {
          id: 'بيت شعبي',
          name: 'بيت شعبي',
        },
        {
          id: 'إستراحة',
          name: 'إستراحة',
        },
        {
          id: 'قصر',
          name: 'قصر',
        },
        {
          id: 'مرفق تعليمي',
          name: 'مرفق تعليمي',
        },
        {
          id: 'مخطط سكني تجاري',
          name: 'مخطط سكني تجاري',
        },
        {
          id: 'مصنع',
          name: 'مصنع',
        },
        {
          id: 'مجمع تجاري مكتبي',
          name: 'مجمع تجاري مكتبي',
        },
        {
          id: 'أرض وبناء',
          name: 'أرض وبناء',
        },
        {
          id: 'عمارة مكتبية',
          name: 'عمارة مكتبية',
        },
        {
          id: 'أرض مقام عليها مصنع خرسانه',
          name: 'أرض مقام عليها مصنع خرسانه',
        },
        {
          id: 'مبنى اداري',
          name: 'مبنى اداري',
        },
        {
          id: 'محطة',
          name: 'محطة',
        },
        {
          id: 'أرض وبناء',
          name: 'أرض وبناء',
        },
        {
          id: 'عمارتين سكني تجاري',
          name: 'عمارتين سكني تجاري',
        },
        {
          id: 'ارض صناعي',
          name: 'ارض صناعي',
        },
        {
          id: 'عمارة سكنية',
          name: 'عمارة سكنية',
        },
        {
          id: 'سكن عمال',
          name: 'سكن عمال',
        },
        {
          id: 'شقة',
          name: 'شقة',
        },
        {
          id: 'عمارة تجاري',
          name: 'عمارة تجاري',
        },
        {
          id: 'أرض خام',
          name: 'أرض خام',
        },
        {
          id: 'تعليمي',
          name: 'تعليمي',
        },
        {
          id: 'أرض مقام عليها فيلا',
          name: 'أرض مقام عليها فيلا',
        },
        {
          id: 'ارض مقام عليها اساسات',
          name: 'ارض مقام عليها اساسات',
        },
        {
          id: 'مــزرعــــة',
          name: 'مــزرعــــة',
        },
        {
          id: 'ارض مقام عليها اساسات',
          name: 'ارض مقام عليها اساسات',
        },
        {
          id: 'عمارة + فيلا',
          name: 'عمارة + فيلا',
        },
        {
          id: 'عمارة + فلتين',
          name: 'عمارة + فلتين',
        },
        {
          id: 'محطه',
          name: 'محطه',
        },
        {
          id: 'مبنى (مقر بنك ساب)',
          name: 'مبنى (مقر بنك ساب)',
        },
        {
          id: 'أرض زراعي',
          name: 'أرض زراعي',
        },
        {
          id: 'أرض مقام عليها محطة عظم',
          name: 'أرض مقام عليها محطة عظم',
        },
        {
          id: 'مجمع فلل',
          name: 'مجمع فلل',
        },
        {
          id: 'مستودع',
          name: 'مستودع',
        },
        {
          id: 'فندق الروضة',
          name: 'فندق الروضة',
        },
        {
          id: 'عمارة مكتبية ومعارض',
          name: 'عمارة مكتبية ومعارض',
        },
        {
          id: 'أرض مقام عليها مباني',
          name: 'أرض مقام عليها مباني',
        },
        {
          id: 'فندق',
          name: 'فندق',
        },
        {
          id: 'عمارة شقق مفروشة',
          name: 'عمارة شقق مفروشة',
        },
        {
          id: 'أرض مسورة',
          name: 'أرض مسورة',
        },
        {
          id: 'مستودع + مكاتب إداريه',
          name: 'مستودع + مكاتب إداريه',
        },
        {
          id: 'مجمع تجاري',
          name: 'مجمع تجاري',
        },
        {
          id: 'شاليه + ملعب',
          name: 'شاليه + ملعب',
        },
        {
          id: 'محلات + عمارة',
          name: 'محلات + عمارة',
        },
        {
          id: 'ارض مسورة بها مظلة',
          name: 'ارض مسورة بها مظلة',
        },
        {
          id: 'صالات عرض ومبنى اداري',
          name: 'صالات عرض ومبنى اداري',
        },
        {
          id: 'عمارتين + فلتين',
          name: 'عمارتين + فلتين',
        },
        {
          id: 'محل تجاري',
          name: 'محل تجاري',
        },
        {
          id: 'شاليه',
          name: 'شاليه',
        },
        {
          id: 'مطعم',
          name: 'مطعم',
        },
        {
          id: 'عمارة مكتبية',
          name: 'عمارة مكتبية',
        },
        {
          id: 'ارض زراعية',
          name: 'ارض زراعية',
        },
        {
          id: 'معرض سيارات',
          name: 'معرض سيارات',
        },
        {
          id: 'مبنى',
          name: 'مبنى',
        },
        {
          id: 'ارض مسوره',
          name: 'ارض مسوره',
        },
        {
          id: 'معرض',
          name: 'معرض',
        },
        {
          id: 'ارض تجارية',
          name: 'ارض تجارية',
        },
        {
          id: 'ارض سكنية',
          name: 'ارض سكنية',
        },
        {
          id: 'ارض مقام عليها مباني',
          name: 'ارض مقام عليها مباني',
        },
        {
          id: 'سكن عائلي',
          name: 'سكن عائلي',
        },
        {
          id: 'سكني تجاري',
          name: 'سكني تجاري',
        },
        {
          id: 'عمارة تجارية',
          name: 'عمارة تجارية',
        },
        {
          id: 'فيلا دبلكس',
          name: 'فيلا دبلكس',
        },
        {
          id: 'فيلا روف',
          name: 'فيلا روف',
        },
        {
          id: 'قصر سكني',
          name: 'قصر سكني',
        },
        {
          id: 'مجمع سكني',
          name: 'مجمع سكني',
        },
        {
          id: 'مخطط تحت التطوير',
          name: 'مخطط تحت التطوير',
        },
        {
          id: 'مقر شركة',
          name: 'مقر شركة',
        },
        {
          id: 'ملاحق أرضية',
          name: 'ملاحق أرضية',
        },
        {
          id: 'منتزه ترفيهي',
          name: 'منتزه ترفيهي',
        },
        {
          id: 'وحدة سكنية',
          name: 'وحدة سكنية',
        },
        {
          id: 'مجمع مدراس',
          name: 'مجمع مدراس',
        },
        {
          id: 'معارض تجارية',
          name: 'معارض تجارية',
        },
        {
          id: 'عمارة سكنية تجارية مكتبية (شقق مفروشة)',
          name: 'عمارة سكنية تجارية مكتبية (شقق مفروشة)',
        },
        {
          id: 'عمارة سكنية + مستودعات',
          name: 'عمارة سكنية + مستودعات',
        },
        {
          id: 'مجمع مكتبي',
          name: 'مجمع مكتبي',
        },
        {
          id: 'مجمع تجاري مكتبي سكني',
          name: 'مجمع تجاري مكتبي سكني',
        },
        {
          id: 'مخطط سكني تجاري',
          name: 'مخطط سكني تجاري',
        },
        {
          id: 'محلات+ سكن + استراحة',
          name: 'محلات+ سكن + استراحة',
        },
        {
          id: 'عمارة + محلات',
          name: 'عمارة + محلات',
        },
        {
          id: 'مكتب تجاري',
          name: 'مكتب تجاري',
        },
        {
          id: 'اختبار',
          name: 'اختبار',
        },
        {
          id: 'حسب الواقع',
          name: 'حسب الواقع',
        },
        {
          id: 'دور',
          name: 'دور',
        },
        {
          id: 'سوق تجاري',
          name: 'سوق تجاري',
        },
        {
          id: 'ستريب مول',
          name: 'ستريب مول',
        },
        {
          id: 'عمارة تجارية مكتبية',
          name: 'عمارة تجارية مكتبية',
        },
        {
          id: 'سكني تجاري وشقق مفروشة',
          name: 'سكني تجاري وشقق مفروشة',
        },
        {
          id: 'عمارة تجارية مكتبية + مستودع',
          name: 'عمارة تجارية مكتبية + مستودع',
        },
        {
          id: 'مزرعة صك رقم (213202004985)',
          name: 'مزرعة صك رقم (213202004985)',
        },
        {
          id: 'عماره + مستودعات',
          name: 'عماره + مستودعات',
        },
        {
          id: 'مزرعة صك رقم( 630801010713)',
          name: 'مزرعة صك رقم( 630801010713)',
        },
        {
          id: 'مقهى',
          name: 'مقهى',
        },
        {
          id: 'مباني فقط',
          name: 'مباني فقط',
        },
        {
          id: 'مزرعة ( الصك رقم 330114012614 )',
          name: 'مزرعة ( الصك رقم 330114012614 )',
        },
        {
          id: 'المزرعة صك رقم 371705005464',
          name: 'المزرعة صك رقم 371705005464',
        },
      ],
      propRatingsList: [
        {
          id: 'سكني',
          name: 'سكني',
        },
        {
          id: 'تجاري',
          name: 'تجاري',
        },
        {
          id: 'سكني تجاري',
          name: 'سكني تجاري',
        },
        {
          id: 'زراعي',
          name: 'زراعي',
        },
        {
          id: 'صناعي',
          name: 'صناعي',
        },
        {
          id: 'ورش',
          name: 'ورش',
        },
        {
          id: 'مستودعات',
          name: 'مستودعات',
        },
        {
          id: 'خام',
          name: 'خام',
        },
        {
          id: 'مرفق',
          name: 'مرفق',
        },
        {
          id: 'أخرى',
          name: 'أخرى',
        },
        {
          id: 'تعليمي',
          name: 'تعليمي',
        },
        {
          id: 'مكتبي',
          name: 'مكتبي',
        },
        {
          id: 'اخرى',
          name: 'اخرى',
        },
        {
          id: 'ماكولات بحرية',
          name: 'ماكولات بحرية',
        },
        {
          id: 'ترفيهي',
          name: 'ترفيهي',
        },
        {
          id: 'استثماري',
          name: 'استثماري',
        },
        {
          id: 'استراحات',
          name: 'استراحات',
        },
        {
          id: 'فضاء',
          name: 'فضاء',
        },
        {
          id: 'مناطق بحرية',
          name: 'مناطق بحرية',
        },
        {
          id: 'مجمع مكتبي',
          name: 'مجمع مكتبي',
        },
        {
          id: 'فندقي',
          name: 'فندقي',
        },
        {
          id: 'فندقي',
          name: 'فندقي',
        },
        {
          id: 'مستودعات - تجاري',
          name: 'مستودعات - تجاري',
        },
        {
          id: 'تجاري اداري',
          name: 'تجاري اداري',
        },
        {
          id: 'تجاري مكتبي',
          name: 'تجاري مكتبي',
        },
        {
          id: 'معارض سيارات',
          name: 'معارض سيارات',
        },
        {
          id: 'مرفق حكومي ( دفاع مدني )',
          name: 'مرفق حكومي ( دفاع مدني )',
        },
        {
          id: 'مركز إجتماعي',
          name: 'مركز إجتماعي',
        },
        {
          id: 'صناعية',
          name: 'صناعية',
        },
        {
          id: 'سكني تجاري مكتبي',
          name: 'سكني تجاري مكتبي',
        },
      ],
      transCurrencyList: [],
      cityName: '',
      neighborhoodName: '',
      trans_assignment_date: false,
      trans_evaluation_date: false,
      trans_inspection_date: false,
      trans_instrument_date: false,
      trans_building_permit_date: false,
      trans_retail_record_date: false,
      // مكونات العقار
      boards_show: false,
      dining_rooms_show: false,
      bed_room_show: false,
      Kitchens_show: false,
      toilets_show: false,
      jacuzzi_show: false,
      garden_show: false,
      maids_room_show: false,
      guard_Room_show: false,
      basement_show: false,
      halls_show: false,
      Supplements_show: false,
      elevators_show: false,
      parking_show: false,
      childrens_playground_show: false,
      swimming_pool_show: false,
      storehouse_show: false,
      data: {
        evaluation_criteria: [],
        images_ids_deleted: [],
        files_to_deleted: [],
        attached_files: [],
        media: [],
        transactions_buildings: [],
        sample_id: 11,
        customer_id: '',
        appraiser_id: 0,
        preview_id: 0,
        coordinator_id: 0,
        prop_street_name: '',
        evaluation_purpose_id: '',
        appraisal_fees: '',
        appraisal_value: '',
        region_id: 0,
        city_id: 0,
        neighborhood_id: 0,
        prop_Albulk_num: '',
        prop_apartment_num: '',
        prop_part_num: '',
        transaction_id: '',
        trans_number: '',
        instrument_file: '',
        attached_file: '',
        schema_file: '',
        assignment_letter_file: '',
        resident_id: '',
        reviewer_id: '',
        approved_id: '',
        trans_report_name: '',
        trans_report_phone: '',
        trans_value_basis: '',
        value_hypothesis: '',
        trans_assignment_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_evaluation_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_inspection_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_Report_type: '',
        trans_filing_the_report: '',
        trans_reference_number: '',
        trans_deposit_code_site_num_customer_num: '',
        trans_street_name: '',
        residential_plan_name: '',
        residential_plan_no: '',
        trans_Albulk_num: '',
        trans_part_num: '',
        trans_owner_name: '',
        trans_owner_phone: '',
        property_type_id: '',
        property_rating_id: '',
        trans_instrument_num: '',
        trans_instrument_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_building_permit_number: '',
        trans_building_permit_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_construction_age: '',
        trans_retail_record_num: '',
        trans_retail_record_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        trans_construction_condition: '',
        trans_occupancy_status: '',
        trans_general_site: '',
        trans_the_design: '',
        trans_attributable: '',
        trans_neighbor: '',
        trans_streets: '',
        trans_Street_lighting: '',
        trans_electric_current: '',
        trans_insulation_type: '',
        trans_the_type_of_yard_floor: '',
        trans_reception_floor_type: '',
        trans_entrance_floor: '',
        trans_room_floor_type: '',
        trans_bolt_the_outer_doors: '',
        trans_wool_interior_doors: '',
        trans_structural_structure: '',
        trans_bishop_type: '',
        trans_boards: '',
        trans_dining_rooms: '',
        trans_bed_room: '',
        trans_kitchens: '',
        trans_toilets: '',
        trans_jacuzzi: '',
        trans_garden: '',
        trans_maids_room: '',
        trans_guard_Room: '',
        trans_basement: '',
        trans_halls: '',
        trans_supplements: '',
        trans_elevators: '',
        trans_parking: '',
        trans_children_playground: '',
        trans_swimming_pool: '',
        trans_storehouse: '',
        glass_walls: '',
        central_conditioning: '',
        double_glazing: '',
        plaster_on_the_ceiling: '',
        hidden_lighting: '',
        arabic_bath: '',
        stairs: '',
        electric_garage: '',
        ordinary_garage: '',
        portals: '',
        heaters: '',
        french_bath: '',
        trans_boards_status: '',
        trans_dining_rooms_status: '',
        trans_bed_room_status: '',
        trans_kitchens_status: '',
        trans_toilets_status: '',
        trans_jacuzzi_status: '',
        trans_garden_status: '',
        trans_maids_room_status: '',
        trans_guard_Room_status: '',
        trans_basement_status: '',
        trans_halls_status: '',
        trans_supplements_status: '',
        trans_elevators_status: '',
        trans_parking_status: '',
        trans_children_playground_status: '',
        trans_swimming_pool_status: '',
        trans_storehouse_status: '',
        glass_walls_status: '',
        central_conditioning_status: '',
        double_glazing_status: '',
        plaster_on_the_ceiling_status: '',
        hidden_lighting_status: '',
        arabic_bath_status: '',
        stairs_status: '',
        electric_garage_status: '',
        ordinary_garage_status: '',
        portals_status: '',
        heaters_status: '',
        french_bath_status: '',
        trans_other_component: '',
        additional_component_1: '',
        additional_component_2: '',
        additional_component_3: '',
        additional_component_4: '',
        additional_component_value_1: '',
        additional_component_value_2: '',
        additional_component_value_3: '',
        additional_component_value_4: '',
        finishing_condition: '',
        latitude: '',
        longitude: '',
        instrument_files: [],
        coordinate_type: 1,
        property_notes: '',
        property_condition: '',
        construction_condition: '',
        occupancy_status: '',
        northern_border: '',
        eastern_border: '',
        western_border: '',
        southern_border: '',
        tall_northern: '',
        tall_eastern: '',
        tall_western: '',
        tall_southern: '',
        north_facade: '',
        eastern_facade: '',
        western_facade: '',
        south_facade: '',
        masjid: '',
        masjid_note: '',
        masjid_distance: '',
        market: '',
        market_note: '',
        market_distance: '',
        medical_facility: '',
        medical_facility_note: '',
        medical_facility_distance: '',
        security_facility: '',
        security_facility_note: '',
        security_facility_distance: '',
        public_garden: '',
        public_garden_note: '',
        public_garden_distance: '',
        educational_facility: '',
        educational_facility_note: '',
        educational_facility_distance: '',
        government_office: '',
        government_office_note: '',
        government_office_distance: '',
        highway: '',
        highway_note: '',
        highway_distance: '',
        is_telephone: '',
        water_meter: '',
        water_meter_number: '',
        electric_meter: '',
        electric_meter_number: '',
        sanitation: '',
        resident_opinion: '',
        scope_research_sources_information: '',
        unfinished_n_maintenance: '',
        notes_shortcomings: '',
        important_notes: '',
        private_notes: '',
        reason_for_comment: '',
        recommendation: '',
        land_area: '',
        construction_age: '',
        basement_space: '',
        annexes_space: '',
        num_floors_residential_villas: '',
        conforms_building_permit: '',
        internal_preview: '',
        external_preview: '',
        review_note: '',
        trans_finishing_status: '',
        trans_finishing_internal: ['نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من رخام فاخر، نوعية الأبواب الداخلية، نوعية العزل، نوعية الشبابيك، مكونات الجدران الخارجية تكون مزدوجة، نوعية التسليك والسباكة، نوعية الدهان الداخلي، أعمال الجبس بأشكال هندسية وجودتها، تكييف مركزي، مصعد، جودة عمال التشطيب.', 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من السيراميك، نوعية الأبواب الداخلية، نوعية العزل، نوعية الشبابيك، ، نوعية التسليك والسباكة، نوعية الدهان الداخلي، أعمال الجبس وجودتها، التكييف منفصل (سبيلت).', 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من السيراميك العادي أو بلاط بلدي لفرش الموكيت، نوعية الأبواب الداخلية، لا يوجد عوازل، الشبابيك عادية جداً، نوعية التسليك والسباكة، نوعية الدهان الداخلي، لا يوجد جبس بالأسقف، نوعية التكييف شباك.'],
        trans_finishing_external: ['الواجهات من حجر طبيعي أو دهان ذو جودة عالية، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية', 'الواجهات من حجر أو دهان، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية غالباً من السيراميك، مكونات الجدران الخارجية تكون مزدوجة', 'الواجهات دهان، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية غالباً من بلاط بلدي،'],
        cm_land_space: '',
        cm_land_price: '',
        cm_land_s_p_total: '',
        cm_building_space: '',
        cm_building_price: '',
        cm_building_s_p_total: '',
        cm_basement_space: '',
        cm_basement_price: '',
        cm_basement_s_p_total: '',
        cm_supplement_space: '',
        cm_supplement_price: '',
        cm_supplement_s_p_total: '',
        cm_fences_space: '',
        cm_fences_price: '',
        cm_fences_s_p_total: '',
        cm_other_title: '',
        cm_other_space: '',
        cm_other_price: '',
        cm_other_s_p_total: '',
        cm_method_total: '',
        cm_space_total: '',
        cm_space_price_average: '',
        cm_exchange_note: '',
        cm_exchange_value: '',
        cm_direct_costs_note: '',
        cm_direct_costs: '',
        cm_indirect_costs_note: '',
        cm_indirect_costs: '',
        cm_cost_total: '', // new
        cm_physical_deterioration_ratio: '',
        cm_physical_deterioration_value: '',
        cm_occupational_limitations_ratio: '',
        cm_occupational_limitations_value: '',
        cm_economic_obsolescence_ratio: '',
        cm_economic_obsolescence_value: '',
        cm_total_depreciation_ratio: '',
        cm_total_depreciation_value: '',
        cm_depreciation_buildings_ratio: '',
        cm_depreciation_buildings_value: '',
        cm_depreciation_s_business_ratio: '',
        cm_depreciation_s_business_value: '',
        cm_developer_earnings_ratio: '',
        cm_developer_earnings_value: '',
        cm_total_market_value: '',
        weights_market_value_relative_weights_roads_used: '',
        relative_market_value_relative_weights_roads_used: '',
        weights_market_value_income_capitalization: '',
        relative_market_value_income_capitalization: '',
        weights_market_value_cost: '',
        relative_market_value_cost: '',
        total_weights: '',
        market_value_weighting_number: '',
        market_value_weighting_text: '',
        cm_space: '',
        cm_operation_type: '',
        operation_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cm_price: '',
        cm_type: '',
        cm_mobile_number: '',
        cm_latitude: '',
        cm_longitude: '',
        cm_space_2: '',
        cm_operation_type_2: '',
        operation_date_2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cm_price_2: '',
        cm_type_2: '',
        cm_mobile_number_2: '',
        cm_latitude_2: '',
        cm_longitude_2: '',
        cm_space_3: '',
        cm_operation_type_3: '',
        operation_date_3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        cm_price_3: '',
        cm_type_3: '',
        cm_mobile_number_3: '',
        cm_latitude_3: '',
        cm_longitude_3: '',
        cm_time_factor_adjustment: '',
        cm_time_factor_adjustment_2: '',
        cm_time_factor_adjustment_3: '',
        cm_settlement_financing_terms: '',
        cm_settlement_financing_terms_2: '',
        cm_settlement_financing_terms_3: '',
        cm_settling_market_conditions: '',
        cm_settling_market_conditions_2: '',
        cm_settling_market_conditions_3: '',
        cm_total_funding_market_adjustments: '',
        cm_total_funding_market_adjustments_2: '',
        cm_total_funding_market_adjustments_3: '',
        cm_price_after_settling_financing_terms: '',
        cm_price_after_settling_financing_terms2: '',
        cm_price_after_settling_financing_terms3: '',
        cm_space_settlement: '',
        cm_space_settlement2: '',
        cm_space_settlement3: '',
        cm_other_settlement: '',
        cm_other_settlement2: '',
        cm_other_settlement3: '',
        cm_total_settlement: '',
        cm_total_settlement2: '',
        cm_total_settlement3: '',
        cm_selling_p_a_settlement: '',
        cm_selling_p_a_settlement2: '',
        cm_selling_p_a_settlement3: '',
        cm_relative_w_comparable_p: '',
        cm_relative_w_comparable_p2: '',
        cm_relative_w_comparable_p3: '',
        cm_contribution_comparative_p_relative_weight: '',
        cm_contribution_comparative_p_relative_weight2: '',
        cm_contribution_comparative_p_relative_weight3: '',
        cm_market_v_comparative_sales_method: '',
        cs_settlement_table: '',
        unit_name: '',
        rent_units: '',
        unit_number: '',
        shaghayir_maintenance: '',
        total_rent: '',
        net_income: '',
        unit_name2: '',
        rent_units2: '',
        unit_number2: '',
        shaghayir_maintenance2: '',
        total_rent2: '',
        net_income2: '',
        unit_name3: '',
        rent_units3: '',
        unit_number3: '',
        shaghayir_maintenance3: '',
        total_rent3: '',
        net_income3: '',
        total_annual_income: '',
        deduction_losses: '',
        total_actual_income: '',
        m_operating_c_expenditures: '',
        net_operating_income: '',
        capitalization_rate: '',
        market_v_income_c_method: '',
        trans_report_price: '',
        trans_name_subscriber_in_report: '',
        trans_commissions_percentage: '',
        trans_commissions_amount: '',
        trans_internal_notes: '',
        trans_currency: '',
        income_valuation: [
          {
            unit_name: '', // اسم الوحدة
            unit_number: '', // عدد الوحدة
            unit_rent: '', // ايجار الوحدة
            maintenance: '', // شغائر وصيانه
            total_rent: '', // مجموع الايجارات
            final_income: '', // صافي الدخل
            id: uuid.v4(),
          },
        ],
        images: [],
        achievement: {
          prop_current_price: '',
          status: '1',
          stages: [{
            id: uuid.v4(),
            details: '', // تفاصيل المرحلة
            cost: '', // التكلفه
            pc_to_cost: '', // النسبة إلى التكلفه
            pc_of_completion: '', // نسبة الانجاز
            achievement_value: '',
          }],
        },
        transactions_conditioners: [],
        trans_professional_standard: `طريقة استخراج القيمة: عن طريق دراسة المنطقة و تحليل أسعار العقارات التجارية والسكنية والعروض المشابهة للأرض و التكلفة للمباني بعد خصم نسبة الإهلاك.
المستندات المقدمة من طالب التقييم: هوية المالك - صك الملكية.
نطاق البحث: أسعار البيع للأرض بالحي، مدى توفر خدمات البنية التحتية و خدمات البنية الفوقية مثل المدارس والمستشفيات والحدائق وغيرها، اكتمال العمران في المنطقة المحيطة، نظام البناء في منطقة العقار.
طريقة اعتماد مسطحات البناء: عن طريق المستندات المقدمة من طالب التقييم.
مدة التقرير: تقرير التقييم صالح لمدة 90 يوما من تاريخ الاعتماد ما لم يطرأ أي تغير في منطقة العقار.
المستخدمون الآخرون بالتقرير: العميل المذكور أعلاه.
المدخلات الرئيسية: البيانات المتوفرة في الصك و رخصة البناء.
استنتاج القيمة والأسباب الرئيسية: تم استنتاج القيمة بالطريقة المذكورة أعلاه وذلك بت…`,
        trans_restrictions_publication: 'تعد عمليات التقييم والتقارير سرية للطرف الموجه ولمن يتم إحالتها إليه لغرض محدد مع عدم تحمل أي مسؤولية من أي نوع لأي طرف ثالث، ولا يجوز نشر هذا التقرير كاملا أو أي جزء منه أو الإشارة إليه في أي وثيقة أو بيان أو نشرة دورية أو في أي وسيلة تواصل مع أي طرف ثالث دون الحصول على موافقة مسبقة مكتوبة بالشكل والسياق الذي تظهر فيه',
        trans_evacuation_responsibility: 'يفيد فريق عمل (اسم الشركة) بأنه تم معاينة العقار و انه ليس لدينا اي مصلحة شخصية  او مادية  او  اي اهتمامات حالية او مستقبلية بالعقار موضع التقييم و ان ما تم تقديمه بالتقرير سليم وصحيح ، حي  تم رفع جميع البيانات من واقع السوق الحالي وجميع المعادلات المحددة ونتائج الاسعار المحددة والمرفقة بالتقرير مراجعة ومدققة وتم تحليلها .',
        trans_special_assumptions: `• نفترض بأن العقار ملكية مطلقة دون أي أعباء.
• تم اعتماد سعر متر الأرض بناء على العروض المشابهة المحيطة بالمنطقة وأخذ في الاعتبار ظروف السوق وعمل جدول تسويات للأرض.
• تم اعتماد القيمة السوقية للعقار بطريقة السوق ( المقارنة ).
• مصدر الملكية: صحة صور المستندات المقدمه لنا على مسؤولية العميل وتم افتراض صحتها.
• تم التقييم في ظل جائجة كورونا وهذة الفترة التعامل مع عدم اليقين في اوقات اضطراب حاله وظروف السوق.
• في 11 مارس 2020 صنفت منظمة الصحة العالمية فيروس كورونا المستجد COVID-19 بأنه وباء عالمي. مما أحدث تأثيراً واضحاً على الاقتصادات والأسواق العالمية والمحلية وبناء عليه تم اتخاذ العديد من الإجراءات الرسمية محلياً وعالمياً والتي من شأنها أن تؤثر على جميع القطاعات.`,
        acknowledgment_independence: 'الشركة غير مسؤولة عن صحة الصكوك والفسوحات والمستندات المقدمة من الطرف الثاني (العميل) صحة التراخيص الخاصة بالعقار موضع التقييم وتحت مسؤوليته .',

      },
      marker: { lat: 24.7468754, lng: 39.9600269 },
      center: { lat: 24.7468754, lng: 39.9600269 },
      // Real Data
      participants: [
        {
          participant: true,
        },
      ],
      // Fake Data
      airRows: 1,
      airRows2: 1,
      airRows3: 1,
      airRows4: 1,
      airRows5: 1,
      airRows6: 1,
      ex1: false,
      ex2: false,
      ex3: false,
      ex4: false,
      ex5: false,
      ex6: false,
      ex7: false,
      ex8: false,
      ex9: false,
      ex10: false,
      ex11: false,
      ex12: false,
      ex13: false,
      ex14: false,
      ex15: false,
      ex16: false,
      select: null,
      selected: null,
      row: null,
      moneyInputOptions: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 11,
        precision: 2,
      },
      evaluateType: ['evaluateType1'],
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      // Date Inputs
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      menu3: false,
      lat: 24.68773,
      long: 46.72185,
      // Images Section
      images: [

      ],
      imageSorting: [],
      // Map
      location: null,
      gettingLocation: false,
      errorCurLocation: null,
      // Finishing Textarea => التشطيبات
      outLux: 'الواجهات من حجر طبيعي أو دهان ذو جودة عالية، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية',
      inLux: 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من رخام فاخر، نوعية الأبواب الداخلية، نوعية العزل، نوعية الشبابيك، مكونات الجدران الخارجية تكون مزدوجة، نوعية التسليك والسباكة، نوعية الدهان الداخلي، أعمال الجبس بأشكال هندسية وجودتها، تكييف مركزي، مصعد، جودة عمال التشطيب.',
      outMed: 'الواجهات من حجر أو دهان، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية غالباً من السيراميك، مكونات الجدران الخارجية تكون مزدوجة',
      inMed: 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من السيراميك، نوعية الأبواب الداخلية، نوعية العزل، نوعية الشبابيك، ، نوعية التسليك والسباكة، نوعية الدهان الداخلي، أعمال الجبس وجودتها، التكييف منفصل (سبيلت).',
      outNorm: 'الواجهات دهان، نوعية الأبواب الخارجية، نوعية أرضيات الساحات الخارجية غالباً من بلاط بلدي،',
      inNorm: 'نوعية أرضيات المداخل والمجالس وصالات الطعام تتكون من السيراميك العادي أو بلاط بلدي لفرش الموكيت، نوعية الأبواب الداخلية، لا يوجد عوازل، الشبابيك عادية جداً، نوعية التسليك والسباكة، نوعية الدهان الداخلي، لا يوجد جبس بالأسقف، نوعية التكييف شباك.',
    }),
    // mounted () {
    //   this.getMap(this.lat, this.long)
    // },
    computed: {
      dragOptions () {
        return {
          animation: 200,
          disabled: false,
        }
      },
      isSelfBulding () {
        const sample = this.samplesList.find(sample => sample.id === this.data.sample_id)
        if (sample) {
          if (sample.name?.includes('البناء الذاتي') || sample.name?.includes('بناء ذاتي')) {
            return true
          }
        }

        return false
      },
      isPcToCostError () {
        if (this.data.achievement.status === '2') {
          if (this.data.achievement.stages?.reduce((s, a) => +a.pc_to_cost + +s, 0) > 100) {
            return true
          }
        }
        return false
      },
      updateCitesList: function () {
        // const citesList = [];
        const data = this.citesList.filter((city) => {
          if (city.regionId === this.data.region_id) {
            return city
          }
        })
        return data
      },
      updateNeighborhoodsList: function () {
        const data = this.neighborhoodsList.filter((neighborhood) => {
          if (neighborhood.cityId === this.data.city_id) {
            return neighborhood
          }
        })
        return data
      },
    },
    watch: {
      'data.cm_time_factor_adjustment': function () {
        this.setTotalFunding(1)
      },
      'data.cm_settlement_financing_terms': function () {
        this.setTotalFunding(1)
      },
      'data.cm_settling_market_conditions': function () {
        this.setTotalFunding(1)
      },
      'data.cm_space_settlement': function () {
        this.setTotalFunding(1)
      },
      'data.cm_other_settlement': function () {
        this.setTotalFunding(1)
      },

      'data.cm_time_factor_adjustment_2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_settlement_financing_terms_2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_settling_market_conditions_2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_space_settlement2': function () {
        this.setTotalFunding(2)
      },
      'data.cm_other_settlement2': function () {
        this.setTotalFunding(2)
      },

      'data.cm_time_factor_adjustment_3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_settlement_financing_terms_3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_settling_market_conditions_3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_space_settlement3': function () {
        this.setTotalFunding(3)
      },
      'data.cm_other_settlement3': function () {
        this.setTotalFunding(3)
      },
      // change the total
      'data.cm_total_funding_market_adjustments': function () {
        this.data.cm_price_after_settling_financing_terms = +this.data.cm_price + (this.data.cm_price * this.data.cm_total_funding_market_adjustments) / 100
      },
      'data.cm_price': function () {
        this.data.cm_price_after_settling_financing_terms = +this.data.cm_price + (this.data.cm_price * this.data.cm_total_funding_market_adjustments) / 100
        this.sellingAftersettlement(1)
      },

      'data.cm_total_funding_market_adjustments_2': function () {
        this.data.cm_price_after_settling_financing_terms2 = +this.data.cm_price_2 + (this.data.cm_price_2 * this.data.cm_total_funding_market_adjustments_2) / 100
      },
      'data.cm_price_2': function () {
        this.data.cm_price_after_settling_financing_terms2 = +this.data.cm_price_2 + (this.data.cm_price_2 * this.data.cm_total_funding_market_adjustments_2) / 100
        this.sellingAftersettlement(2)
      },
      'data.cm_total_funding_market_adjustments_3': function () {
        this.data.cm_price_after_settling_financing_terms3 = +this.data.cm_price_3 + (this.data.cm_price_3 * this.data.cm_total_funding_market_adjustments_3) / 100
      },
      'data.cm_price_3': function () {
        this.data.cm_price_after_settling_financing_terms3 = +this.data.cm_price_3 + (this.data.cm_price_3 * this.data.cm_total_funding_market_adjustments_3) / 100
        this.sellingAftersettlement(3)
      },

      // سعر البيع بعد التسويات
      'data.cm_total_settlement': function () {
        this.sellingAftersettlement(1)
      },
      'data.cm_total_settlement2': function () {
        this.sellingAftersettlement(2)
      },
      'data.cm_total_settlement3': function () {
        this.sellingAftersettlement(3)
      },

      // مساهمة العقارات المقارنة حسب الوزن النسبي
      'data.cm_selling_p_a_settlement': function () {
        this.contribution_comparative_p_relative_weight(1)
      },
      'data.cm_relative_w_comparable_p': function () {
        this.contribution_comparative_p_relative_weight(1)
      },

      'data.cm_selling_p_a_settlement2': function () {
        this.contribution_comparative_p_relative_weight(2)
      },
      'data.cm_relative_w_comparable_p2': function () {
        this.contribution_comparative_p_relative_weight(2)
      },

      'data.cm_selling_p_a_settlement3': function () {
        this.contribution_comparative_p_relative_weight(3)
      },
      'data.cm_relative_w_comparable_p3': function () {
        this.contribution_comparative_p_relative_weight(3)
      },

      // القيمة السوقية بطريقة البيوع المقارنة
      'data.cm_contribution_comparative_p_relative_weight': function () {
        this.cm_market_v_comparative_sales_method()
      },
      'data.cm_contribution_comparative_p_relative_weight2': function () {
        this.cm_market_v_comparative_sales_method()
      },
      'data.cm_contribution_comparative_p_relative_weight3': function () {
        this.cm_market_v_comparative_sales_method()
      },
      // تقييم الايجارات
      'data.income_valuation': {
        handler: function (val, oldVal) {
          this.data.total_annual_income = this.data.income_valuation?.reduce((p, c) => p + c.total_rent, 0)
          this.data.deduction_losses = this.data.income_valuation?.reduce((p, c) => p + c.deduction_losses_total, 0)
        },
        deep: true,
      },
      'data.total_annual_income': function () {
        // إجمالي الدخل الفعلي
        this.data.total_actual_income = this.data.total_annual_income - this.data.deduction_losses
        // صافي الدخل التشغيلي
        this.data.net_operating_income = this.data.total_actual_income - this.data.m_operating_c_expenditures
      },
      'data.deduction_losses': function () {
        // إجمالي الدخل الفعلي
        this.data.total_actual_income = this.data.total_annual_income - this.data.deduction_losses
      },
      // ناقصا النفقات التشغيلية والرأسمالية
      'data.m_operating_c_expenditures': function () {
        // صافي الدخل التشغيلي
        this.data.net_operating_income = this.data.total_actual_income - this.data.m_operating_c_expenditures
      },
      'data.total_actual_income': function () {
        this.data.net_operating_income = this.data.total_actual_income - this.data.m_operating_c_expenditures
      },

      // صافي الدخل التشغيلي
      'data.net_operating_income': function () {
        this.data.market_v_income_c_method = this.data.net_operating_income * (this.data.capitalization_rate || 1)
      },
      // معدل الرسملة (أ) عامل شراء السنوات
      'data.capitalization_rate': function () {
        this.data.market_v_income_c_method = this.data.net_operating_income * (this.data.capitalization_rate || 1)
      },

      // أسلوب التكلفه
      'data.cm_land_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_building_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_basement_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_supplement_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_fences_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },
      'data.cm_other_s_p_total': function () {
        this.data.cm_method_total = +this.data.cm_land_s_p_total + +this.data.cm_building_s_p_total + +this.data.cm_basement_s_p_total + +this.data.cm_supplement_s_p_total + +this.data.cm_fences_s_p_total + +this.data.cm_other_s_p_total
      },

      // cm_total_market_value
      'data.cm_method_total': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_cost_total': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_developer_earnings_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_depreciation_buildings_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_depreciation_s_business_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },
      'data.cm_total_depreciation_value': function () {
        this.data.cm_total_market_value = (+this.data.cm_method_total + +this.data.cm_cost_total + +this.data.cm_developer_earnings_value) -
          (+this.data.cm_depreciation_buildings_value + +this.data.cm_depreciation_s_business_value + +this.data.cm_total_depreciation_value)
      },

      // الترجيح
      // بطريقة البيوع المقارنة
      'data.weights_market_value_relative_weights_roads_used': function () {
        this.data.relative_market_value_relative_weights_roads_used = (this.data.weights_market_value_relative_weights_roads_used * this.data.cm_market_v_comparative_sales_method) / 100
      },
      'data.cm_market_v_comparative_sales_method': function () {
        this.data.relative_market_value_relative_weights_roads_used = (this.data.weights_market_value_relative_weights_roads_used * this.data.cm_market_v_comparative_sales_method) / 100
      },
      // بطريقة رسملة الدخل
      'data.weights_market_value_income_capitalization': function () {
        this.data.relative_market_value_income_capitalization = (this.data.weights_market_value_income_capitalization * this.data.market_v_income_c_method) / 100
      },
      'data.market_v_income_c_method': function () {
        this.data.relative_market_value_income_capitalization = (this.data.weights_market_value_income_capitalization * this.data.market_v_income_c_method) / 100
      },
      //  بطريقة التكلفة
      'data.weights_market_value_cost': function () {
        this.data.relative_market_value_cost = (this.data.weights_market_value_cost * this.data.cm_total_market_value) / 100
      },
      'data.cm_total_market_value': function () {
        this.data.relative_market_value_cost = (this.data.weights_market_value_cost * this.data.cm_total_market_value) / 100
      },
      // القيمة السوقية بعد الترجيح رقماً
      // القيمة السوقية بعد الترجيح كتابة
      'data.relative_market_value_cost': function () {
        const total = +this.data.relative_market_value_cost + +this.data.relative_market_value_income_capitalization + +this.data.relative_market_value_relative_weights_roads_used
        this.data.market_value_weighting_number = total
        this.data.market_value_weighting_text = (isNaN(total) || total <= 0) ? '' : new NumbersToWords(total, 'SAR').parse()
      },
      'data.relative_market_value_income_capitalization': function () {
        const total = +this.data.relative_market_value_cost + +this.data.relative_market_value_income_capitalization + +this.data.relative_market_value_relative_weights_roads_used
        this.data.market_value_weighting_number = total
        this.data.market_value_weighting_text = (isNaN(total) || total <= 0) ? '' : new NumbersToWords(total, 'SAR').parse()
      },
      'data.relative_market_value_relative_weights_roads_used': function () {
        const total = +this.data.relative_market_value_cost + +this.data.relative_market_value_income_capitalization + +this.data.relative_market_value_relative_weights_roads_used
        this.data.market_value_weighting_number = total
        this.data.market_value_weighting_text = (isNaN(total) || total <= 0) ? '' : new NumbersToWords(total, 'SAR').parse()
      },

      // تقييم الانجاز
      'data.achievement.stages': {
        handler: function (n, m) {
          if (n.length !== m.length) {
            if (this.data.achievement.status === '1') {
              this.changeCost()
            }
          }
        },
        deep: true,
      },
      'data.achievement.prop_current_price': function () {
        if (this.data.achievement.status === '2') {
          this.data.achievement.stages = this.data.achievement.stages.map(s => ({
            ...s,
            cost: (this.data.achievement.prop_current_price * s.pc_to_cost) / 100,
          // pc_to_cost: ((s.cost / this.data.achievement.prop_current_price) * 100).toFixed(2),
          // achievement_value: (s.pc_of_completion * s.cost) / 100,
          }))
        }
      },
    },
    mounted () {
      // * get the height of the main bar
      // const appBar = this.$root.$el.querySelector('#app-bar').clientHeight
      // this.$nextTick(function () {
      //   console.log(typeof this.$refs, Object.keys(this.$refs), this.$refs)
      //   console.log(this.$refs.bar)
      // })
      // console.log(this.$root.$el.getElementById('transaction-bar'))
      // this.$root.$el.querySelector('#transaction-bar').style.top = `${appBar}px`
      // console.log(appBar)
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      // this.fetchOneItem(this.$route.params.id)
      // this.getCurrentLocation()
      // this.getUsers()
      // this.getRegions()
      // ! TODO : move these to "watch" when get cites by region id id avaliable
      // this.getCites()
      // ! TODO : move these to "watch" when get Neighborhoods by city id id avaliable
      // this.getNeighborhoods()
      this.getCites()
            // * المناطق
      this.getRegions()
            // * الحي
      this.getNeighborhoods()
            // * استخدام العقار
      this.getPropertyRatings()
            // * نوع العقار
      this.getPropertyTypes()
            // * حالة البناء
      this.getConstructionCondition()
            // * حالة الإشغال
      this.getWorkingStatuses()

      this.getSamples()
      this.getCustomers()
      this.getEvaluationPurpose()
      // new
      this.getReportTypes()
      this.getValueHypothesis()
      this.getBasiLists()
      this.getCurrencyList()
      // ! TODO : change this later with proper method
      this.getUsers()
    },
    methods: {
      /**
       * ? handle change in property details
       */
      handleOpenPanel: function (value) {
        if (!Object.prototype.hasOwnProperty.call(this.pandelHasBeenOpened, value)) {
          this.pandelHasBeenOpened[value] = true
          this.handlePandelHasBeenOpened(value)
        }
      },
      handlePandelHasBeenOpened: function (value) {
        switch (value) {
          case 3:
            // * المدن
            this.getCites()
            // * المناطق
            this.getRegions()
            // * الحي
            this.getNeighborhoods()
            // * استخدام العقار
            this.getPropertyRatings()
            // * نوع العقار
            this.getPropertyTypes()
            // * حالة البناء
            this.getConstructionCondition()
            // * حالة الإشغال
            this.getWorkingStatuses()

            break
          default:
            break
        }
      },
      handleScroll: function (ref) {
        const container = this.$el.querySelector(`#item-${ref}`)
        container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      },
      deleteFile: function (id, name, index) {
        if (name === 'attached_files') {
          this.data[name] = []
        } else {
          this.data[name].splice(index, 1)
        }
        this.data.files_to_deleted.push(+id)
      },
      fetchOneItem: async function (id) {
        const { data } = await TransactionsServices.fetchOneItem(id)
        for (const key in data) {
          if (data[key] === null) {
            this.data[key] = this.data[key]
          } else {
            this.data[key] = data[key]
          }
        }

        if (this.data.trans_finishing_internal?.length === 0) {
          this.data.trans_finishing_internal = data.trans_finishing_internal
        }

        if (this.data.trans_finishing_external?.length === 0) {
          this.data.trans_finishing_external = data.trans_finishing_external
        }

        /**
         * ? sort images based on it's sort_number
         */

        this.data.images.sort((a, b) => {
          if (a.sort_number > b.sort_number) {
            return 1
          } else if (a.sort_number < b.sort_number) {
            return -1
          }
          return 0
        })

        /**
         * * default values for transactions_conditioners
         */
        if (!data.transactions_conditioners || data.transactions_buildings.length === 0) {
          this.data.transactions_conditioners = [
            { type: 'مركزي', compound: 0, not_compound: 0 },
            { type: 'منفصل', compound: 0, not_compound: 0 },
            { type: 'شباك', compound: 0, not_compound: 0 },
            { type: 'كونسيلد', compound: 0, not_compound: 0 },
          ]
        }

        /**
         * *
         */

        if (!data.transactions_buildings || data.transactions_buildings.length === 0) {
          this.data.transactions_buildings = [
            { building_type: 'الأرض', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'القبو', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'دور أرضي', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'دور أول', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'الملاحق العلوية', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'الملاحق السفلية', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'الأسوار', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
            { building_type: 'أخرى', space: 0, price: 0, total: 0, __uuid: uuid.v4() },
          ]
        }

        this.data.instrument_files = this.data.media.filter(i => i.collection_name === 'instrument_file')
        this.data.assignment_letter_files = this.data.media.filter(i => i.collection_name === 'assignment_letter_file')
        this.data.attached_files = this.data.media.filter(i => i.collection_name === 'attached_file')
        this.data.schema_files = this.data.media.filter(i => i.collection_name === 'schema_file')
        /**
         * * formating the water_meter_number & electric_meter_number to be an array
         */
        function split (string) {
          if (!string) {
            return ['']
          } else {
            return string.split(';')
          }
        }

        function addIdAndString (arrayOfString) {
          return arrayOfString.map(item => ({
            number: item,
            id: uuid.v4(),
          }))
        }

        this.data.water_meter_number = addIdAndString(split(this.data.water_meter_number))
        this.data.electric_meter_number = addIdAndString(split(this.data.electric_meter_number))

        //         data.achievement = !data.achievement ? {
        //           prop_current_price: '',
        //           status: '1',
        //           stages: [
        //             {
        //               id: '123123-c213-123c123',
        //               details: '',
        //               cost: '',
        //               pc_to_cost: '',
        //               pc_of_completion: '',
        //               achievement_value: '',
        //             },
        //           ],
        //         } : data.achievement

        //         this.data = {
        //           ...data,
        //           trans_professional_standard: `طريقة استخراج القيمة: عن طريق دراسة المنطقة و تحليل أسعار العقارات التجارية والسكنية والعروض المشابهة للأرض و التكلفة للمباني بعد خصم نسبة الإهلاك.
        // المستندات المقدمة من طالب التقييم: هوية المالك - صك الملكية.
        // نطاق البحث: أسعار البيع للأرض بالحي، مدى توفر خدمات البنية التحتية و خدمات البنية الفوقية مثل المدارس والمستشفيات والحدائق وغيرها، اكتمال العمران في المنطقة المحيطة، نظام البناء في منطقة العقار.
        // طريقة اعتماد مسطحات البناء: عن طريق المستندات المقدمة من طالب التقييم.
        // مدة التقرير: تقرير التقييم صالح لمدة 90 يوما من تاريخ الاعتماد ما لم يطرأ أي تغير في منطقة العقار.
        // المستخدمون الآخرون بالتقرير: العميل المذكور أعلاه.
        // المدخلات الرئيسية: البيانات المتوفرة في الصك و رخصة البناء.
        // استنتاج القيمة والأسباب الرئيسية: تم استنتاج القيمة بالطريقة المذكورة أعلاه وذلك بت…`,
        //           trans_restrictions_publication: 'تعد عمليات التقييم والتقارير سرية للطرف الموجه ولمن يتم إحالتها إليه لغرض محدد مع عدم تحمل أي مسؤولية من أي نوع لأي طرف ثالث، ولا يجوز نشر هذا التقرير كاملا أو أي جزء منه أو الإشارة إليه في أي وثيقة أو بيان أو نشرة دورية أو في أي وسيلة تواصل مع أي طرف ثالث دون الحصول على موافقة مسبقة مكتوبة بالشكل والسياق الذي تظهر فيه',
        //           trans_evacuation_responsibility: 'يفيد فريق عمل (اسم الشركة) بأنه تم معاينة العقار و انه ليس لدينا اي مصلحة شخصية  او مادية  او  اي اهتمامات حالية او مستقبلية بالعقار موضع التقييم و ان ما تم تقديمه بالتقرير سليم وصحيح ، حي  تم رفع جميع البيانات من واقع السوق الحالي وجميع المعادلات المحددة ونتائج الاسعار المحددة والمرفقة بالتقرير مراجعة ومدققة وتم تحليلها .',
        //           trans_special_assumptions: `• نفترض بأن العقار ملكية مطلقة دون أي أعباء.
        // • تم اعتماد سعر متر الأرض بناء على العروض المشابهة المحيطة بالمنطقة وأخذ في الاعتبار ظروف السوق وعمل جدول تسويات للأرض.
        // • تم اعتماد القيمة السوقية للعقار بطريقة السوق ( المقارنة ).
        // • مصدر الملكية: صحة صور المستندات المقدمه لنا على مسؤولية العميل وتم افتراض صحتها.
        // • تم التقييم في ظل جائجة كورونا وهذة الفترة التعامل مع عدم اليقين في اوقات اضطراب حاله وظروف السوق.
        // • في 11 مارس 2020 صنفت منظمة الصحة العالمية فيروس كورونا المستجد COVID-19 بأنه وباء عالمي. مما أحدث تأثيراً واضحاً على الاقتصادات والأسواق العالمية والمحلية وبناء عليه تم اتخاذ العديد من الإجراءات الرسمية محلياً وعالمياً والتي من شأنها أن تؤثر على جميع القطاعات.`,
        //         }
      },
      // test
      getTotalSpace: function () {
        this.data.cm_space_total = Number.parseFloat(+this.data.cm_building_space + +this.data.cm_basement_space + +this.data.cm_supplement_space + +this.data.cm_other_space).toFixed(2)
      },
      getSpacePriceAverage: function () {
        let n = 0
        if (+this.data.cm_land_price > 0) {
          n++
        }
        if (+this.data.cm_fences_price > 0) {
          n++
        }
        if (+this.data.cm_building_price > 0) {
          n++
        }
        if (+this.data.cm_basement_price > 0) {
          n++
        }
        if (+this.data.cm_supplement_price > 0) {
          n++
        }
        if (+this.data.cm_other_price > 0) {
          n++
        }
        // console.log(n)
        this.data.cm_space_price_average = (+this.data.cm_land_price + +this.data.cm_other_price + +this.data.cm_fences_price + +this.data.cm_building_price + +this.data.cm_basement_price + +this.data.cm_supplement_price) / n
      },
      // samples List
      getSamples: async function () {
        const { data } = await SamplesServices.getAllItems()
        this.samplesList = data.filter(sample => sample.status === '1')
      },
      // ! TODO : cheange this with proper endpoint
      getUsers: async function () {
        const { data } = await UsersServices.getAllItems()
        // console.log(data)
        // appraisersList: [],
        // previewsList: [],
        // coordinatorsList: [],
        const usersList = data.data.map(({ id, name }) => {
          return ({
            id,
            name,
          })
        })

        this.appraisersList = usersList
        this.previewsList = usersList
        this.coordinatorsList = usersList
      },
      // get current customers
      getCustomers: async function () {
        // console.log('hi')
        const { data } = await CustomersService.getAllItems()
        this.customersList = data.data.map((customer) => {
          return ({
            id: customer.id,
            name: customer.cs_name,
          })
        })
        // console.log(this.customersList)
        // console.log(await CustomersService.getAllItems())
        // console.log(items)
      },
      // EvaluationPurpose
      getEvaluationPurpose: async function () {
        const { data } = await EvaluationPurposeService.getAllItems()
        this.evaluationPurposeList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },

      getReportTypes: async function () {
        const { data } = await ReportTypesServices.getAllItems()
        this.staticLists.trans_Report_type = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      // فرضية القيمة
      getValueHypothesis: async function () {
        const { data } = await ValueHypothesisListsServices.getAllItems()
        this.feesUsedValuesList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      // أساس القيمة
      getBasiLists: async function () {
        const { data } = await ValueBasiListsServices.getAllItems()
        this.valuesUsedList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      // staticLists.trans_construction_condition
      getConstructionCondition: async function () {
        const { data } = await constructionConditionsService.getAllItems()
        this.staticLists.trans_construction_condition = data.data.map(({ id, name }) => ({
          id: String(id), name,
        }))
      },
      // staticLists.trans_occupancy_status
      getWorkingStatuses: async function () {
        const { data } = await WorkingStatusesServices.getAllItems()
        this.staticLists.trans_occupancy_status = data.data.map(({ id, name }) => ({
          id: String(id), name,
        }))
      },

      getCurrencyList: async function () {
        const { data } = await EvaluationCurrenciesServices.getAllItems()
        this.transCurrencyList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      // Get Cureent Location
      getCurrentLocation: function () {
        // do we support geolocation
        if (!('geolocation' in navigator)) {
          this.errorCurLocation = 'Geolocation is not available.'
          return
        }
        this.gettingLocation = true
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
          this.gettingLocation = false
          // this.location = pos
          this.data.latitude = pos.coords.latitude
          this.data.longitude = pos.coords.longitude
          // make the center of the make equal to the lat and long of the current location
          this.$refs.vPlusMap.$mapPromise.then((map) => {
            map.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          })
          this.center.lat = this.data.latitude
          this.center.lng = this.data.longitude
          // this.getMap(this.location.coords.latitude, this.location.coords.longitude)
        }, err => {
          this.gettingLocation = false
          this.errorCurLocation = err.message
        })
      },
      updateCoordinates: function (location) {
        this.data.latitude = (location.latLng.lat() || 0).toFixed(6)
        this.data.longitude = (location.latLng.lng() || 0).toFixed(6)
      },
      updateCenter: function () {
        this.center.lng = +this.data.longitude
        this.center.lat = +this.data.latitude
        this.$refs.vPlusMap.$mapPromise.then((map) => {
          map.panTo({ lat: +this.data.latitude, lng: +this.data.longitude })
        })
      },
      changeLatAndLong: function () {
        this.$refs.vPlusMap.$mapPromise.then((map) => {
          map.panTo({ lat: +this.data.latitude, lng: +this.data.longitude })
        })
        this.data.latitude = (+this.data.latitude || 0).toFixed(6)
        this.data.longitude = (+this.data.longitude || 0).toFixed(6)
        this.center.lng = +this.data.longitude
        this.center.lat = +this.data.latitude
      },
      // Get Location debendes on 2 inputs
      getMap: function (x, y) {
        loader.load().then(function (google) {
          // Regular Map
          var center = new google.maps.LatLng(x, y) // Center
          const mapOptions = {
            zoom: 13,
            center: center,
            mapId: '2bf1cba222371325',
            scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
            disableDefaultUI: true, // a way to quickly hide all controls
            zoomControl: true,
          }
          // eslint-disable-next-line no-new
          var map = new google.maps.Map(
            document.getElementById('map'),
            mapOptions
          )
          // eslint-disable-next-line no-new
          new google.maps.Marker({
            position: center,
            map,
            title: 'Hello World!',
          })
        })
      },
      // Copy Lat & Long of map
      doCopy: function () {
        copyText(this.data.latitude + ',' + this.data.longitude, undefined, (error, event) => {
          if (error) {
            alert('Can not copy')
            console.log(error)
          } else {
            // alert('Copied')
            Swal.fire({
              title: 'تم النسخ',
              icon: 'success',
              timer: 1000,
              showCancelButton: false,
              showConfirmButton: false,
            })
          }
        })
      },
      // Show Image After Upload
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        // var image = new Image()
        const item = { status: '1', image: false, id: uuid.v4(), sort_number: 1, type: 'add' }
        const images = this.data.images
        const reader = new FileReader()
        reader.onload = (e) => {
          item.image = e.target.result
          images.push(item)
          images.sort((a, b) => {
            if (+a.status === 0 && +b.status === 1) {
              return 1
            } else if (+b.status === 0 && +a.status === 1) {
              return -1
            }
            return 0
          })

          this.data.images = images
        }
        reader.readAsDataURL(file)
      },
      removeImage: function (item, index) {
        if (item.image_url) {
          this.data.images_ids_deleted.push(+item.media_id)
        }
        // item.image = false
        this.data.images.splice(index, 1)
        // Remove sort of image
        // this.imageSorting.splice(index, 1)
      },
      hideImage: function (image, index) {
        //  const imageIndex = this.images.findIndex(image => image.id === id)
        this.data.images[index].status = this.data.images[index].status === '1' ? '0' : '1'
        // if (this.data.images[index].image_url) {
        this.data.images[index].type = 'edit'
        console.log(this.data.images[index])
        // }
        this.data.images.sort((a, b) => {
          if (+a.status === 0 && +b.status === 1) {
            return 1
          } else if (+b.status === 0 && +a.status === 1) {
            return -1
          }
          return 0
        })
        // this.images.push(this.images.splice(index, 1)[0])
      },
      dragChange: function (...args) {
        console.log(args)
      },
      dargUpdate: function (...args) {
        console.log(args)
      },
      // Adding & Remove Participant
      addParticipant: function () {
        this.participants.push({ participant: true })
      },
      removeParticipant: function (item) {
        item.participant = false
      },

      // cm_total_funding_market_adjustments
      setTotalFunding: function (n) {
        switch (n) {
          case 1:
            this.data.cm_total_funding_market_adjustments = +this.data.cm_time_factor_adjustment + +this.data.cm_settlement_financing_terms + +this.data.cm_settling_market_conditions
            this.data.cm_total_settlement = +this.data.cm_space_settlement + +this.data.cm_other_settlement + +this.data.cm_time_factor_adjustment + +this.data.cm_settlement_financing_terms + +this.data.cm_settling_market_conditions
            break
          case 2:
            this.data.cm_total_funding_market_adjustments_2 = +this.data.cm_time_factor_adjustment_2 + +this.data.cm_settlement_financing_terms_2 + +this.data.cm_settling_market_conditions_2
            this.data.cm_total_settlement2 = +this.data.cm_space_settlement2 + +this.data.cm_other_settlement2 + +this.data.cm_time_factor_adjustment_2 + +this.data.cm_settlement_financing_terms_2 + +this.data.cm_settling_market_conditions_2
            break
          case 3:
            this.data.cm_total_funding_market_adjustments_3 = +this.data.cm_time_factor_adjustment_3 + +this.data.cm_settlement_financing_terms_3 + +this.data.cm_settling_market_conditions_3
            this.data.cm_total_settlement3 = +this.data.cm_space_settlement3 + +this.data.cm_other_settlement3 + +this.data.cm_time_factor_adjustment_3 + +this.data.cm_settlement_financing_terms_3 + +this.data.cm_settling_market_conditions_3
            break
        }
      },
      // سعر البيع بعد التسويات
      sellingAftersettlement: function (n) {
        switch (n) {
          case 1:
            this.data.cm_selling_p_a_settlement = +this.data.cm_price * (this.data.cm_total_settlement / 100)
            break
          case 2:
            this.data.cm_selling_p_a_settlement2 = +this.data.cm_price_2 * (this.data.cm_total_settlement2 / 100)
            break
          case 3:
            this.data.cm_selling_p_a_settlement3 = +this.data.cm_price_3 * (this.data.cm_total_settlement3 / 100)
            break
        }
      },
      // مساهمة العقارات المقارنة حسب الوزن النسبي
      contribution_comparative_p_relative_weight: function (n) {
        switch (n) {
          case 1:
            this.data.cm_contribution_comparative_p_relative_weight = +this.data.cm_selling_p_a_settlement * (this.data.cm_relative_w_comparable_p / 100)
            break
          case 2:
            this.data.cm_contribution_comparative_p_relative_weight2 = +this.data.cm_selling_p_a_settlement2 * (this.data.cm_relative_w_comparable_p2 / 100)
            break
          case 3:
            this.data.cm_contribution_comparative_p_relative_weight3 = +this.data.cm_selling_p_a_settlement3 * (this.data.cm_relative_w_comparable_p3 / 100)
            break
        }
      },
      cm_market_v_comparative_sales_method: function () {
        this.data.cm_market_v_comparative_sales_method = +this.data.cm_contribution_comparative_p_relative_weight + +this.data.cm_contribution_comparative_p_relative_weight2 + +this.data.cm_contribution_comparative_p_relative_weight3
      },

      // تقييم الايجارات
      removeItemFromIncomeValuation: function (id) {
        this.data.income_valuation = this.data.income_valuation.filter(item => {
          if (item.id !== id) {
            return item
          }
        })
      },
      updateTotalRent: function (id) {
        this.data.income_valuation = this.data.income_valuation.map(item => {
          if (item.id === id) {
            const totalRent = +item.unit_number * +item.unit_rent
            const deductionLossesTotal = +item.unit_number * (+item.deduction_losses || 0)
            return ({
              ...item,
              total_rent: totalRent,
              deduction_losses_total: deductionLossesTotal,
              final_income: totalRent - deductionLossesTotal,
            })
          }
          return item
        })
      },

      // تقييم الارض والمباني
      setMultiOfSpaceAndPrice: function (uuid) {
        // const index = this.data.transactions_buildings.findIndex(b => b.uuid === uuid)
        // this.data.transactions_buildings[index].total = this.data.transactions_buildings[index].space * this.data.transactions_buildings[index].price
        let totalSpace = 0
        let totalPriceSpace = 0
        let counterTotalPriceSpace = 0

        this.data.transactions_buildings.forEach(b => {
          b.total = b.space * b.price
          if (b.building_type !== 'الأرض' && b.building_type !== 'الأسوار') {
            totalSpace += +b.space
          }

          if (+b.price !== 0) {
            counterTotalPriceSpace++
            totalPriceSpace += +b.price
          }
        })
        this.data.cm_method_total = this.data.transactions_buildings.reduce((p, c) => {
          return +p + +c.total
        }, 0)

        this.data.cm_space_total = totalSpace
        this.data.cm_space_price_average = totalPriceSpace / counterTotalPriceSpace
        // console.log(this.data.cm_method_total)
        // this.data[`cm_${name}_s_p_total`] = this.data[`cm_${name}_space`] * this.data[`cm_${name}_price`]
      },
      addNewFloor: function (index) {
        const newItemsLength = this.data.transactions_buildings.filter(item => item.building_type.includes('دور مكرر')).length
        const newItemName = 'دور مكرر ' + (newItemsLength + 1)
        const newItem = { building_type: newItemName, space: 0, price: 0, total: 0, __uuid: uuid.v4() }
        this.data.transactions_buildings.splice((index + 1) + newItemsLength, 0, newItem)
      },
      removeNewFloor: function (index) {
        this.data.transactions_buildings.splice(index, 1)
        // const newItems = this.data.transactions_buildings.filter(item => item.building_type.includes('دور مكرر'))
        let counter = 1
        // * rename the building name
        for (let index = 0; index < this.data.transactions_buildings.length; index++) {
          if (this.data.transactions_buildings[index].building_type.includes('دور مكرر')) {
            this.data.transactions_buildings[index].building_type = 'دور مكرر ' + counter
            counter++
          }
        }

        this.setMultiOfSpaceAndPrice()
      },
      // أسلوب التكلفه
      setCostTotal: function () {
        this.data.cm_cost_total = +this.data.cm_exchange_value + +this.data.cm_direct_costs + +this.data.cm_indirect_costs
      },
      setDepreciationValueAndTotal: function (name) {
        this.data[`cm_${name}_value`] = (this.data[`cm_${name}_ratio`] * this.data.cm_cost_total) / 100

        this.data.cm_total_depreciation_ratio = +this.data.cm_physical_deterioration_ratio + +this.data.cm_occupational_limitations_ratio + +this.data.cm_economic_obsolescence_ratio
        this.data.cm_total_depreciation_value = +this.data.cm_physical_deterioration_value + +this.data.cm_occupational_limitations_value + +this.data.cm_economic_obsolescence_value
      },

      setDepreciationValue: function (name) {
        this.data[`cm_${name}_value`] = (this.data[`cm_${name}_ratio`] * this.data.cm_cost_total) / 100
      },

      // تقييم الانجز
      changeAchievmentStatus: function (id) {
        const needToChange = id !== this.data.achievement?.status
        if (needToChange) {
          // this.data.achievement?.status = this.data.achievement?.status === '1' ? '2' : '1'
          this.data.achievement.status = id
          this.data.achievement.stages = [{
            id: uuid.v4(),
            details: '',
            cost: '',
            pc_to_cost: '',
            pc_of_completion: '',
            achievement_value: '',
          }]
          this.data.achievement.prop_current_price = ''
        }
      },
      addNewStage: function () {
        this.data.achievement.stages.push({
          id: uuid.v4(),
          details: '',
          cost: '',
          pc_to_cost: '',
          pc_of_completion: '',
          achievement_value: '',
        })
      },
      removeStage: function (id) {
        this.data.achievement.stages = this.data.achievement.stages.filter(s => s.id !== id)
      },
      changeCost: function (id) {
        if (this.data.achievement.status === '1') {
          this.data.achievement.prop_current_price = this.data.achievement.stages.reduce((p, c) => +p + +c.cost, 0)
        }
        this.data.achievement.stages = this.data.achievement.stages.map(s => ({
          ...s,
          pc_to_cost: ((s.cost / this.data.achievement.prop_current_price) * 100).toFixed(2),
          achievement_value: (s.pc_of_completion * s.cost) / 100,
        }))
      },
      changePcToCost: function (id, index) {
        // this.data.achievement.stages[index].pc_to_cost = (+this.data.achievement.stages[index].pc_to_cost || 0).toFixed(2)
        // console.log(this.data.achievement.stages[index].pc_to_cost)
        this.data.achievement.stages = this.data.achievement.stages.map(s => ({
          ...s,
          cost: (this.data.achievement.prop_current_price * s.pc_to_cost) / 100,
          // pc_to_cost: ((s.cost / this.data.achievement.prop_current_price) * 100).toFixed(2),
          // achievement_value: (s.pc_of_completion * s.cost) / 100,
        }))
      },
      getRegions: async function () {
        const { data } = await RegionsServices.getAllItems()
        this.regionsList = data.data.map(({ id, name }) => ({
          id, name,
        }))
      },
      getCites: async function () {
        const { data } = await CitesServices.getAllItems()
        this.citesList = data.data.map((city) => ({
          id: city.id,
          name: city.name,
          regionId: city.region_id,
        }))
      },
      getNeighborhoods: async function () {
        const { data } = await NeighborhoodsServices.getAllItems()
        this.neighborhoodsList = data.data.map((neighborhood) => ({
          id: neighborhood.id,
          name: neighborhood.name,
          cityId: neighborhood.city_id,
        }))
      },
      // property ratings
      getPropertyRatings: async function () {
        const { data } = await PropertyRatingsServices.getAllItems()
        this.propRatingsList = data.data.map((pr) => {
          return {
            id: pr.id,
            name: pr.name,
          }
        })
      },
      // property types
      getPropertyTypes: async function () {
        const { data } = await PropertyTypesServices.getAllItems()
        this.propTypeList = data.data.map((pt) => {
          return {
            id: pt.id,
            name: pt.name,
          }
        })
      },

      save: async function (status) {
        console.log(status)
        this.dataLoading = true
        /**
         * ? converting meters array to string
         */
        this.data.water_meter_number = this.data.water_meter_number.map(item => item.number).join(';')
        this.data.electric_meter_number = this.data.electric_meter_number.map(item => item.number).join(';')
        /**
         * ? remove uuid from images
         */
        // console.log(this.images)
        // this.data.images.forEach((image) => {
        //   if (typeof image.id === 'string') {
        //     delete image.id
        //   }
        // })
        /**
         * ? change sort_number in image based on it's index
         */
        this.data.images.forEach((image, index) => {
          if (image.image_url) {
            image.type = 'edit'
          } else {
            image.type = 'add'
          }
          image.sort_number = index
        })
        let newStatus = this.data.status
        if (status === 'send' || status === 'approve') {
          newStatus = this.data.status + 1
        } else if (status === 'suspend') {
          newStatus = 7
        } else if (status === 'cancel') {
          newStatus = 8
        } else if (status === 'back') {
          newStatus = this.data.status - 1
        }

        const formData = { ...this.data, status: newStatus }

        const successMessage = {
          back: 'تم إرسال المعاملة للمرحلة السابقة',
          suspend: 'تم تعليق المعاملة بنجاح',
          cancel: 'تم إلغاء المعاملة',
          send: `تم إرسال المعاملة إلى مرحلة "${this.statuses[(this.data.status || 1) + 1]}" بنجاح`,
          save: 'تم حفظ المعاملة بنجاح',
          approve: 'تم إعتماد المعاملة بنجاح',
        }
        // console.log(this.data.status)
        // const formData = new FormData()
        // for (const key in this.data) {
        //   formData.append(key, this.data[key])
        // }
        // let response
        // const response = TransactionsServices.addOneItem(formData)
        this.buttonsLoading[status] = true
        const response = await TransactionsServices.updateOneItem(this.data.id, formData)
        if (response.success === true) {
          this.successMessage = successMessage[status]
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Treatments')
          }, 1500)
        } else {
          this.errorMessage = 'يوجد مشكلة في التعديل'
          this.errorSnackbar = true
        }
        console.log(this.buttonsLoading)
        this.buttonsLoading[status] = false
        console.log(this.buttonsLoading)
        this.dataLoading = false
      },
      openDialog: function (status) {
        const BUTTONS_OPTIONS = {
          suspend: {
            title: 'تأكيد تعليق',
            body: 'هل أنت متأكد من تعليق المعاملة ؟',
            saveButton: { action: () => { this.save('suspend'); this.buttonsDialog.show = false } },
          },
          cancel: {
            title: 'تأكيد إلغاء',
            body: 'هل أنت متأكد من إلغاء المعاملة؟',
            saveButton: { action: () => { this.save('cancel'); this.buttonsDialog.show = false } },
          },
          send: {
            title: 'تأكيد إرسال',
            body: `هل انت متأكد من إرسال المعاملة إلى مرحلة "${this.statuses[(this.data.status || 1) + 1]}" ؟`,
            saveButton: { action: () => { this.save('send'); this.buttonsDialog.show = false } },
          },
          approve: {
            title: 'تأكيد إعتماد',
            body: 'هل أنت متأكد من إعتماد المعاملة؟',
            saveButton: { action: () => { this.save('approve'); this.buttonsDialog.show = false } },
          },
          back: {
            title: 'تأكيد إعادة',
            body: `هل انت متأكد من إرسال المعاملة إلى مرحلة "${this.statuses[(this.data.status || 1) - 1]}" ؟`,
            saveButton: { action: () => { this.save('back'); this.buttonsDialog.show = false } },
          },
        }

        const { title, body, saveButton: { action } } = BUTTONS_OPTIONS[status]
        this.buttonsDialog.show = true
        this.buttonsDialog.title = title
        this.buttonsDialog.body = body
        this.buttonsDialog.saveButton.action = action
      },
      /**
       * ? meter methods
       */
      // * delete
      delete_meter: function (type, index) {
        this.data[`${type}_meter_number`].splice(index, 1)
      },

      // * add
      add_meter: function (type) {
        this.data[`${type}_meter_number`].push({
          number: '',
          id: uuid.v4(),
        })
      },
      // changePcOfCom: function (id) {
      //   // const index = this.data.achievement.stages.findIndex(s => s.id === id)
      //   // this.data.achievement.stages[index].achievement_value = (this.data.achievement.stages[index].pc_of_completion * this.data.achievement.stages[index].cost) / 100
      //   this.data.achievement.stages = this.data.achievement.stages.map(s => ({
      //     ...s,
      //     pc_to_cost: ((s.cost / this.data.achievement.prop_current_price) * 100).toFixed(2),
      //     achievement_value: (s.pc_of_completion * s.cost) / 100,
      //   }))
      // },
    },
  }