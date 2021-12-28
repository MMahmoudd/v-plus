<template>
  <div id="pdf-content">
    <div class="container-header">
      <div style="display:none;">
        {{ styleData }}
        {{ styleSubData }}
      </div>
      <h1>
        نموذج
        <span class="color">تقرير التقييم</span>
      </h1>

      <div class="sub-header d-flex justify-content-between align-items-start">
        <div>
          <h2>الرقم المرجعي للتقرير</h2>
          <h3>رقم الهاتف:</h3>
          <h3>المملكة العربية السعودية،</h3>
        </div>
        <div>
          <h2>تاريخ إصدار التقرير</h2>
          <h3>رمز إيداع التقرير:</h3>
        </div>
      </div>
    </div>
    <div class="divider" />
    <table class="colspan">
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                هوية المقيّم المعتمد
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
          <td rowspan="2">
            اسم المقيم المعتمد
          </td><td rowspan="2">
            {{ data.facility.resident_name || '' }}
          </td><td>رقم الترخيص</td><td>{{ data.facility.license_number || '' }}</td>
        </tr>
        <tr><td>تاريخ الترخيص</td><td>{{ data.facility.license_date || '' }}</td></tr>
      </tbody>
    </table>
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header">
              <div class="header-text">
                نطاق العمل
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
          >
            إسم العميل
          </td>
          <td>{{ data.customer.cs_name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            إسم مستخدم التقرير
          </td>
          <td>{{ data.trans_report_name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            الغرض من التقييم
          </td>
          <td>{{ data.evaluationpurpose.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            أساس القيمة
          </td>
          <td>محمد أحمد</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ التقييم
          </td>
          <td>{{ data.trans_evaluation_date || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ المعاينة
          </td>
          <td>{{ data.trans_inspection_date || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            الرقم المرجعي
          </td>
          <td>{{ data.trans_reference_number || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ التكليف
          </td>
          <td>{{ data.trans_assignment_date || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع التقرير
          </td>
          <td>
            {{ data.trans_Report_type || '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- الأصل محل التقييم -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="5">
            <div class="header">
              <div class="header-text">
                الأصل محل التقييم
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
                  {{ type.name }}
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
                  {{ type.name }}
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- تفاصيل موقع العقار-->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header">
              <div class="header-text">
                تفاصيل موقع العقار
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
          >
            اسم المدينة
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم الحي
          </td>
          <td>{{ data.neighborhood.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم الشارع
          </td>
          <td>{{ data.trans_street_name|| '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم المخطط
          </td>
          <td>{{ data.residential_plan_name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم المخطط
          </td>
          <td>{{ data.residential_plan_no || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم البلوك
          </td>
          <td>{{ data.trans_Albulk_num || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم القطعة
          </td>
          <td>{{ data.trans_part_num || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            استخدام العقار
          </td>
          <td>{{ data.propertyrating.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            احداثيات الموقع
          </td>
          <td>
            {{ data.latitude || '' }}
            {{ data.longitude || '' }}
          </td>
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
            رقم الصك
          </td>
          <td>{{ data.trans_instrument_num|| '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ الصك
          </td>
          <td>{{ data.trans_instrument_date|| '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم رخصة البناء
          </td>
          <td>{{ data.trans_building_permit_number|| '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ رخصة البناء
          </td>
          <td>{{ new Date(data.trans_building_permit_date).toLocaleDateString('en-GB').split('/').reverse().join('-') }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            عمر البناء
          </td>
          <td>{{ data.trans_construction_age || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم محضر التجزئة
          </td>
          <td>{{ data.trans_retail_record_num || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            حالة العقار
          </td>
          <td>مثال</td>
          <td
            class="field"
            :style="styleSubData"
          >
            حالة الإشغال
          </td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="html2pdf__page-break" />
    <table class="first">
      <tbody class="has-fields">
        <tr class="collapse">
          <td
            class="field"
            :style="styleSubData"
          >
            اسم المدينة
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم الحي
          </td>
          <td>{{ data.neighborhood.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم الشارع
          </td>
          <td>{{ data.trans_street_name|| '' }}</td>
        </tr>
        <tr class="collapse">
          <td
            class="field"
            :style="styleSubData"
          >
            اسم المخطط
          </td>
          <td>{{ data.residential_plan_name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم المخطط
          </td>
          <td>{{ data.residential_plan_no || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم البلوك
          </td>
          <td>{{ data.trans_Albulk_num || '' }}</td>
        </tr>
        <tr class="collapse">
          <td
            class="field"
            :style="styleSubData"
          >
            رقم القطعة
          </td>
          <td>{{ data.trans_part_num || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            استخدام العقار
          </td>
          <td>{{ data.propertyrating.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            احداثيات الموقع
          </td>
          <td class="collapse">
            {{ data.latitude || '' }}
            {{ data.longitude || '' }}
          </td>
        </tr>
        <tr class="collapse">
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
            رقم الصك
          </td>
          <td>{{ data.trans_instrument_num|| '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ الصك
          </td>
          <td>{{ data.trans_instrument_date|| '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم رخصة البناء
          </td>
          <td>{{ data.trans_building_permit_number|| '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ رخصة البناء
          </td>
          <td>{{ new Date(data.trans_building_permit_date).toLocaleDateString('en-GB').split('/').reverse().join('-') }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            عمر البناء
          </td>
          <td>{{ data.trans_construction_age || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم محضر التجزئة
          </td>
          <td>{{ data.trans_retail_record_num || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            حالة العقار
          </td>
          <td>مثال</td>
          <td
            class="field"
            :style="styleSubData"
          >
            حالة الإشغال
          </td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table> -->
    <!--تفاصيل إضافيه-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header">
              <div class="header-text">
                تفاصيل إضافيه
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
          >
            الموقع العام
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            التصميم
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            المنسوب
          </td>
          <td>{{ data.city.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            الجار
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            الشوارع
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اضاءة السوارع
          </td>
          <td>{{ data.city.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            التيار الكهربائي
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع العزل
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع أرضية الأحواش
          </td>
          <td>{{ data.city.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع أرضية الاستقبال
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع أرضية المدخل
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع أرضية الغرف
          </td>
          <td>{{ data.city.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            وصف الأبواب الخارجية
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            وصف الأبواب الداخلية
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            الهيكل الإنشائي
          </td>
          <td>{{ data.city.name || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع السقف
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم المدينة
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            اسم المدينة
          </td>
          <td>{{ data.city.name || '' }}</td>
        </tr>
      </tbody>
    </table>
    <div class="html2pdf__page-break" />
    <!--تكملة تفاصيل إضافيه-->
    <table class="first">
      <tbody class="has-fields">
        <tr>
          <td
            class="field"
            :style="styleSubData"
            rowspan="5"
          >
            نوع التكييف
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
            مركب
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            غير مركب
          </td>
        </tr>
        <tr>
          <td>
            مركزي
          </td>
          <td>
            1
          </td>
          <td>
            3
          </td>
        </tr>
        <tr>
          <td>
            شباك
          </td>
          <td>
            1
          </td>
          <td>
            2
          </td>
        </tr>
        <tr>
          <td>
            كونسيلد
          </td>
          <td>
            23
          </td>
          <td>
            23
          </td>
        </tr>
        <tr>
          <td>
            منفصل
          </td>
          <td>
            1
          </td>
          <td>
            2
          </td>
        </tr>
      </tbody>
    </table>
    <!-- وصف العقار-->
    <table>
      <thead class="diff">
        <tr>
          <th colspan="4">
            <div class="header ">
              <div class="header-text">
                وصف العقار
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
          <td colspan="4">
            <p style="min-height:100px">
              {{ data.property_notes || '' }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- حدود وأطوال العقار -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                حدود وأطوال العقار
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
          >
            الجهة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            طول ضلع الأرض
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الوصف
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الواجهات
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            شمالي
          </td>
          <td>{{ data.northern_border || '' }}</td>
          <td>مثال</td>
          <td>{{ data.north_facade || '' }}</td>
          <!-- <td>مساحة الأرض</td>
          <td>{{ data.land_area || '' }}</td> -->
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            غربي
          </td>
          <td
            style="padding:0px;"
          >
            مثال
          </td>
          <td
            style="padding:0px;"
          >
            مثال
          </td>
          <td
            style="padding:0px;"
          >
            {{ data.western_facade || '' }}
          </td>
          <!-- <td
            rowspan="1"
            style="padding:0px;"
          >
            مساحة المباني
          </td>

          <td style="padding:0px;">
            مثال
          </td> -->
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            جنوبي
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>{{ data.south_facade || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            شرقي
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>{{ data.eastern_facade || '' }}</td>
        </tr>
      </tbody>
    </table>
    <!--معلومة رخصة البناء-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                معلومات رخصة البناء
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
            style="width:25%;"
            class="field"
            :style="styleSubData"
          >
            هل العقار على الطبيعة
            مطابق لرخصة البناء
          </td>
          <td style="width:25%;">
            <v-checkbox
              v-model="data.conforms_building_permit"
              value="1"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  نعم
                </div>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="data.conforms_building_permit"
              value="0"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  لا
                </div>
              </template>
            </v-checkbox>
          </td>
          <td
            style="width:25%;"
            class="field"
            :style="styleSubData"
          >
            حدود المعاينة
          </td>
          <td style="width:25%;">
            <v-checkbox
              v-model="data.internal_preview"
              value="1"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  من داخل العقار
                </div>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="data.internal_preview"
              value="0"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  من خارج العقار
                </div>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="data.internal_preview"
              value="1"
              hide-details
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  من داخل وخارج العقار
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr>
        <tr>
          <td
            colspan="4"
            class="field"
            :style="styleSubData"
          >
            في حال عدم مطابقة العقار لرخصة البناء، الرجاء توضيح المخالفات أو أي مالحظات:
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p style="min-height:50px;">
              {{ data.review_note || '' }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- مكونات العقار-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                مكونات العقار
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
          <!-- <td
            class="field"
            :style="styleSubData"
          >
            الوصف
          </td> -->
          <td
            class="field"
            :style="styleSubData"
          >
            مجالس
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            غرف طعام
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            غرف نوم
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            مطابخ
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            دورات مياه
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            جاكوزي
          </td>
        </tr>        <tr>
          <!-- <td
            class="field"
            :style="styleSubData"
          >
            العدد
          </td> -->
          <td>{{ data.trans_boards || '0' }}</td>
          <td>{{ data.trans_dining_rooms || '0' }}</td>
          <td>{{ data.trans_bed_room || '0' }}</td>
          <td>{{ data.trans_kitchens || '0' }}</td>
          <td>{{ data.trans_toilets || '0' }}</td>
          <td>{{ data.trans_jacuzzi || '0' }}</td>
        </tr>          <tr>
          <!-- <td
            class="field"
            :style="styleSubData"
          >
            الوصف
          </td> -->

          <td
            class="field"
            :style="styleSubData"
          >
            حديقة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            غرفة خادمة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            غرفة حارس
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            قبو
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الصالات
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            الملاحق
          </td>
        </tr>        <tr>
          <!-- <td
            class="field"
            :style="styleSubData"
          >
            العدد
          </td> -->
          <td>{{ data.trans_garden || '0' }}</td>
          <td>{{ data.trans_maids_room || '0' }}</td>
          <td>{{ data.trans_guard_Room || '0' }}</td>
          <td>{{ data.trans_basement || '0' }}</td>
          <td>{{ data.trans_halls || '0' }}</td>
          <td>{{ data.trans_supplements || '0' }}</td>
        </tr>          <tr>
          <!-- <td
            class="field"
            :style="styleSubData"
          >
            الوصف
          </td> -->

          <td
            class="field"
            :style="styleSubData"
          >
            مصاعد
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            موقف سيارات
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            ملاعب أطفال
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            مسبح
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            مستودع
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            أخرى
          </td>
        </tr>        <tr>
          <!-- <td
            class="field"
            :style="styleSubData"
          >
            العدد
          </td> -->

          <td>{{ data.trans_elevators || '0' }}</td>
          <td>{{ data.trans_parking || '0' }}</td>
          <td>{{ data.trans_children_playground || '0' }}</td>
          <td>{{ data.trans_swimming_pool || '0' }}</td>
          <td>{{ data.trans_storehouse || '0' }}</td>
          <td>{{ data.trans_storehouse || '0' }}</td>
        </tr>
      </tbody>
    </table>
    <!-- تصنيف مستوى تشطيبات البناء-->
    <div class="html2pdf__page-break" />
    <table class="first">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                تصنيف مستوى تشطيبات البناء
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
          <td class="text-align-center">
            <v-checkbox
              v-model="data.trans_finishing_status"
              hide-details
              value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  تشطيب فاخر
                </div>
              </template>
            </v-checkbox>
          </td>
          <td class="text-align-center">
            <v-checkbox
              v-model="data.trans_finishing_status"
              hide-details
              value="2"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  تشطيب متوسط
                </div>
              </template>
            </v-checkbox>
          </td>
          <td class="text-align-center">
            <v-checkbox
              v-model="data.trans_finishing_status"
              hide-details
              value="3"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  تشطيب عادي
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            <div>
              <span
                class="font-weight-bold"
                style="font-size:17px;"
              >تشطيبات خارجية:</span>
              <p>
                الواجهات من حجر طبيعي أو دهان
                ذو جودة عالية، نوعية األبواب الخارجية،
                نوعية أرضيات الساحات الخارجية،
              </p>
              <span
                class="font-weight-bold"
                style="font-size:17px;"
              >تشطيبات داخلية:</span>
              <p>
                نوعية أرضيات المداخل والمجالس
                وصاالت الطعام تتكون من رخام فاخر،
                نوعية األبواب الداخلية، نوعية العزل،
                نوعية الشبابيك، مكونات الجدران
                الخارجية تكون مزدوجة، نوعية
                التسليك والسباكة، نوعية الدهان
                الداخلي، أعمال الجبس بأشكال
                هندسية وجودتها، تكييف مركزي،
                مصعد، جودة عمال التشطيب.
              </p>
            </div>
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            <div>
              <span
                class="font-weight-bold"
                style="font-size:17px;"
              >تشطيبات خارجية:</span>
              <p>
                الواجهات من حجر طبيعي أو دهان
                ذو جودة عالية، نوعية األبواب الخارجية،
                نوعية أرضيات الساحات الخارجية،
              </p>
              <span
                class="font-weight-bold"
                style="font-size:17px;"
              >تشطيبات داخلية:</span>
              <p>
                نوعية أرضيات المداخل والمجالس
                وصاالت الطعام تتكون من رخام فاخر،
                نوعية األبواب الداخلية، نوعية العزل،
                نوعية الشبابيك، مكونات الجدران
                الخارجية تكون مزدوجة، نوعية
                التسليك والسباكة، نوعية الدهان
                الداخلي، أعمال الجبس بأشكال
                هندسية وجودتها، تكييف مركزي،
                مصعد، جودة عمال التشطيب.
              </p>
            </div>
          </td> <td
            class="field"
            :style="styleSubData"
          >
            <div>
              <span
                class="font-weight-bold"
                style="font-size:17px;"
              >تشطيبات خارجية:</span>
              <p>
                الواجهات من حجر طبيعي أو دهان
                ذو جودة عالية، نوعية األبواب الخارجية،
                نوعية أرضيات الساحات الخارجية،
              </p>
              <span
                class="font-weight-bold"
                style="font-size:17px;"
              >تشطيبات داخلية:</span>
              <p>
                نوعية أرضيات المداخل والمجالس
                وصاالت الطعام تتكون من رخام فاخر،
                نوعية األبواب الداخلية، نوعية العزل،
                نوعية الشبابيك، مكونات الجدران
                الخارجية تكون مزدوجة، نوعية
                التسليك والسباكة، نوعية الدهان
                الداخلي، أعمال الجبس بأشكال
                هندسية وجودتها، تكييف مركزي،
                مصعد، جودة عمال التشطيب.
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td
            colspan="3"
            class="text-align-center"
          >
            <v-checkbox
              v-model="data.trans_finishing_status"
              hide-details
              value="4"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  بدون شتطيب
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- الخدمات والمرافق المتوفرة بالعقار -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header ">
              <div class="header-text">
                الخدمات والمرافق المتوفرة بالعقار
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
            <v-checkbox
              v-model="data.is_telephone"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  هاتف
                </div>
              </template>
            </v-checkbox>
          </td>
          <td>
            <v-checkbox
              v-model="data.sanitation"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  صرف صحي
                </div>
              </template>
            </v-checkbox>
          </td>
          <td>
            <v-checkbox
              v-model="data.water_meter"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  مياة
                </div>
              </template>
            </v-checkbox>
          </td>
          <td>
            <v-checkbox
              v-model="data.electric_meter"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  الكهرباء
                </div>
              </template>
            </v-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- المحيط المؤثر للعقار -->
    <table class="table-fixed">
      <thead :style="styleData">
        <tr>
          <th colspan="5">
            <div class="header ">
              <div class="header-text">
                المحيط المؤثر للعقار
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
          <td class="text-align-center">
            <v-checkbox
              v-model="data.masjid"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  جامع
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.masjid_note , data.masjid_distance]) }}</p>

            <v-checkbox
              v-model="data.public_garden"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  حديقة
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.public_garden_note , data.public_garden_distance]) }}</p>
          </td>
          <td class="text-align-center">
            <v-checkbox
              v-model="data.medical_facility"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  مرفق طبي
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.medical_facility_note , data.medical_facility_distance]) }}</p>

            <v-checkbox
              v-model="data.educational_facility"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  مرفق تعليمي
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.educational_facility_note , data.educational_facility_distance]) }}</p>
          </td>
          <td class="text-align-center">
            <v-checkbox
              v-model="data.security_facility"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  مرفق أمنى
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.security_facility_note , data.security_facility_distance]) }}</p>
            <v-checkbox
              v-model="data.government_office"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  مقر حكومي
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.government_office_note , data.government_office_distance]) }}</p>
          </td>
          <td class="text-align-center">
            <v-checkbox
              v-model="data.market"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  سوق تجاري
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.market_note , data.market_distance]) }}</p>
            <v-checkbox
              v-model="data.highway"
              hide-details
              true-value="1"
            >
              <template v-slot:label>
                <div class="checkbox-label">
                  طريق سريع
                </div>
              </template>
            </v-checkbox>
            <p>{{ join([data.highway_note , data.highway_distance]) }}</p>
          </td>
          <td>أخرى:</td>
        </tr>
      </tbody>
    </table>
    <!-- نطاق البحث ومصادر معلومات المقيم -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                نطاق البحث ومصادر معلومات المقيم
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
            <p
              class="c-empty"
              style="min-height:60px;"
            >
              {{ data.scope_research_sources_information }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- أسلوب أو طريقة التقييم المستخدمة -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                أسلوب أو طريقة التقييم المستخدمة
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
            <div>أسلوب السوق</div>
          </td>
          <td><div>أسلوب الدخل</div></td>
          <td><div>أسلوب التكلفة</div></td>
        </tr>
        <tr>
          <td><div>طريقة البيوع المقارنة</div></td>
          <td><div>طريقة االستثمار )رسملة الدخل(</div></td>
          <td><div>طريقة التكلفة )المقاول(</div></td>
        </tr>
      </tbody>
    </table>
    <!--العقارات المقارنة-->
    <div class="html2pdf__page-break" />
    <table class="first">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                العقارات المقارنة
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
          >
            العقار المقارن
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            نوع العملية)تنفيذ/ حد/سوم(
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
            تاريخ العملية
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            السعر )ر.س(
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            السعر لكل متر
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            1 العقار المقارن
          </td>
          <td>{{ data.cm_operation_type || '' }}</td>
          <td>{{ data.cm_space || '' }}</td>
          <td>{{ formatDate(data.operation_date) }}</td>
          <td>{{ data.cm_price || '' }}</td>
          <td>داتا</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            2 العقار المقارن
          </td>
          <td>{{ data.cm_operation_type_2 || '' }}</td>
          <td>{{ data.cm_space_2 || '' }}</td>
          <td>{{ formatDate(data.operation_date_2) }}</td>
          <td>{{ data.cm_price_2 || '' }}</td>
          <td>داتا</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            3 العقار المقارن
          </td>
          <td>{{ data.cm_operation_type_3 || '' }}</td>
          <td>{{ data.cm_space_3 || '' }}</td>
          <td>{{ formatDate(data.operation_date_3) }}</td>
          <td>{{ data.cm_price_3 || '' }}</td>
          <td>داتا</td>
        </tr>
      </tbody>
    </table>
    <!--جدول التسويات-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                جدول التسويات
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
          >
            عناصر المقارنة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 1
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 2
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 3
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية عامل الوقت
          </td>
          <td>{{ addPercentage(data.cm_time_factor_adjustment) }}</td>
          <td>{{ addPercentage(data.cm_time_factor_adjustment_2) }}</td>
          <td>{{ addPercentage(data.cm_time_factor_adjustment_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية شروط التمويل
          </td>
          <td>{{ addPercentage(data.cm_settlement_financing_terms) }}</td>
          <td>{{ addPercentage(data.cm_settlement_financing_terms_2) }}</td>
          <td>{{ addPercentage(data.cm_settlement_financing_terms_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية ظروف السوق
          </td>
          <td>{{ addPercentage(data.cm_settling_market_conditions) }}</td>
          <td>{{ addPercentage(data.cm_settling_market_conditions_2) }}</td>
          <td>{{ addPercentage(data.cm_settling_market_conditions_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إجمالي تسويات التمويل والسوق
          </td>
          <td>{{ addPercentage(data.cm_total_funding_market_adjustments) }}</td>
          <td>{{ addPercentage(data.cm_total_funding_market_adjustments_2) }}</td>
          <td>{{ addPercentage(data.cm_total_funding_market_adjustments_3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر البيع بعد تسوية شروط التمويل وظروف السوق
          </td>
          <td>{{ formatCurrency(data.cm_price_after_settling_financing_terms) }}</td>
          <td>{{ formatCurrency(data.cm_price_after_settling_financing_terms2) }}</td>
          <td>{{ formatCurrency(data.cm_price_after_settling_financing_terms3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسوية المساحة
          </td>
          <td>{{ addPercentage(data.cm_space_settlement) }}</td>
          <td>{{ addPercentage(data.cm_space_settlement2) }}</td>
          <td>{{ addPercentage(data.cm_space_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تسويات أخرى

            (الحيازة، التنظيم<br> (سكني), الموقع، طبيعة الأرض،عدد  <br>الشوارع)
          </td>
          <td>{{ addPercentage(data.cm_other_settlement) }}</td>
          <td>{{ addPercentage(data.cm_other_settlement2) }}</td>
          <td>{{ addPercentage(data.cm_other_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            مجموع نسب التسويات (%)
          </td>
          <td>{{ addPercentage(data.cm_total_settlement) }}</td>
          <td>{{ addPercentage(data.cm_total_settlement2) }}</td>
          <td>{{ addPercentage(data.cm_total_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            سعر البيع بعد التسويات
          </td>
          <td>{{ formatCurrency(data.cm_selling_p_a_settlement) }}</td>
          <td>{{ formatCurrency(data.cm_selling_p_a_settlement2) }}</td>
          <td>{{ formatCurrency(data.cm_selling_p_a_settlement3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            األوزان النسبية للعقارات المقارنة
          </td>
          <td>{{ addPercentage(data.cm_relative_w_comparable_p) }}</td>
          <td>{{ addPercentage(data.cm_relative_w_comparable_p2) }}</td>
          <td>{{ addPercentage(data.cm_relative_w_comparable_p3) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="html2pdf__page-break" />
    <table class="first">
      <tbody class="has-fields">
        <tr style="visibility: collapse;">
          <td
            class="field"
            :style="styleSubData"
          >
            سعر البيع بعد تسوية شروط التمويل وظروف السوق
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 1
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 2
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            العقار المقارن 3
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            مساهمة العقارات المقارنة حسب الوزن النسبي
          </td>
          <td>{{ formatCurrency(data.cm_contribution_comparative_p_relative_weight) }}</td>
          <td>{{ formatCurrency(data.cm_contribution_comparative_p_relative_weight2) }}</td>
          <td>{{ formatCurrency(data.cm_contribution_comparative_p_relative_weight3) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة البيوع المقارنة
          </td>
          <td colspan="3">
            {{ formatCurrency(data.cm_market_v_comparative_sales_method) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!--أسلوب الدخل-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                أسلوب الدخل (رسملة الدخل)
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
          >
            إجمالي الدخل السنوي
          </td>
          <td>{{ formatCurrency(data.total_annual_income) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            خصم خسائر عدم اإلشغال والتحصيل
          </td>
          <td>{{ formatCurrency(data.deduction_losses) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إجمالي الدخل الفعلي
          </td>
          <td>{{ formatCurrency(data.total_actual_income) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            ناقصا النفقات التشغيلية والرأسمالية
          </td>
          <td>{{ formatCurrency(data.m_operating_c_expenditures) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            صافي الدخل التشغيلي
          </td>
          <td>{{ formatCurrency(data.net_operating_income) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            معدل الرسملة عامل شراء السنوات
          </td>
          <td>{{ addPercentage(data.capitalization_rate) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية باستخدام طريقة رسملة الدخل
          </td>
          <td>{{ formatCurrency(data.market_v_income_c_method) }}</td>
        </tr>
      </tbody>
    </table>
    <!--طريقة التكلفة-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                طريقة التكلفة
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
          >
            قيمة الاستبدال
          </td>
          <td>{{ formatCurrency(data.cm_exchange_value) }}</td>
          <td>{{ data.cm_exchange_note || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            التكاليف المباشرة
          </td>
          <td>{{ formatCurrency(data.cm_direct_costs) }}</td>
          <td>{{ data.cm_direct_costs_note || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            التكاليف غير المباشرة
          </td>
          <td>{{ formatCurrency(data.cm_indirect_costs) }}</td>
          <td>{{ data.cm_indirect_costs_note || '' }}</td>
        </tr>
        <tr>
          <td colspan="3">
            ناقصا الإهلاك
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            1-التدهور المادي
          </td>
          <td>{{ addPercentage(data.cm_physical_deterioration_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_physical_deterioration_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            2-التقادم الوظيفي
          </td>
          <td>{{ addPercentage(data.cm_occupational_limitations_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_occupational_limitations_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            3-التقادم االقتصادي
          </td>
          <td>{{ addPercentage(data.cm_economic_obsolescence_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_economic_obsolescence_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            إحمالي الإهلاك (1+2+3)
          </td>
          <td>{{ addPercentage(data.cm_total_depreciation_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_total_depreciation_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة المهلكة للمباني
          </td>
          <td>{{ addPercentage(data.cm_depreciation_buildings_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_depreciation_buildings_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة المهلكة ألعمال الموقع
          </td>
          <td>{{ addPercentage(data.cm_depreciation_s_business_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_depreciation_s_business_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            قيمة الأرض
          </td>
          <td />
          <td />
        </tr>
      </tbody>
    </table>
    <div class="html2pdf__page-break" />
    <table class="first">
      <tbody class="has-fields">
        <tr style="visibility: collapse">
          <td>القيمة المهلكة ألعمال الموقع</td><td />
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            أرباح المطور
          </td>
          <td>{{ addPercentage(data.cm_developer_earnings_ratio) }}</td>
          <td>{{ formatCurrency(data.cm_developer_earnings_value) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بأسلوب التكلفة
          </td>
          <td colspan="2">
            {{ formatCurrency(data.cm_total_market_value) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!--الترجيح-->
    <table>
      <tbody class="has-fields">
        <tr>
          <td class="thead">
            الترجيح
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة البيوع المقارنة
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة رسملة الدخل
          </td>
          <td
            class="field"
            :style="styleSubData"
          >
            القيمة السوقية بطريقة التكلفة
          </td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            األوزان النسبية للطرق المستخدمة %
          </td>
          <td>{{ addPercentage(data.weights_market_value_relative_weights_roads_used) }}</td>
          <td>{{ addPercentage(data.weights_market_value_income_capitalization) }}</td>
          <td>{{ addPercentage(data.weights_market_value_cost) }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            مساهمة الطرق المستخدمة حسب الوزن النسبي
          </td>
          <td>{{ formatCurrency(data.relative_market_value_relative_weights_roads_used) }}</td>
          <td>{{ formatCurrency(data.relative_market_value_income_capitalization) }}</td>
          <td>{{ formatCurrency(data.relative_market_value_cost) }}</td>
        </tr>
      </tbody>
    </table>
    <!--القيمة السوقية بعد الترجيح-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                القيمة السوقية بعد الترجيح
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
          <td>القيمة رقمًا</td>
          <td>{{ formatCurrency(data.market_value_weighting_number) }}</td>
        </tr>
        <tr>
          <td>القيمة كتابة</td>
          <td>{{ data.market_value_weighting_text || '' }}</td>
        </tr>
      </tbody>
    </table>
    <!--المشاركون في إعداد التقرير-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                المشاركون في إعداد التقرير
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
          <td>الإسم</td>
          <td>1</td>
          <td>الإسم</td>
          <td>1</td>
        </tr>
        <tr>
          <td>
            المسمى
            <br>
            الوظيفي
          </td>
          <td>z</td>
          <td>
            المسمى
            <br>
            الوظيفي
          </td>
          <td>z</td>
        </tr>
        <tr>
          <td>فئة العضوية</td>
          <td>1</td>
          <td>فئة العضوية</td>
          <td>1</td>
        </tr>
        <tr>
          <td>فئة العضوية</td>
          <td>1</td>
          <td>رقم العضوية</td>
          <td />
        </tr>
        <tr>
          <td>التوقيع</td>
          <td>ء</td>
          <td>التوقيع</td>
          <td>ء</td>
        </tr>
      </tbody>
    </table>
    <!--هذا التقرير تم مراجعته واعتماده من قبل المقيم المعتمد-->
    <table>
      <thead style="background:#A7181C;">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                هذا التقرير تم مراجعته واعتماده من قبل المقيم المعتمد
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
          >
            الاسم
          </td>
          <td>{{ data.facility.resident_name || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            رقم الترخيص
          </td>
          <td>{{ data.facility.license_number || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            فرع التقييم
          </td>
          <td>{{ data.facility.evaluation_branch || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            فئة العضوية
          </td>
          <td>{{ data.facility.membership_category || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            صفته
          </td>
          <td>{{ data.facility.resident_adjective || '' }}</td>
          <td
            class="field"
            :style="styleSubData"
          >
            التوقيع
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td
            class="field"
            :style="styleSubData"
          >
            تاريخ التقرير
          </td>
          <td>مثال</td>
          <td
            class="field"
            :style="styleSubData"
          >
            ختم المنشأة
          </td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--المالحق والصور الفوتوغرافية-->
    <div
      class="html2pdf__page-break"
    />
    <table class="first">
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                المالحق والصور الفوتوغرافية
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
    </table>
    <!-- الصك -->
    <div
      v-show="data.instrument_file"
      class="last"
    >
      <img :src="data.imageBase + data.instrument_file">
      <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/800px-Circle_-_black_simple.svg.png"> -->
    </div>
    <div
      v-show="data.instrument_file"
      class="html2pdf__page-break"
    />
    <!-- المخطط -->
    <div
      v-show="data.attached_file"
      class="first"
    >
      <img :src="data.imageBase +data.attached_file">
    </div>
    <div
      v-show="data.attached_file"
      class="html2pdf__page-break"
    />
    <!-- خطاب التكليف -->
    <div
      v-show="data.assignment_letter_file"
      class="first"
    >
      <img :src="data.imageBase + data.assignment_letter_file">
    </div>
    <div
      v-show="data.assignment_letter_file"
      class="html2pdf__page-break"
    />

    <!--خريطة المقارنات-->
    <div class="first last">
      <gmap-map
        ref="vPlusMap"
        map-type-id="terrain"
        style="width: 100%; height: 450px"
        :center="{lat: +data.cm_latitude || 23, lng: +data.cm_longitude || 24}"
        :zoom="7"
      >
        <GmapMarker
          :position="{lat: +data.cm_latitude || 22, lng: +data.cm_longitude || 22}"
          :icon="{ url: require('../../../assets/marker-red.png'),size: {width: 60, height: 90, f: 'px', b: 'px',},
                   scaledSize: {width: 30, height: 30, f: 'px', b: 'px',},}"
        />
        <GmapMarker
          :position="{lat: +data.cm_latitude_2 || 23, lng: +data.cm_longitude_2 || 23}"
          :icon="{ url: require('../../../assets/marker-blue.png'),size: {width: 60, height: 90, f: 'px', b: 'px',},
                   scaledSize: {width: 30, height: 30, f: 'px', b: 'px',},}"
        />
        <GmapMarker
          :position="{lat: +data.cm_latitude_3 || 23, lng: +data.cm_longitude_3 || 24}"
          :icon="{ url: require('../../../assets/marker-yellow.png'),size: {width: 60, height: 90, f: 'px', b: 'px',},
                   scaledSize: {width: 30, height: 30, f: 'px', b: 'px',},}"
        />
      </gmap-map>
    </div>
    <!--القيود على االستخدام والنشر-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                القيود على االستخدام والنشر
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
            <p style="min-height:150px;">
              {{ data.trans_restrictions_publication || '' }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--إخالء المسؤولية-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                إخلاء المسؤولية
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
          <p style="min-height:150px;">
            {{ data.trans_evacuation_responsibility || '' }}
          </p>
        </tr>
      </tbody>
    </table>
    <!--الافتراضات والافتراضات الخاصة (إن وجدت)-->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="6">
            <div class="header ">
              <div class="header-text">
                الافتراضات والافتراضات الخاصة (إن وجدت)
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
            <p style="min-height:150px;">
              {{ data.trans_special_assumptions || '' }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- عملة التقييم -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                عملة التقييم
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
          <td colspan="4">
            ريال سعودي
          </td>
        </tr>
      </tbody>
    </table>
    <!-- المعايير المهنية -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                المعايير المهنية
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
          <td
            colspan="4"
          >
            <p
              class="not-empty"
              style="min-height:123px;"
            >
              {{ data.trans_professional_standard || '' }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- اقرار باالستقاللية وعدم تضارب المصالح -->
    <table>
      <thead :style="styleData">
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                اقرار بالاستقلالية وعدم تضارب المصالح
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
          <td
            colspan="4"
          >
            <p
              class="not-empty"
              style="min-height:123px;"
            >
              {{ data.acknowledgment_independence || '' }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  // import defaultValues from './defaultValuesForPdf.js'

  export default {
    name: 'PdfContent',
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      styleData () {
        return ({
          'background-color': this.data.customer.cs_data_background_color,
          color: this.data.customer.cs_data_fount_color,
          'border-color': this.data.customer.cs_data_frame_color,
        })
      },
      styleSubData () {
        return ({
          'background-color': this.data.customer.cs_subdata_background_color,
          color: this.data.customer.cs_subdata_fount_color,
          'border-color': this.data.customer.cs_subdata_frame_color,
        })
      },
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
          return formatter.format(+number)
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
    },
    // data: () => ({
    //   pdfDefaultData: { ...defaultValues },
    // }),
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap');
#pdf-content {
  width: 90%;
  margin: 30px auto;
}
.first {
  margin-top: 30px;
}
.last {
  margin-bottom: 30px;
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
  font-size: 28px;
}
.container-header .color {
  color: #187F7B;
}
.container-header .sub-header {
  direction: rtl;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-top:10px;
  margin-bottom:10px;
}
.container-header .sub-header h2 {
  font-size: 20px;
}
.container-header .sub-header h3 {
  font-size: 16px;
  color: #57585A;
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
table, th, td {
  border: 1px solid #ccc;
  border-collapse: collapse;
}
table:not(:first-child), table:not(:first-child) th {
  border-top: unset;
}
.colspan td {
  padding: 3px;
}
td {
  padding: 7px 5px;
}
tbody td {
  text-align: center;
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
  padding: 8px 15px;
}
table thead th {
  text-align: right;
  font-size:14px;
}
table tbody td {
  font-size: 12px !important;
}
table tbody.has-fields tr td.field {
  background: #F3F5F5;
}

.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.text-align-center .v-input--checkbox {
  display: inline-block;
}

.checkbox-label {
  color: #333;
}
</style>
