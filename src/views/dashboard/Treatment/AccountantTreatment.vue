<template>
  <v-container>
    <v-row
      justify="space-between"
      align="center"
      class="mx-0 mt-4"
    >
      <h1 class="font-weight-bold">
        معاملة رقم 1920215841
      </h1>
      <v-chip
        class="ma-2 time-chip"
        color="blue"
        label
        text-color="white"
      >
        <v-icon left>
          mdi-clock-time-four-outline
        </v-icon>
        <span>تاريخ المعاملة</span>
      </v-chip>
    </v-row>
    <v-card class="form-container">
      <v-container>
        <div>
          <v-form :disabled="!permissions.update && !permissions.add">
            <div>
              <!-- {{ data.participatingmembers }} -->
              <h2>المشاركون فى إعداد التقرير</h2>
              <div
                v-for="(p, index) in data.participatingmembers"
                :key="'p' + index"
              >
                <v-row
                  align="center"
                >
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">الاسم</label>
                    <v-select
                      v-model="p.user_id"
                      label="الاسم"
                      single-line
                      outlined
                      :items="usersList"
                      :loading="userListLoading"
                      item-text="name"
                      item-value="id"
                      return-object
                      @change="changeNameInMembers(p,index)"
                    />
                  </v-col>
                  <!-- <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">المسمى الوظيفى</label>
                    <v-text-field
                      label="المسمى الوظيفى"
                      single-line
                      outlined
                    />
                  </v-col> -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">فئة العضوية</label>
                    <v-text-field
                      v-model="p.user_type"
                      label="فئة العضوية"
                      single-line
                      outlined
                      disabled
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <label class="d-block mb-3 font-weight-bold">رقم العضوية</label>
                    <v-text-field
                      v-model="p.id_number"
                      label="رقم العضوية"
                      single-line
                      outlined
                      disabled
                    />
                  </v-col>
                  <v-btn
                    x-large
                    class="ma-2 blue-darken-btn btns"
                    :disabled="!permissions.update && !permissions.add"
                    @click.prevent="hideParticipant(p)"
                  >
                    <v-icon left>
                      far {{ p.status === 1 ? 'fa-eye-slash' : 'fa-eye' }}
                    </v-icon>
                    {{ p.status === 1 ? 'إخفاء' : 'إظهار' }}
                  </v-btn>
                  <v-btn
                    x-large
                    class="ma-2 error btns"
                    @click.prevent="removeParticipant(p,index)"
                  >
                    <v-icon left>
                      fas fa-trash-alt
                    </v-icon>
                    حذف
                  </v-btn>
                </v-row>
              </div>
              <v-row
                class="mt-3"
              >
                <v-btn
                  x-large
                  class="ma-2 orange-btn"
                  :disabled="!permissions.update && !permissions.add"
                  @click.prevent="addParticipant()"
                >
                  <v-icon left>
                    fas fa-plus
                  </v-icon>
                  اضافة مشارك جديد
                </v-btn>
              </v-row>
            </div>
            <v-divider class="my-10" />

            <div>
              <h2>التفاصيل المالية</h2>
              <!-- {{ data.participantscommissions }} -->
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >السعر</label>
                  <vuetify-money
                    v-model="price"
                    outlined
                    single-line
                    disabled
                    :options="moneyInputOptions"
                  />
                </v-col>
              </v-row>
              <v-row
                v-for="(p,index) in data.participantscommissions"
                :key="index"
                align="center"
              >
                <v-col
                  cols="12"
                  md="3"
                >
                  <label
                    v-show="index === '0'"
                    class="d-block mb-3 font-weight-bold"
                  >اسم المشارك فى التقرير</label>
                  <v-text-field
                    v-model="p.name"
                    single-line
                    outlined
                    disabled
                  />
                </v-col>
                <v-col
                  cols="5"
                  md="4"
                  lg="2"
                >
                  <label
                    v-show="index === 0"

                    class="d-block mb-3 font-weight-bold"
                  >العمولات</label>
                  <vuetify-money
                    v-model="p.amount"
                    outlined
                    single-line
                    disabled
                    :options="moneyInputOptions"
                    @change="calcTotal(index)"
                  />
                </v-col>
                أو
                <v-col
                  cols="5"
                  md="4"
                  lg="2"
                >
                  <label
                    v-show="index === 0"

                    class="d-block mb-3 font-weight-bold"
                  >النسبة</label>
                  <v-text-field
                    v-model="p.stage"
                    single-line
                    outlined
                    suffix="%"
                    disabled
                    @change="calcTotal(index)"
                  />
                </v-col>
                <v-col
                  cols="5"
                  md="4"
                  lg="2"
                >
                  <label
                    v-show="index === 0"
                    class="d-block mb-3 font-weight-bold"
                  >أخرى</label>
                  <v-text-field
                    v-model="p.other_amount"
                    single-line
                    outlined
                    @input="calcTotal(index)"
                  />
                </v-col>
                <v-col
                  cols="5"
                  md="4"
                  lg="2"
                >
                  <label
                    class="d-block mb-3 font-weight-bold"
                  >إجمالي</label>
                  <v-text-field
                    v-model="p.total_amount"
                    single-line
                    outlined
                    disabled
                  />
                </v-col>
              </v-row>
              <v-divider class="my-10" />
              <v-row
                class="mb-10"
              >
                <v-btn
                  x-large
                  class="ma-2"
                  color="blue"
                  :disabled="!permissions.update && !permissions.add"
                  @click="save"
                >
                  <v-icon left>
                    fas fa-save
                  </v-icon>
                  حفظ
                </v-btn>
              </v-row>
            </div>
          </v-form>
        </div>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      left
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import { uuid } from 'vue-uuid'
  /**
   * ? Services
   */
  const TransactionsServices = ServiceFactory.get('Transactions')
  const CustomersServices = ServiceFactory.get('Customers')
  const UsersServices = ServiceFactory.get('Users')

  export default {
    name: 'NewTreatment',

    data: () => ({
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      price: '',
      permissions: {},
      moneyInputOptions: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 11,
        precision: 2,
      },
      participants: [{
        participant: true,
      }],
      /**
       * * lists
       */
      usersList: [],
      /**
       * * loading
       */
      userListLoading: false,
      data: {
        participantscommissions: [{
          user_id: { name: 'a' },
        }],
        participatingmembers: [{ user_id: '' }],
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
        trans_finishing_internal: '',
        trans_finishing_external: '',
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
        conditioner_type: [
          {
            status: false,
            name: 'مركزي',
            non_installed: 0,
            installed: 0,
          },
          {
            status: false,
            name: 'منفصل',
            non_installed: 0,
            installed: 0,
          },
          {
            status: false,
            name: 'شباك',
            non_installed: 0,
            installed: 0,
          },
          {
            status: false,
            name: 'كونسيلد',
            non_installed: 0,
            installed: 0,
          },
        ],
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
    }),
    watch: {
      'data.customer_id': {
        handler () {
          this.fetchPrice()
        },
        deep: true,
      },
      // 'data.participantscommissions': {
      //   handler:
      //     function (n, m) {
      //       console.log(n)
      //       console.log(m)
      //       if (n.stage !== m.sage) {
      //         console.log(n)
      //         console.log(m)
      //       }
      //     },
      //   deep: true,
      // },
    },
    mounted () {
      (async () => {
        await this.fetchUsers()
        if (this.$route.params.id) {
          await this.fetchOneItem(this.$route.params.id)
        }
      })()

      this.permissions = this.can('تعديل السعر')
    },
    methods: {
      fetchOneItem: async function (id) {
        const { data } = await TransactionsServices.fetchOneItem(id)
        for (const key in data) {
          if (data[key] === null) {
            this.data[key] = this.data[key]
          } else {
            this.data[key] = data[key]
          }
        }

        this.data.participantscommissions = this.data.participantscommissions.map(p => ({
          ...p,
          name: this.usersList.find(user => user.id === p.user_id).name || '',
        }))
      },
      // * fetching items for the page
      /**
       * ? - get customer by id
       * ? - compare the region & cities &  prop rating & prop type
       * ?   in the customer file with the one in the transaction file
       * ? - get the price from there.
       */
      fetchPrice: async function () {
        const { data: { pricing } } = await CustomersServices.fetchOneItem(this.data.customer_id)
        const customerPriceObject = pricing.find(item => {
          if (item.region_id.includes(this.data.region_id)) {
            if (item.city_list.includes(this.data.city_id)) {
              if (item.use_property.includes(this.data.property_rating_id)) {
                if (item.property_type.includes(this.data.property_type_id)) {
                  return item
                }
              }
            }
          }
        })
        if (customerPriceObject) {
          this.price = customerPriceObject.custom_price
        }
      },
      /**
       * * fetch users for the list
       * ? whenever a user get selected, I'll get his price and precentage
       * ? and adding them to the list
       */
      fetchUsers: async function () {
        this.userListLoading = true
        const { data: { data } } = await UsersServices.getAllItems()
        this.usersList = data
        this.userListLoading = false
      },
      /**
       * ? DOM methods
       */
      addParticipant: function () {
        this.data.participatingmembers.push({ status: 1 })
        this.data.participantscommissions.push({ other_amount: 0 })
      },
      hideParticipant: function (item) {
        item.status = item.status === 1 ? 2 : 1
      },
      removeParticipant: function (item, index) {
        this.data.participatingmembers.splice(index, 1)
        this.data.participantscommissions.splice(index, 1)
      },
      changeNameInMembers: function (_data, index) {
        const { user_id: data } = _data
        this.data.participatingmembers[index].id_number = data.id_number
        this.data.participatingmembers[index].user_type = data.user_type
        this.data.participantscommissions[index].user_id = data.id
        this.data.participantscommissions[index].name = data.name
        this.data.participantscommissions[index].stage = data.commission_accreditation_stage_rate
        this.data.participantscommissions[index].amount = data.commission_accreditation_stage_amount
        this.calcTotal(index)
      },
      calcTotal: function (index) {
        this.data.participantscommissions[index].total_amount =
          +this.data.participantscommissions[index].amount +
          +this.data.participantscommissions[index].stage +
          +this.data.participantscommissions[index].other_amount
      },
      // * actions
      save: async function () {
        // const formData = new FormData()
        // /**
        //  * ? converting the json object to a form-data format
        //  */
        // function buildFormData (formData, data, parentKey) {
        //   if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        //     Object.keys(data).forEach(key => {
        //       buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
        //     })
        //   } else {
        //     const value = data == null ? '' : data

        //     formData.append(parentKey, value)
        //   }
        // }

        // buildFormData(formData, this.data)
        // console.log(this.data.participatingmembers)

        this.data.participatingmembers = this.data.participatingmembers.map(p => {
          if (typeof p.user_id !== 'number') {
            return ({ ...p, user_id: p.user_id.id })
          } else {
            return p
          }
        })
        // console.log(this.data.participantscommissions)
        // console.log(this.data.participatingmembers)
        const response = await TransactionsServices.updateOneItem(this.data.id, this.data)
        if (response.success === true) {
          this.successMessage = 'تم التعديل بنجاح'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Treatments')
          }, 1500)
        } else {
          this.errorMessage = 'يوجد مشكلة في التعديل'
          this.errorSnackbar = true
        }
        // console.log(response)
      },
    },
  }
</script>

<style lang="scss" scoped>
.time-chip span {
  font-size: 15px;
}
.form-container {
  margin-top: 50px;
}
.form-container h2 {
  font-size: 25px;
  color: #37a8ff;
  margin-bottom: 25px;
}
label {
  font-size: 13px;
}
#map{
  height: 400px;
}
.align-items-center{
  align-items: center
}
.justify-content-end{
  justify-content: end
}
.blue-darken-btn{
  background-color: #061058 !important;
  color: #fff !important;
}
.orange-btn{
  background-color: #FDCA40 !important;
}
// .btns {
//   margin-top: 28px !important;
// }
</style>
