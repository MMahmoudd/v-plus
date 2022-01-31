<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    :style="cssVariables"
  >
    <v-row>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          align-with-title
          hide-slider
          fixed-tabs
        >
          <v-tab v-if="showSuspended">
            <div class="transaction-tab-item">
              <div
                id="my_transactions_total_suspened"
                class="my_transactions_total"
              >
                {{ my_transactions_total.suspended }}
              </div>
              <div class="icon_text__wrapper">
                <img
                  width="16"
                  :src="require('@/assets/suspend.png')"
                >
                <span>المعلقة</span>
              </div>
            </div>
          </v-tab>
          <v-tab v-if="showAdded">
            <div class="transaction-tab-item">
              <div
                id="my_transactions_total_added"
                class="my_transactions_total"
              >
                {{ my_transactions_total.added }}
              </div>
              <div class="icon_text__wrapper">
                <v-icon
                  id="my_transactions_total_added_icon"
                  x-small
                >
                  far fa-keyboard
                </v-icon>
                <span>المسودة</span>
              </div>
            </div>
          </v-tab>
          <v-tab v-if="showUnderEvaluation">
            <div class="transaction-tab-item">
              <div
                id="my_transactions_total_underEvaluation"
                class="my_transactions_total"
              >
                {{ my_transactions_total.underEvaluation }}
              </div>
              <div class="icon_text__wrapper">
                <v-icon
                  id="my_transactions_total_underEvaluation_icon"
                  x-small
                >
                  fas fa-search-plus
                </v-icon>
                <span>
                  تحت التقييم
                </span>
              </div>
            </div>
          </v-tab>
          <v-tab v-if="showUnderReview">
            <div class="transaction-tab-item">
              <div
                id="my_transactions_total_underReview"
                class="my_transactions_total"
              >
                {{ my_transactions_total.underReview }}
              </div>
              <div class="icon_text__wrapper">
                <v-icon
                  id="my_transactions_total_underReview_icon"
                  x-small
                >
                  mdi-camera-enhance-outline
                </v-icon>
                <span>
                  تحت المراجعة
                </span>
              </div>
            </div>
          </v-tab>
          <!-- قيد الإعتماد -->
          <v-tab v-if="showApproval">
            <div class="transaction-tab-item">
              <div
                id="my_transactions_total_underApproval"
                class="my_transactions_total"
              >
                {{ my_transactions_total.underApproval }}
              </div>
              <div class="icon_text__wrapper">
                <v-icon
                  id="my_transactions_total_underApproval_icon"
                  x-small
                >
                  far fa-thumbs-up
                </v-icon>
                <span>
                  قيد الإعتماد
                </span>
              </div>
            </div>
          </v-tab>
          <!-- معتمدة -->
          <v-tab v-if="showApproval">
            <div class="transaction-tab-item">
              <div
                id="my_transactions_total_approvaed"
                class="my_transactions_total"
              >
                {{ my_transactions_total.approvaed }}
              </div>
              <div class="icon_text__wrapper">
                <v-icon
                  id="my_transactions_total_approvaed_icon"
                  x-small
                >
                  far fa-thumbs-up
                </v-icon>
                <span>
                  معتمدة
                </span>
              </div>
            </div>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col
        cols="12"
      >
        <v-tabs-items v-model="tab">
          <div class="select-samples-button-container">
            <select-sample />
          </div>
          <!-- معلقة -->
          <v-tab-item
            v-if="showSuspended"
            eager
          >
            <myTreatment
              :status="[7]"
            />
          </v-tab-item>
          <!-- مسودة -->
          <v-tab-item
            v-if="showAdded"
            eager
          >
            <myTreatment
              :type="4"
              :status="[1]"
            />
          </v-tab-item>
          <!-- تحت التقييم -->
          <v-tab-item
            v-if="showUnderEvaluation"
            eager
          >
            <myTreatment
              :type="1"
              :status="[2]"
            />
          </v-tab-item>
          <!-- تحت المراجعة -->
          <v-tab-item
            v-if="showUnderReview"
            eager
          >
            <myTreatment
              :type="2"
              :status="[3]"
            />
          </v-tab-item>
          <!-- قيد الاعتماد -->
          <v-tab-item
            v-if="showApproval"
            eager
          >
            <myTreatment
              :type="3"
              :status="[4]"
            />
          </v-tab-item>
          <!-- المعتمدة -->
          <v-tab-item
            v-if="showApproval"
            eager
          >
            <myTreatment
              :type="3"
              :status="[5]"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            احصائيات العملاء
          </v-card-title>
          <v-container>
            <pie-chart />
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            احصائيات المستخدمين
          </v-card-title>
          <v-container>
            <pie-chart />
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            المعاملات المعلقة
          </v-card-title>
          <v-container>
            <pie-chart />
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            المعاملات النقدية
          </v-card-title>
          <v-container>
            <pie-chart />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import myTreatment from '../dashboard/Treatment/Treatments.vue'
  import PieChart from '../../components/PieChart.vue'
  import SelectSample from './Treatment/SelectSample.vue'
  // import BarChart from '../../components/BarChart.vue'
  export default {
    name: 'Dashboard',
    components: {
      SelectSample,
      PieChart,
      // BarChart,
      myTreatment,
    },
    data () {
      return {
        permissons: {
          approval: {},
          reviwer: {},
          added: {},
          underEvaluation: {},
        },
        my_transactions_total: {},
        tab: null,
        chartData: {
          Books: 24,
          Magazine: 30,
          Newspapers: 10,
        },
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        fill: true,
        gradients: ['#774a00', '#E9BB70'],
        padding: 15,
        radius: 5,
        value: [0, 2, 5, 9, 5, 10, 3],
        width: 2,
      }
    },
    computed: {
      showSuspended: function () {
        const { read: readAprroval } = this.permissons.approval
        const { read: readReviwer } = this.permissons.reviwer
        if (readAprroval && readReviwer) {
          return true
        }
        return false
      },
      showApproval: function () {
        const { read: readAprroval } = this.permissons.approval
        if (readAprroval) {
          return true
        }
        return false
      },
      showAdded: function () {
        const { read: readAdded } = this.permissons.added
        if (readAdded) {
          return true
        }
        return false
      },
      showUnderEvaluation: function () {
        const { read: readUnderEvaluation } = this.permissons.underEvaluation
        if (readUnderEvaluation) {
          return true
        } else {
          return false
        }
      },
      showUnderReview: function () {
        const { read: readReviwer } = this.permissons.reviwer
        if (readReviwer) {
          return true
        } else {
          return false
        }
      },
      cssVariables: function () {
        let itemsLength = 0
        if (this.showSuspended) {
          itemsLength += 2
        }

        if (this.showApproval) {
          itemsLength += 1
        }

        if (this.showAdded) {
          itemsLength += 1
        }

        if (this.showUnderEvaluation) {
          itemsLength += 1
        }

        if (this.showUnderReview) {
          itemsLength += 1
        }

        return {
          '--items': itemsLength,
        }
      },
    },
    mounted () {
      this.permissons.approval = this.can('مرحلة الاعتماد')
      this.permissons.reviwer = this.can('مرحلة المراجعة')
      this.permissons.added = this.can('مرحلة الادخال')
      this.permissons.underEvaluation = this.can('مرحلة التقييم')
      // console.log('x', x)
      // console.log('y', y)
      this.my_transactions_total = this.$store.state.my_transactions_total
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
<style lang="scss">
  // :root{
  //   --items:3
  // }
  h1{
    font-weight: 300;
  }
  .select-samples-button-container {
    background-color: #ffff;
    z-index: 100;
  }
  .select-samples-button {
    // place-self: flex-end;
    float: left;
    z-index: 100;
  }

  .v-item-group .v-window-item .form-container.v-card {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .my_transactions_total {
    display: inline-block;
    color: #fff;
    font-weight: bold;
    border-radius: 7px;
    padding: 11px 13px;
    margin-left: 8px;
  }
  #my_transactions_total_suspened {
    background-color: #e74b4bed;
  }
  #my_transactions_total_added {
    background-color: #B8B8C7;
  }
  #my_transactions_total_added_icon {
    color: #B8B8C7;
  }
  #my_transactions_total_underEvaluation {
    background-color: #3772FF;
  }
  #my_transactions_total_underEvaluation_icon {
    color: #3772FF;
  }
  #my_transactions_total_underReview {
    background-color: #FDCA40;
  }
  #my_transactions_total_underReview_icon {
    color: #FDCA40;
  }
  #my_transactions_total_underApproval {
    background-color: #0000AF;
  }
  #my_transactions_total_underApproval_icon {
    color: #0000AF;
  }
  #my_transactions_total_approvaed {
    background-color: #11b63a;
  }
  #my_transactions_total_approvaed_icon {
    color: #11b63a;
  }
  .icon_text__wrapper {
        display: flex;
    text-align: right;
    flex-direction: column;
    align-items: flex-start;
  }
  .transaction-tab-item {
    padding: 24px 10px;
    font-weight: bold;
    letter-spacing: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .v-slide-group__content {
    display: grid;
    grid-template-columns: repeat(var(--items), 1fr);
    width: 100%;
    grid-column-gap: 30px;
    padding: 15px 97px;
  }

  .v-application--is-rtl .v-tabs--align-with-title > .v-tabs-bar:not(.v-tabs-bar--show-arrows):not(.v-slide-group--is-overflowing) > .v-slide-group__wrapper > .v-tabs-bar__content > .v-tab:first-child, .v-application--is-rtl .v-tabs--align-with-title > .v-tabs-bar:not(.v-tabs-bar--show-arrows):not(.v-slide-group--is-overflowing) > .v-slide-group__wrapper > .v-tabs-bar__content > .v-tabs-slider-wrapper + .v-tab {
    margin-right: unset;
  }

  .v-tabs--fixed-tabs > .v-tabs-bar .v-tab  {
        box-shadow: 1px 1px 3px 1px #eee;
            border-radius: 7px;

  }
  .v-tabs-bar {
    height: auto !important;
  }
</style>
