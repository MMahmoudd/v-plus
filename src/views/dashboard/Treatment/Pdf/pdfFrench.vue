<template>
  <div id="pdf-content">
    <div class="container-header">
      <div style="display:none;">
        {{ styleData }}
        {{ styleSubData }}
      </div>
      <!-- <h1>
        نموذج
        <span class="color">تقرير التقييم</span>
      </h1>
 -->
      <div class="sub-header d-flex justify-content-between align-items-center">
        <div
          v-if="data.customer.show_logo === '1'"
          class="image-facilty"
        >
          <img :src="data.customer.cs_logo">
        </div>
        <div>
          <h2>{{ data.customer.reportName || '' }}</h2>
        </div>
        <!-- <div>
          <h2>الرقم المرجعي للتقرير</h2>
          <h3>رقم الهاتف:</h3>
          <h3>المملكة العربية السعودية،</h3>
        </div>
        <div>
          <h2>تاريخ إصدار التقرير</h2>
          <h3>رمز إيداع التقرير:</h3>
        </div> -->
        <div class="image-facilty">
          <img :src="data.facility.logo">
        </div>
      </div>
    </div>
    <div class="divider" />
    <!-- <table class="colspan">
      <tbody class="has-fields">
        <tr>
          <td rowspan="2">
            اسم المقيم المعتمد
          </td><td rowspan="2">
            {{ data.facility.resident_name || '' }}
          </td><td>رقم الترخيص</td><td>{{ data.facility.license_number || '' }}</td>
        </tr>
        <tr><td>تاريخ الترخيص</td><td>{{ data.facility.license_date || '' }}</td></tr>
      </tbody>
    </table> -->
    <table class="table-fixed">
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم التقرير
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            تارخ التقرير
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ التقييم
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع العقار
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العميل
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم الطلب
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ الطلب
          </td>
        </tr>
        <tr>
          <!-- <td>{{ data.evaluationpurpose.name || '' }}</td>
          <td>{{ data.trans_report_name || '' }}</td>
          <td>{{ data.customer.cs_name || '' }}</td> -->
          <td />
          <td />
          <td>{{ data.trans_evaluation_date || '' }}</td>
          <td>{{ data.propTypeList.find(item => item.id === data.property_type_id).name || '' }}</td>
          <td>{{ data.customer.cs_name || '' }}</td>
          <td />
          <td />
        </tr>
      </tbody>
    </table>
    <!-- 2 -->
    <table>
      <tbody>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم الصك
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ الصك
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            فسح البناء
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ فسح البناء
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            عمر المبنى بالسنين
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            نوع المبنى
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            شاغلية المبنى
          </td>
        </tr>
        <tr>
          <td>{{ data.trans_instrument_num || '' }}</td>
          <td>{{ data.trans_instrument_date || '' }}</td>
          <td>-</td>
          <td>-</td>

          <td>{{ data.trans_construction_age || '' }}</td>
          <td>-</td>
          <td>{{ data.transOccupancyName || '' }}</td>
        </tr>
      </tbody>
    </table>
    <!-- البيانات الأساسية -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="14">
            <div class="header">
              <div class="header-text">
                البيانات الأساسية
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr>
          <td
            v-for="item in static1"
            :key="item"
            :colspan="item.cols"
            :style="styleSubData"
            class="field"
          >
            {{ item.item }}
          </td>
        </tr>
        <tr
          v-for="(row, rowIndex) in static11"
          :key="rowIndex"
        >
          <td
            v-for="(col, colIndex) in row"
            :key="colIndex"
            :colspan="col.cols || 1"
          >
            {{ col.item }}
          </td>
        </tr>
        <!-- <tr>
          <td
            :style="styleSubData"
            class="field"
          >
            نوع العقار
          </td>
          <td
            v-for="type in data.propTypeList"
            :key="type.id"
          >
            <v-checkbox
              v-model="data.property_type_id"
              :value="type.id"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  {{ type.name || '' }}
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr>
        <tr>
          <td
            :style="styleSubData"
            class="field"
          >
            حالة العقار
          </td>
          <td
            v-for="type in data.transConstructionList"
            :key="type.id"
          >
            <v-checkbox
              v-model="data.trans_construction_condition"
              :value="type.id"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  {{ type.name || '' }}
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr> -->
      </tbody>
    </table>

    <!-- وصف تشطيبات العقار والأعمال الإنشائية -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="9">
            <div class="header">
              <div class="header-text">
                وصف تشطيبات العقار والأعمال الإنشائية
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr
          v-for="(row, rowIdx) in description_finshed"
          :key="rowIdx"
        >
          <td
            v-for="(col, colIdx) in row"
            :key="colIdx"
            :style="col.type === 'field' ? styleSubData : {}"
            :class="col.type === 'field' ? 'field' : ''"
            :colspan="col.cols"
          >
            {{ col.value }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- تقييم الأرض والمباني -->
    <div
      style="display:flex;
    align-items: flex-start;"
    >
      <table
        class="table-fixed"
        style="width:50%;"
      >
        <thead :style="styleData">
          <tr>
            <th colspan="4">
              <div class="header">
                <div class="header-text">
                  تقييم الأرض والمباني
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="has-fields">
          <tr>
            <td
              class="field"
              :style="styleSubData"
            />
            <td
              class="field"
              :style="styleSubData"
            >
              المساحة بالمتر
            </td>
            <td
              class="field"
              :style="styleSubData"
            >
              سعر المتر
            </td>
            <td
              class="field"
              :style="styleSubData"
            >
              السعر الإجمالي
            </td>
          </tr>

          <tr
            v-for="(b,index) in data.transactions_buildings"
            :key="index"
          >
            <td>
              {{ b.building_type }}
            </td>
            <td>{{ b.space }}</td>
            <td>{{ formatCurrency(b.price) }}</td>
            <td>{{ formatCurrency(b.total) }}</td>
          </tr>
          <tr>
            <td>نسبة الربح</td>
            <td>{{ addPercentage(data.cm_developer_earnings_ratio) }}</td>
            <td>
              نسبة الإهلاك
              {{ addPercentage(data.cm_total_depreciation_ratio) }}
            </td>
            <td>{{ data.cm_space_total || 0 }}</td>
          </tr>
        </tbody>
      </table>

      <div style="width:50%;backbround-color:red;">
        <table>
          <thead :style="styleData">
            <tr>
              <th colspan="4">
                <div class="header">
                  <div class="header-text">
                    خدمات الكهرباء والمياة بالمبنى
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>عدد عدادات الكهرباء</td>
              <td>({{ data.electric_meter_number.length }})</td>
              <td>عدد عدادات المياة</td>
              <td>({{ data.water_meter_number.length }})</td>
            </tr>
            <tr>
              <td>رقم العداد</td>
              <td>{{ data.electric_meter_number[0] }}</td>
              <td>رقم العداد</td>
              <td>{{ data.water_meter_number[0] }}</td>
            </tr>
            <tr>
              <td colspan="4">
                في حالة وجود اكثر من عداد تكتب الأرقام وترفق مع التقييم
              </td>
            </tr>
          </tbody>
        </table>

        <!-- في حالة تقییم عمارة سكنیة أو تجاریة یتم تحدید -->
        <table>
          <thead :style="styleData">
            <tr>
              <th>
                <div class="header">
                  <div class="header-text">
                    في حالة تقییم عمارة سكنیة أو تجاریة یتم تحدید
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                عدد الشقق (
                {{ data.income_valuation&&data.income_valuation.reduce((c,p) => {return c.unit_number + p},0) }}
                )
                إيجارها (
                {{ data.income_valuation&&data.income_valuation.reduce((c,p) => {return c.total_rent + p},0) }}
                )
              </td>
            </tr>
            <!-- <tr>
              <td>
                عدد المحلات التجاریة ( ) إیجارھا ( ) ر
              </td>
            </tr> -->
            <tr>
              <td>
                مجموع الإیجارات ({{ data.income_valuation&&data.income_valuation.reduce((c,p) => {return c.total_rent + p},0) }} )
              </td>
            </tr>
          </tbody>
        </table>

        <!--ھل العقار بھ بعض التشطیبات لم تكتمل أو یحتاج لصیانة أو بھ شقوق-->
        <table>
          <thead :style="styleData">
            <tr>
              <th>
                <div class="header">
                  <div class="header-text">
                    ھل العقار بھ بعض التشطیبات لم تكتمل أو یحتاج لصیانة أو بھ شقوق
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                لا | نعم ، في حالة الإجابة بـ ( نعم ) یتم التوضیح
              </td>
            </tr>
            <tr>
              <td>
                تكالیف الصیانة التقدیریة (0 ) ریال
              </td>
            </tr>
          </tbody>
        </table>

        <!--رأي المثمن العقاري-->
        <table>
          <thead :style="styleData">
            <tr>
              <th>
                <div class="header">
                  <div class="header-text">
                    رأي المثمن العقاري
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {{ data.review_note || '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="html2pdf__page-break" />

    <!-- لمسح الشامل على منطقة العقار وتحلیل العوامل المھمھ والمؤثره في قیمة العقا -->
    <!-- <table
      class="table-fixed"
      style="display:flex;"
    >
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header">
              <div class="header-text">
                وصف تشطيبات العقار والأعمال الإنشائية
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>نوع العقار</td>
          <td />
        </tr>
        <tr>
          <td>شكل الأرض</td>
          <td />
        </tr>
        <tr>
          <td />
          <td />
        </tr>
      </tbody>
    </table> -->

    <!--الخدمات والمرافق المتوفرة في الموقع-->
    <table class="table-fixed first">
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                الخدمات والمرافق المتوفرة في الموقع
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr>
          <td
            colspan="2"
            class="field"
            :style="styleSubData"
          >
            المرافق المتواجدة في الموقع
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            متوفر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            غير متوفر
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            الخدمات والمراكز العامة
          </td>
          <td>دوائر حكومية</td>
          <td>{{ data.government_office === '1' ? '☑️' : '' }}</td>
          <td>{{ data.government_office === '0' ? '☑️' : '' }}</td>
        </tr>
        <tr>
          <td>مراكز طبية</td>
          <td>{{ data.medical_facility === '1' ? '☑️' : '' }}</td>
          <td>{{ data.medical_facility === '0' ? '☑️' : '' }}</td>
        </tr>
        <!-- -->
        <tr>
          <td rowspan="1">
            خدمات تجارية
          </td>
          <td>مراكز تجارية</td>
          <td>{{ data.market === '1' ? '☑️' : '' }}</td>
          <td>{{ data.market === '0' ? '☑️' : '' }}</td>
        </tr>
        <!-- <tr>
          <td>مطاعم</td>
          <td>صح</td>
          <td>☑️</td>
        </tr>
        <tr>
          <td>محطات وقود</td>
          <td>صح</td>
          <td>☑️</td>
        </tr> -->
        <!-- -->
        <tr>
          <td rowspan="5">
            خدمات البنیة التحتیة
          </td>
          <td>شبكة الكھرباء</td>
          <td />
          <td>☑️</td>
        </tr>
        <tr>
          <td>شبكة الصرف الصحي</td>
          <td />
          <td>☑️</td>
        </tr>
        <tr>
          <td>شبكة المیاه</td>
          <td />
          <td>☑️</td>
        </tr>
        <tr>
          <td>شبكة الھاتف</td>
          <td />
          <td>☑️</td>
        </tr>
        <tr>
          <td>شبكة تصریف السیول</td>
          <td />
          <td>☑️</td>
        </tr>
        <!-- -->
        <tr>
          <td rowspan="3">
            مرافق عامة
          </td>
          <td>مساجد</td>
          <td>{{ data.masjid === '1' ? '☑️' : '' }}</td>
          <td>{{ data.masjid === '0' ? '☑️' : '' }}</td>
        </tr>
        <tr>
          <td>حدائق</td>
          <td>{{ data.public_garden === '1' ? '☑️' : '' }}</td>
          <td>{{ data.public_garden === '0' ? '☑️' : '' }}</td>
        </tr>
        <tr>
          <td>تعلیم</td>
          <td>{{ data.educational_facility === '1' ? '☑️' : '' }}</td>
          <td>{{ data.educational_facility === '0' ? '☑️' : '' }}</td>
        </tr>
        <!-- -->
        <!-- <tr>
          <td rowspan="4">
            تجھیزات البلدیة
          </td>
          <td>سفلتھ</td>
          <td>صح</td>
          <td>لا</td>
        </tr>
        <tr>
          <td>رصف</td>
          <td>صح</td>
          <td>لا</td>
        </tr>
        <tr>
          <td>إنارة</td>
          <td>صح</td>
          <td>لا</td>
        </tr>
        <tr>
          <td>تشجیر</td>
          <td>صح</td>
          <td>لا</td>
        </tr> -->
      </tbody>
    </table>

    <!-- -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="7">
            <div class="header">
              <div class="header-text">
                المقارنات
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          />
          <td
            class="field"
            :style="styleSubData"
          >
            المساحة
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            النوع
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            البعد
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            الرسوم
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            الشوارع
          </td>

          <td
            class="field"
            :style="styleSubData"
          >
            الجوال
          </td>
        </tr>

        <tr>
          <td>المقارن 1</td>
          <td>{{ data.cm_space || '' }}</td>
          <td>{{ data.cm_operation_type || '' }}</td>
          <td>{{ data.cm_latitude }}, {{ data.cm_longitude }}</td>
          <td>{{ data.cm_price || '' }}</td>
          <td />
          <td />
        </tr>

        <tr>
          <td>المقارن 2</td>
          <td>{{ data.cm_space_2 || '' }}</td>
          <td>{{ data.cm_operation_type_2 || '' }}</td>
          <td>{{ data.cm_latitude_2 }}, {{ data.cm_longitude_2 }}</td>
          <td>{{ data.cm_price_2 || '' }}</td>
          <td />
          <td />
        </tr>

        <tr>
          <td>المقارن 3</td>
          <td>{{ data.cm_space_3 || '' }}</td>
          <td>{{ data.cm_operation_type_3 || '' }}</td>
          <td>{{ data.cm_latitude_3 }}, {{ data.cm_longitude_3 }}</td>
          <td>{{ data.cm_price_3 || '' }}</td>
          <td />
          <td />
        </tr>
      </tbody>
    </table>
    <!--الغرض من التقیی-->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th>
            <div class="header">
              <div class="header-text">
                الغرض من التقييم
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr>
          <td>{{ data.evaluationpurpose.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            معيانة العقار
          </td>
        </tr>
        <tr>
          <td>.....</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            حقوق الغیر في العقار
          </td>
        </tr>
        <tr>
          <td>
            {{ data.acknowledgment_independence }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- -->
    <table>
      <thead :style="styleData">
        <tr>
          <th>
            <div class="header">
              <div class="header-text">
                فرضیات تقریر التقییم
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ data.trans_special_assumptions || '' }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th>
            <div class="header">
              <div class="header-text">
                طریقة التقییم
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            تم تحدید القیمة السوقیة للأرض وفقا للأسعار الحدیثة للأراضي المماثلة في نفس الموقع مع عمل تعدیلات تعكس التغیرات في الطبیعة والموقع والمعطیات الاقتصادیة منذ تاریخ المعاملات التي حصلت بتلك الأسعار مع النظر في حالة المباني ان
            وجدت وحساب تكلفتھا وعمل نسبة اھلاكات حسب العمر والاستخدام مع الاخذ بعین الاعتبار المباني التي لاتمثل الاستخدام الامثل بالنسبة للموقع
          </td>
        </tr>
      </tbody>
    </table>
    <!-- -->
    <table class="table-fixed">
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            البيان
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            المساحة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر المتر
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الاجمالي
          </td>
        </tr>

        <tr>
          <td>
            الأرض
          </td>
          <td>
            {{ data.transactions_buildings.filter(t => t.type === 'الأرض').space || '' }}
          </td>
          <td>
            {{ data.transactions_buildings.filter(t => t.type === 'الأرض').price || '' }}
          </td>
          <td>
            {{ data.transactions_buildings.filter(t => t.type === 'الأرض').total || '' }}
          </td>
        </tr>

        <tr>
          <td>
            الدور الأرضي
          </td>
          <td>
            {{ data.transactions_buildings.filter(t => t.type === 'دور أرضي').space || '' }}
          </td>
          <td>
            {{ data.transactions_buildings.filter(t => t.type === 'دور أرضي').price || '' }}
          </td>
          <td>
            {{ data.transactions_buildings.filter(t => t.type === 'دور أرضي').total || '' }}
          </td>
        </tr>

        <tr>
          <td>
            نسبة الربح
          </td>
          <td

            colspan="2"
          >
            {{ data.cm_developer_earnings_ratio }} %
          </td>
          <td rowspan="2" />
        </tr>

        <tr>
          <td>
            نسبة الإهلاك
          </td>
          <td colspan="2">
            {{ data.cm_total_depreciation_ratio || 0 }} %
          </td>
        </tr>

        <tr>
          <td

            colspan="3"
          >
            إجمالي العقار رقما
          </td>
          <td>
            {{ data.market_value_weighting_number || '' }}
          </td>
        </tr>

        <tr>
          <td>
            الإجمالي كتابة
          </td>
          <td

            colspan="3"
          >
            {{ data.market_value_weighting_text || '' }}
          </td>
        </tr>

        <tr>
          <td>
            ملاحظات
          </td>
          <td

            colspan="3"
          >
            {{ data.trans_internal_notes || '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th>
            <div class="header">
              <div class="header-text" />
            </div>
          </th>
          <th>
            <div class="header">
              <div class="header-text">
                عضو معتمد اساسي مؤقت بفرع العقار
              </div>
            </div>
          </th>
          <th>
            <div class="header">
              <div class="header-text">
                الختم الرسمي
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            أنس
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            إدارة التقييم
          </td>
        </tr>

        <tr>
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
    <div class="html2pdf__page-break" />

    <!-- -->
    <table class="first">
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم المعاملة
          </td>
          <td>{{ data.transaction_id }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ التكليف
          </td>
          <td>{{ data.transaction_id }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم العميل
          </td>
          <td>{{ data.customer.cs_name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم المالك
          </td>
          <td>{{ data.trans_owner_name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            المدينة
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            الحي
          </td>
          <td>{{ data.neighborhood.name || '' }}</td>
        </tr>
      </tbody>
    </table>
    <!-- -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                صورة الأقمار الصناعیة
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <gmap-map
              ref="vPlusMap"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
              :center="{lat: +data.latitude || 23, lng: +data.longitude || 24}"
              :zoom="7"
            >
              <GmapMarker
                :position="{lat: +data.latitude || 22, lng: +data.longitude || 22}"
                :icon="{ url: require('@/assets/marker-red.png'),size: {width: 60, height: 90, f: 'px', b: 'px',},
                         scaledSize: {width: 30, height: 30, f: 'px', b: 'px',},}"
              />
            </gmap-map>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                صورة المخطط
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              :src="data.attached_file.original_url"
              style="min-height:250px;height:250px;bject-fit:cover;width:100%;"
            >
          </td>
        </tr>
      </tbody>
    </table>
    <!-- -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header">
              <div class="header-text">
                صورة مقربة للموقع
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
          <th colspan="1">
            <div class="header">
              <div class="header-text">
                الإحداثیات
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="6">
            <gmap-map
              ref="vPlusMap"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
              :center="{lat: +data.latitude || 23, lng: +data.longitude || 24}"
              :zoom="7"
            >
              <GmapMarker
                :position="{lat: +data.latitude || 22, lng: +data.longitude || 22}"
                :icon="{ url: require('@/assets/marker-red.png'),size: {width: 60, height: 90, f: 'px', b: 'px',},
                         scaledSize: {width: 30, height: 30, f: 'px', b: 'px',},}"
              />
            </gmap-map>
          </td>
          <td colspan="1">
            lat : {{ data.latitude }}, <br>
            lng : {{ data.longitude }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- -->

    <div class="html2pdf__page-break" />
    <table class="first">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                الصور الفوتوغرافية
              </div>
              <div class="header-icon">
                <v-icon>
                  far fa-file-pdf
                </v-icon>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="images">
        <div
          v-for="(img, index) in data.images"
          :key="index"
          style="width:352px;height:240px;"
          class="image-transaction"
        >
          <img
            :src="img.image"
            width="352px"
            height="240px"
            crossorigin
            style="object-fit:none;object-position: right bottom;"
          >
          <span class="image_date">{{ img.date }} hi</span>
        </div>
      </tbody>
    </table>
  </div>
</template>
<script>
  // import defaultValues from './defaultValuesForPdf.js'
  // import { pdfMixin } from '../../../../mixins/pdfMixin.js'
  import { loadGmapApi } from 'vue2-google-maps'
  import { ServiceFactory } from '../../../../services/ServiceFactory'
  const googleMapsService = ServiceFactory.get('googleMaps')
  // import OneNTwo from './Methods/Multi/OneNTwo.vue'
  // import OneNThree from './Methods/Multi/OneNThree.vue'
  // import TwoNThree from './Methods/Multi/TwoNThree.vue'

  // import One from './Methods/Single/One.vue'
  // import Two from './Methods/Single/Two.vue'
  // import Three from './Methods/Single/Three.vue'

  class Field {
    constructor (value, type = '', cols = 1) {
      this.value = value
      this.type = type
      this.cols = cols
    }
  }
  export default ({
    name: 'PdfFrench',
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      styleData: {
        type: Object,
        required: false,
        default: () => ({
          'background-color': '#187F7B',
          'border-color': '#ccc',
          color: '#fff',
        }),
      },
      styleSubData: {
        type: Object,
        required: false,
        default: () => ({
          'background-color': '#F3F5F5',
          'border-color': '#ccc',
          color: '#000',
        }),
      },
    },
    computed: {
      static1 () {
        return (
          [{ item: 'الموقع', cols: 2 }, { item: 'حدود العقار', cols: 4 }, { item: 'الموقع العام', cols: 1 }, { item: 'تصنيف العقار', cols: 1 }, { item: 'التصميم', cols: 1 }, { item: 'المنسوب', cols: 1 }, { item: 'الخدمات', cols: 1 }, { item: 'الشوارع', cols: 1 }, { item: 'الجار', cols: 1 }, { item: 'حالة المبنى', cols: 1 }]
        )
      },
      static11 () {
        return [
          [
            { item: 'المدينة' },
            { item: this.data.city.name },
            { item: 'شمالا' },
            { item: '-' },
            { item: 'طول' },
            { item: this.data.tall_northern },
            { item: this.data.trans_general_site },

            { item: '' },

            { item: this.data.trans_the_design },
            { item: this.data.trans_attributable },
            // الخدمات
            { item: '' },

            { item: this.data.trans_streets },
            { item: this.data.trans_neighbor },
            { item: this.data.trans_construction_condition },

          ],
          [
            { item: 'الحي' },
            { item: this.data.neighborhood.name },
            { item: 'جنوبا' },
            { item: '-' },
            { item: 'طول' },
            { item: this.data.tall_southern },
            { item: '' },

            { item: '' },

            { item: '' },
            { item: '' },
            // الخدمات
            { item: '' },

            { item: '' },
            { item: '' },
            { item: '' },

          ],
          [
            { item: 'رقم المخطط' },
            { item: this.data.residential_plan_no },
            { item: 'شرقا' },
            { item: 'مسبح بطول' },
            { item: 'طول' },
            { item: this.data.tall_eastern },
            { item: '' },

            { item: '' },

            { item: '' },
            { item: '' },
            // الخدمات
            { item: '' },

            { item: '' },
            { item: '' },
            { item: '' },

          ],
          [
            { item: 'رقم القطعة' },
            { item: this.data.trans_part_num },
            { item: 'غربا' },
            { item: '-' },
            { item: 'طول' },
            { item: this.data.tall_western },
            { item: '' },

            { item: 'نوع التشطيب' },
            { item: '' },

            { item: '' },
            // الخدمات
            { item: '' },

            { item: '' },
            { item: '' },
            { item: '' },

          ],
          [
            { item: 'رقم البلك' },
            { item: this.data.trans_Albulk_num },
            { item: 'اقرب شارع', cols: 2 },
            { item: '-', cols: 9 },
          ],
        ]
      },

      description_finshed () {
        return (
          [
            [
              {
                value: 'نوع الأرضيات',
                type: 'field',
                cols: 2,
              },
              {
                value: 'نوع الواجهات',
                type: 'field',
                cols: 2,
              },
              {
                value: 'مميزات العقار',
                type: 'field',
                cols: 2,
              },
              {
                value: 'نوع التكييف',
                type: 'field',
              },
              {
                value: 'الهيكل الإنشائي',
                type: 'field',
              },
              {
                value: 'نوع الأسقف',
                type: 'field',
              },
            ],
            [
              {
                value: 'الأحواش',
                field: '',
              },
              {
                value: this.data.trans_the_type_of_yard_floor,
                field: '',
              },
              {
                value: 'الشمالية',
                field: '',
              },
              {
                value: this.data.north_facade,
                field: '',
              },
              {
                value: 'حوائط مزدوجة',
                field: '',
              },
              {
                value: 'سلالم',
                field: '',
              },
              {
                value: 'مركزي',
                field: '',
              },
              new Field('خرساني'),
              new Field('خرسانة مسلحة'),
            ],
            [
              new Field('الإستقبال'),
              new Field(''),
              new Field('الغربیة'),
              new Field(this.data.western_facade),
              new Field('زجاج مزدوج'),
              new Field('كراج كھربائي'),
              new Field('منفصل'),

              new Field(this.data.trans_structural_structure),
              new Field(this.data.trans_bishop_type),
            ],
            [
              new Field('المدخل'),
              new Field(''),
              new Field('الشرقیة'),
              new Field(this.data.eastern_facade),
              new Field(' جبس بالسقف'),
              new Field(' كراج عادي'),
              new Field(' شباك'),
              new Field(''),
              new Field(''),
            ],
            [
              new Field('الغرف'),
              new Field(''),
              new Field('الجنوبية'),
              new Field(this.data.south_facade),
              new Field('إضاءة مخفية'),
              new Field('بوبات'),
              new Field('مركب'),
              new Field(''),
              new Field(''),
            ],
            [
              new Field(''),
              new Field(''),
              new Field(''),
              new Field(''),

              new Field('مصاعد'),
              new Field('سخانات'),
              new Field('غير مركب'),
              new Field('الأبواب الخارجية', 'field'),
              new Field(this.data.trans_bolt_the_outer_doors),
            ],
            [
              new Field('نوع العزل', 'field'),
              new Field(this.data.trans_insulation_type, '', 3),
              new Field('حمام عربي'),
              new Field('حمام افرنجي'),
              new Field('توصيلات فقط'),
              new Field('الأبواب الداخلية', 'field'),
              new Field(this.data.trans_wool_interior_doors),
            ],
          ]
        )
      },
      // styleData () {
      //   return ({
      //     'background-color': this.data.customer.cs_data_background_color,
      //     color: this.data.customer.cs_data_fount_color,
      //     'border-color': this.data.customer.cs_data_frame_color,
      //   })
      // },
      // styleSubData () {
      //   return ({
      //     'background-color': this.data.customer.cs_subdata_background_color,
      //     color: this.data.customer.cs_subdata_fount_color,
      //     'border-color': this.data.customer.cs_subdata_frame_color,
      //   })
      // },
      getMethods () {
        if (Array.isArray(this.data.evaluation_criteria) && this.data.evaluation_criteria.length !== 0) {
          if (this.data.evaluation_criteria.length === 3) {
            return 'All'
          } else if (this.data.evaluation_criteria.length === 2) {
            if (this.data.evaluation_criteria.includes(3) && this.data.evaluation_criteria.includes(2)) {
              return 'TwoNThree'
            } else if (this.data.evaluation_criteria.includes(1) && this.data.evaluation_criteria.includes(2)) {
              return 'OneNTwo'
            } else if (this.data.evaluation_criteria.includes(1) && this.data.evaluation_criteria.includes(3)) {
              return 'OneNThree'
            }
          } else if (this.data.evaluation_criteria.length === 1) {
            if (this.data.evaluation_criteria.includes(1)) {
              return 'One'
            } else if (this.data.evaluation_criteria.includes(2)) {
              return 'Two'
            } else if (this.data.evaluation_criteria.includes(3)) {
              return 'Three'
            }
          }
        }

        return 'None'
      },
      /**
       * ! TODO: replace it with proper keys from the database
       *  */
      cm_space_total () {
        let totalSpace = 0

        if (this.data.transactions_buildings) {
          this.data.transactions_buildings.forEach(b => {
            if (b.building_type !== 'الأرض' && b.building_type !== 'الأسوار') {
              totalSpace += +b.space
            }
          })
        }

        return totalSpace
        // this.data.cm_space_price_average = totalPriceSpace / counterTotalPriceSpace
      },
      cm_space_price_average () {
        let totalPriceSpace = 0
        let counterTotalPriceSpace = 0

        if (this.data.transactions_buildings) {
          this.data.transactions_buildings.forEach(b => {
            if (+b.price !== 0) {
              counterTotalPriceSpace++
              totalPriceSpace += +b.price
            }
          })
        }
        return totalPriceSpace / counterTotalPriceSpace
      },
    },
    async beforeMount () {
      const { data } = await googleMapsService.fetchOneItem()

      loadGmapApi({
        key: data?.google_maps_key || 'AIzaSyD9w2tU1GEpr4q2ECu-oTuB9ZC3nYOug3Q',
        libraries: 'places',
        language: 'ar',
        region: 'SA',
      })
    },
    methods: {
      join: function (array) {
        return array.filter(item => typeof item !== 'undefined').join(', ')
      },
      addPercentage: function (number) {
        if (number) {
          return number + '%'
        }

        return ''
      },
      formatCurrency: function (number) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',

        })

        if (number) {
          return formatter.format(+number).replace('$', '')
        }

        return ''
      },
      formatDate: function (date) {
        if (date) {
          return new Date(date).toLocaleDateString('en-GB').split('/').reverse().join('-')
        } else {
          return ''
        }
      },
      priceFromMeter: function (price, space) {
        if (!price || !space) {
          return ''
        } else {
          return this.formatCurrency(space / price)
        }
      },
    },
  })
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap');
#pdf-content {
  width: 95%;
  margin: 30px auto;
}
.first {
  margin-top: 20px;
}
.last {
  margin-bottom: 20px;
}
.collapse {
  visibility: collapse;
}
.container-header {
  width:97%;
  margin: auto;
  direction: rtl;
  text-align: right;
}
.container-header h1 {
  font-size: 24px;
}
.container-header .color {
  color: #187F7B;
}
.container-header .sub-header {
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:10px;
  margin-bottom:10px;
}
.container-header .sub-header h2 {
  font-size: 16px;
}
.container-header .sub-header h3 {
  font-size: 12px;
  /* color: #57585A; */
}

.image-facilty img{
  width: 200px;
  height:100px;
  object-fit: cover;
}
.not-empty {
  min-height: 60px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #57585A;
  margin-bottom: 30px;
}

*:not(.v-icon){
  font-family: 'Baloo Bhaijaan 2', cursive;
  font-weight: normal;
}

table {
  width:100%;
  direction: rtl;
}
table.table-fixed {
  table-layout: fixed;
}
table, th, td, .td {
  border: 1px solid #ccc;
  border-collapse: collapse;
}
table:not(:first-child), table:not(:first-child) th {
  border-top: unset;
}
.colspan td {
  padding: 3px;
}
td,.td{
  padding: 3px 5px;
}
tbody td {
  text-align: right;
}
table thead, .thead {
  background: #187F7B;
  color: #fff;
}
table thead.diff {
  background: #57585A;
  color: #fff;
}
table thead .header {
  display: flex;
  justify-content: space-between;
  padding: 3px 15px;
}
table thead th {
  text-align: right;
  font-size:12px;
}
table tbody td ,.td{
  font-size: 10px !important;
}
table tbody td.small {
  font-size: 9px !important;
}
.td {
  text-align: center;
}
table tbody.has-fields tr td.field {
  background: #F3F5F5;
}

.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.text-align-center .v-input--checkbox {
  display: inline-block !important;
}

.checkbox-label {
  color: #333 !important;
}

tbody.images {
  display: grid;
  grid-template-columns: 352px 352px;
  justify-content:space-between;
  grid-row-gap: 2px;
}

.image-transaction {
  position: relative;
}

.image-transaction,
.image-transaction img {
  width: 352px !important;
  height:240px !important;
  object-fit: contain;
}

.image_date {
  display: inline-block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  text-align: center;
  position: absolute;
  z-index: 2;
  left: 5px;
  bottom: 5px;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  font-size: 11px;
}

.html2pdf__page-break {
  direction: rtl;
  text-align: center;
}
/* .html2pdf__page-break::before {
  direction: rtl;
  content: attr(data-number);
  text-align: right;
} */
</style>
