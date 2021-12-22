<template>
  <div id="pdf-content">
    <table class="colspan">
      <thead>
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
    <table>
      <thead>
        <tr>
          <th colspan="4">
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
          <td class="field">
            إسم العميل
          </td>
          <td>{{ data.customer.cs_name || '' }}</td>
          <td class="field">
            إسم مستخدم التقرير
          </td>
          <td>{{ data.trans_report_name || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            الغرض من التقييم
          </td>
          <td>{{ data.evaluationpurpose.name || '' }}</td>
          <td class="field">
            أساس القيمة
          </td>
          <td>محمد أحمد</td>
        </tr>
        <tr>
          <td class="field">
            تاريخ التقييم
          </td>
          <td>{{ data.trans_evaluation_date || '' }}</td>
          <td class="field">
            تاريخ المعاينة
          </td>
          <td>{{ data.trans_inspection_date || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            الرقم المرجعي
          </td>
          <td>{{ data.trans_reference_number || '' }}</td>
          <td class="field">
            تاريخ التكليف
          </td>
          <td>{{ data.trans_assignment_date || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            نوع التقرير
          </td>
          <td colspan="3">
            {{ data.trans_Report_type || '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- عملة التقييم -->
    <table>
      <thead>
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
      <thead>
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
          <td colspan="4">
            {{ data.trans_professional_standard || '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- اقرار باالستقاللية وعدم تضارب المصالح -->
    <table>
      <thead>
        <tr>
          <th colspan="4">
            <div class="header">
              <div class="header-text">
                اقرار باالستقاللية وعدم تضارب المصالح
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
            {{ data.acknowledgment_independence || '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- الأصل محل التقييم -->
    <table>
      <thead>
        <tr>
          <th colspan="100">
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
      <tbody>
        <tr>
          <td
            v-for="type in data.propTypeList"
            :key="type.id"
          >
            {{ type.name }}
          </td>
        </tr>
        <tr>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!-- تفاصيل موقع العقار-->
    <table class="table-fixed">
      <thead>
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
          <td class="field">
            اسم المدينة
          </td>
          <td>{{ data.city.name || '' }}</td>
          <td class="field">
            اسم الحي
          </td>
          <td>{{ data.neighborhood.name || '' }}</td>
          <td class="field">
            اسم الشارع
          </td>
          <td>{{ data.trans_street_name|| '' }}</td>
        </tr>
        <tr>
          <td class="field">
            اسم المخطط
          </td>
          <td>{{ data.residential_plan_name || '' }}</td>
          <td class="field">
            رقم المخطط
          </td>
          <td>{{ data.residential_plan_no || '' }}</td>
          <td class="field">
            رقم البلوك
          </td>
          <td>{{ data.trans_Albulk_num || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            رقم القطعة
          </td>
          <td>{{ data.trans_part_num || '' }}</td>
          <td class="field">
            استخدام العقار
          </td>
          <td>{{ data.propertyrating.name || '' }}</td>
          <td class="field">
            احداثيات الموقع
          </td>
          <td>
            {{ data.latitude || '' }}
            {{ data.longitude || '' }}
          </td>
        </tr>
        <tr>
          <td class="field">
            اسم المالك
          </td>
          <td>{{ data.trans_owner_name || '' }}</td>
          <td class="field">
            رقم الصك
          </td>
          <td>{{ data.trans_instrument_num|| '' }}</td>
          <td class="field">
            تاريخ الصك
          </td>
          <td>{{ data.trans_instrument_date|| '' }}</td>
        </tr>
        <tr>
          <td class="field">
            رقم رخصة البناء
          </td>
          <td>{{ data.trans_building_permit_number|| '' }}</td>
          <td class="field">
            تاريخ رخصة البناء
          </td>
          <td>{{ new Date(data.trans_building_permit_date).toLocaleDateString('en-GB').split('/').reverse().join('-') }}</td>
          <td class="field">
            عمر البناء
          </td>
          <td>{{ data.trans_construction_age || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            رقم محضر التجزئة
          </td>
          <td>{{ data.trans_retail_record_num || '' }}</td>
          <td class="field">
            حالة البناء
          </td>
          <td>مثال</td>
          <td class="field">
            حالة الإشغال
          </td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!-- وصف العقار-->
    <div class="html2pdf__page-break" />

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
            ريال سعودي
          </td>
        </tr>
      </tbody>
    </table>
    <!-- حدود وأطوال العقار -->
    <table>
      <thead>
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
          <td class="field">
            الجهة
          </td>
          <td class="field">
            طول ضلع الأرض
          </td>
          <td class="field">
            الوصف
          </td>
          <td class="field">
            الواجهات
          </td>
          <td
            colspan="2"
            class="field"
          >
            المساحات
          </td>
        </tr>
        <tr>
          <td class="field">
            شمالي
          </td>
          <td>{{ data.northern_border || '' }}</td>
          <td>مثال</td>
          <td>{{ data.north_facade || '' }}</td>
          <td>مساحة الأرض</td>
          <td>{{ data.land_area || '' }}</td>
        </tr>
        <tr>
          <td
            class="field"
            rowspan="2"
          >
            غربي
          </td>
          <td rowspan="2">
            مثال
          </td>
          <td rowspan="2">
            مثال
          </td>
          <td rowspan="2">
            {{ data.western_facade || '' }}
          </td>
          <td rowspan="1">
            مساحة المباني
          </td>

          <td>مثال</td>
        </tr>
        <tr>
          <td rowspan="1">
            عدد األدوار للفلل السكنية
          </td>
          <td>{{ data.num_floors_residential_villas || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            جنوبي
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>{{ data.south_facade || '' }}</td>
          <td>مساحة القبو</td>
          <td>{{ data.basement_space || '' }}</td>
        </tr>
        <tr>
          <td class="field">
            شرقي
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>{{ data.eastern_facade || '' }}</td>
          <td>مساحة الملاحق</td>
          <td>{{ data.annexes_space || '' }}</td>
        </tr>
      </tbody>
    </table>
    <!--معلومة رخصة البناء-->
    <table>
      <thead>
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
          </td>
        </tr>
        <tr>
          <td
            colspan="4"
            class="field"
          >
            في حال عدم مطابقة العقار لرخصة البناء، الرجاء توضيح المخالفات أو أي مالحظات:
          </td>
        </tr>
        <tr>
          <td colspan="4">
            {{data.review_note || ''}}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- مكونات العقار-->
    <table>
      <thead>
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
          <td class="field">
            الوصف
          </td>
          <td class="field">
            مجالس
          </td>
          <td class="field">
            غرف طعام
          </td>
          <td class="field">
            غرف نوم
          </td>
          <td class="field">
            مطابخ
          </td>
          <td class="field">
            دورات مياه
          </td>
        </tr>        <tr>
          <td class="field">
            العدد
          </td>
          <td>{{data.trans_boards || ''}}</td>
          <td>{{data.trans_dining_rooms || ''}}</td>
          <td>{{data.trans_bed_room || ''}}</td>
          <td>{{data.trans_kitchens || ''}}</td>
          <td>{{data.trans_toilets || ''}}</td>
        </tr>          <tr>
          <td class="field">
            الوصف
          </td>
          <td class="field">
            جاكوزي
          </td>
          <td class="field">
            حديقة
          </td>
          <td class="field">
            غرفة خادمة
          </td>
          <td class="field">
            غرفة حارس
          </td>
          <td class="field">
            قبو
          </td>
        </tr>        <tr>
          <td class="field">
            العدد
          </td>
          <td>{{data.trans_jacuzzi || ''}}</td>
          <td>{{data.trans_garden || ''}}</td>
          <td>{{data.trans_maids_room || ''}}</td>
          <td>{{data.trans_guard_Room || ''}}</td>
          <td>{{data.trans_basement || ''}}</td>
        </tr>          <tr>
          <td class="field">
            الوصف
          </td>
          <td class="field">
            الصالات
          </td>
          <td class="field">
            الملاحق
          </td>
          <td class="field">
            مصاعد
          </td>
          <td class="field">
            موقف سيارات
          </td>
          <td class="field">
            ملاعب أطفال
          </td>
        </tr>        <tr>
          <td class="field">
            العدد
          </td>
          <td>{{data.trans_halls || ''}}</td>
          <td>{{data.trans_supplements || ''}}</td>
          <td>{{data.trans_elevators || ''}}</td>
          <td>{{data.trans_parking || ''}}</td>
          <td>{{data.trans_children_playground || ''}}</td>
        </tr>          <tr>
          <td class="field">
            الوصف
          </td>
          <td class="field">
            مسبح
          </td>
          <td class="field">
            مستودع
          </td>
          <td
            class="field"
            colspan="3"
            rowspan="2"
          >
            أخرى
          </td>
        </tr>        <tr>
          <td class="field">
            العدد
          </td>
          <td>{{data.trans_swimming_pool | ''}}</td>
          <td>{{data.trans_storehouse || ''}}</td>
        </tr>
      </tbody>
    </table>
    <!-- تصنيف مستوى تشطيبات البناء-->
    <div class="html2pdf__page-break" />
    <table>
      <thead>
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
          <td>تشطيب فاخر</td>
          <td>تشطيب متوسط</td>
          <td>تشطيب عادي</td>
        </tr>
        <tr>
          <td class="field">
            <div>
              <span class="font-weight-bold">تشطيبات خارجية:</span>
              <p>
                الواجهات من حجر طبيعي أو دهان
                ذو جودة عالية، نوعية األبواب الخارجية،
                نوعية أرضيات الساحات الخارجية،
              </p>
              <span class="font-weight-bold">تشطيبات داخلية:</span>
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
          <td class="field">
            <div>
              <span class="font-weight-bold">تشطيبات خارجية:</span>
              <p>
                الواجهات من حجر طبيعي أو دهان
                ذو جودة عالية، نوعية األبواب الخارجية،
                نوعية أرضيات الساحات الخارجية،
              </p>
              <span class="font-weight-bold">تشطيبات داخلية:</span>
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
          </td> <td class="field">
            <div>
              <span class="font-weight-bold">تشطيبات خارجية:</span>
              <p>
                الواجهات من حجر طبيعي أو دهان
                ذو جودة عالية، نوعية األبواب الخارجية،
                نوعية أرضيات الساحات الخارجية،
              </p>
              <span class="font-weight-bold">تشطيبات داخلية:</span>
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
          <td colspan="3">
            بدون تشطيب
          </td>
        </tr>
      </tbody>
    </table>
    <!-- الخدمات والمرافق المتوفرة بالعقار -->
    <table>
      <thead>
        <tr>
          <th colspan="6">
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
          <td>هاتف</td>
          <td>صرف صحي</td>
          <td>مياة</td>
          <td>الكهرباء</td>
        </tr>
      </tbody>
    </table>
    <!-- المحيط المؤثر للعقار -->
    <table>
      <thead>
        <tr>
          <th colspan="6">
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
          <td>هاتف</td>
          <td>صرف صحي</td>
          <td>مياة</td>
          <td>الكهرباء</td>
        </tr>
      </tbody>
    </table>
    <!-- نطاق البحث ومصادر معلومات المقيم -->
    <table>
      <thead>
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
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!-- أسلوب أو طريقة التقييم المستخدمة -->
    <table>
      <thead>
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
    <table>
      <thead>
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
      <tbody class="has-fields">
        <tr>
          <td class="field">
            العقار المقارن
          </td>
          <td class="field">
            نوع العملية)تنفيذ/ حد/سوم(
          </td>
          <td class="field">
            المساحة
          </td>
          <td class="field">
            تاريخ العملية
          </td>
          <td class="field">
            السعر )ر.س(
          </td>
          <td class="field">
            السعر لكل متر
          </td>
        </tr>
        <tr>
          <td class="field">
            1 العقار المقارن
          </td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
        </tr>
        <tr>
          <td class="field">
            2 العقار المقارن
          </td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
        </tr>
        <tr>
          <td class="field">
            3 العقار المقارن
          </td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
          <td>داتا</td>
        </tr>
      </tbody>
    </table>
    <div class="html2pdf__page-break" />
    <!--جدول التسويات-->
    <table>
      <thead>
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
          <td class="field">
            عناصر المقارنة
          </td>
          <td class="field">
            العقار المقارن 1
          </td>
          <td class="field">
            العقار المقارن 2
          </td>
          <td class="field">
            العقار المقارن 3
          </td>
        </tr>
        <tr>
          <td class="field">
            تسوية عامل الوقت
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            تسوية شروط التمويل
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            تسوية ظروف السوق
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            إجمالي تسويات التمويل والسوق
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            سعر البيع بعد تسوية شروط التمويل وظروف السوق
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            تسوية المساحة
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            تسويات أخرى
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            مجموع نسب التسويات )%(
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            سعر البيع بعد التسويات
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            األوزان النسبية للعقارات المقارنة
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            مساهمة العقارات المقارنة حسب الوزن النسبي
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            القيمة السوقية بطريقة البيوع المقارنة
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--أسلوب الدخل-->
    <table>
      <thead>
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
          <td class="field">
            إجمالي الدخل السنوي
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            خصم خسائر عدم اإلشغال والتحصيل
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            إجمالي الدخل الفعلي
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            ناقصا النفقات التشغيلية والرأسمالية
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            صافي الدخل التشغيلي
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            معدل الرسملة عامل شراء السنوات
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            القيمة السوقية باستخدام طريقة رسملة الدخل
          </td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--طريقة التكلفة-->
    <table>
      <thead>
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
          <td class="field">
            قيمة الاستبدال
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            التكاليف المباشرة
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            التكاليف غير المباشرة
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td colspan="3">
            ناقصا الإهلاك
          </td>
        </tr>
        <tr>
          <td class="field">
            1-التدهور المادي
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            2-التقادم الوظيفي
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            3-التقادم االقتصادي
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            إحمالي الإهلاك (1+2+3)
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            القيمة المهلكة للمباني
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            القيمة المهلكة ألعمال الموقع
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            قيمة األرض
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            أرباح المطور
          </td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            القيمة السوقية بأسلوب التكلفة
          </td>
          <td>مثال</td>
          <td>مثال</td>
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
          <td class="field">
            القيمة السوقية بطريقة البيوع المقارنة
          </td>
          <td class="field">
            القيمة السوقية بطريقة رسملة الدخل
          </td>
          <td class="field">
            القيمة السوقية بطريقة التكلفة
          </td>
        </tr>
        <tr>
          <td class="field">
            األوزان النسبية للطرق المستخدمة %
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            مساهمة الطرق المستخدمة حسب الوزن النسبي
          </td>
          <td>مثال</td>
          <td>مثال</td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--القيمة السوقية بعد الترجيح-->
    <table>
      <thead>
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
          <td />
        </tr>
        <tr>
          <td>القيمة كتابة</td>
          <td />
        </tr>
      </tbody>
    </table>
    <!--القيود على االستخدام والنشر-->
    <table>
      <thead>
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
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--إخالء المسؤولية-->
    <table>
      <thead>
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
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--الافتراضات والافتراضات الخاصة (إن وجدت)-->
    <table>
      <thead>
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
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--المشاركون في إعداد التقرير-->
    <table>
      <thead>
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
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--هذا التقرير تم مراجعته واعتماده من قبل المقيم المعتمد-->
    <table>
      <thead>
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
          <td class="field">
            الاسم
          </td>
          <td>مثال</td>
          <td class="field">
            رقم الترخيص
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            فرع التقييم
          </td>
          <td>مثال</td>
          <td class="field">
            فئة العضوية
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            صفته
          </td>
          <td>مثال</td>
          <td class="field">
            التوقيع
          </td>
          <td>مثال</td>
        </tr>
        <tr>
          <td class="field">
            تاريخ التقرير
          </td>
          <td>مثال</td>
          <td class="field">
            ختم المنشأة
          </td>
          <td>مثال</td>
        </tr>
      </tbody>
    </table>
    <!--المالحق والصور الفوتوغرافية-->
    <table>
      <thead>
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
  padding: 10px;
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
  padding: 10px 15px;
}
table thead th {
  text-align: right;
  font-size:18px;
}
table tbody.has-fields tr td.field {
  background: #F3F5F5;
}

.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.checkbox-label {
  color: #333;
}
</style>
