<template>
    <v-container>
        <v-row justify='space-between' align='center' class="mx-0 mt-4">
            <h1 font-weight-bold>معاملة رقم 1920215841</h1>
            <v-chip class="ma-2 time-chip" color="blue" label text-color="white">
                <v-icon left> mdi-clock-time-four-outline </v-icon>
                <span>تاريخ المعاملة</span>
            </v-chip>
        </v-row>
        <v-card class="form-container">
            <v-container>
                <div>
                    <form>
                        <div>
                            <h2>الملحقات</h2>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="الصك"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="المخطط"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="خطاب التكليف"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-file-input
                                    chips
                                    multiple
                                    counter
                                    show-size
                                    label="الأرشيف"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                small
                                                label
                                                color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                                
                            </v-row>
                        </div>
                        
                        <v-divider class="my-10"></v-divider>

                        <div>
                            <h2>إسناداً إلى</h2>
                            <v-row>
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">المقيم</label>
                                    <v-select
                                    :items="items"
                                    label="المقيم"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">المراجع</label>
                                    <v-select
                                    :items="items"
                                    label="المراجع"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">المعتمد</label>
                                    <v-select
                                    :items="items"
                                    label="المعتمد"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </div>

                        <v-divider class="my-10"></v-divider>

                        <div>
                            <h2>نطاق العمل وتفاصيل العقار</h2>
                            <v-row>
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">العميل</label>
                                    <v-select
                                    :items="items"
                                    label="العميل"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم مستخدم التقرير</label>
                                    <v-text-field
                                        label="اسم مستخدم التقرير"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">جوال مستخدم التقرير</label>
                                    <v-text-field
                                        label="جوال مستخدم التقرير"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">الغرض من التقييم</label>
                                    <v-select
                                    :items="items"
                                    label="الغرض من التقييم"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">أساس القيمة</label>
                                    <v-select
                                    :items="items"
                                    label="أساس القيمة"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">فرضية القيمة</label>
                                    <v-select
                                    :items="items"
                                    label="فرضية القيمة"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">تاريخ التكليف</label>
                                    <v-menu
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                single-line
                                                outlined
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="date"
                                        @input="menu1 = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">تاريخ التقييم</label>
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                single-line
                                                outlined
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="date"
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">تاريخ المعاينة</label>
                                    <v-menu
                                        v-model="menu3"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                single-line
                                                outlined
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="date"
                                        @input="menu3 = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع التقرير</label>
                                    <v-select
                                    :items="items"
                                    label="نوع التقرير"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رمز إيداع التقرير</label>
                                    <v-text-field
                                        label="رمز إيداع التقرير"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">الرقم المرجعى</label>
                                    <v-text-field
                                        label="الرقم المرجعى"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رمز العقار / رقم الموقع / رقم العميل</label>
                                    <v-text-field
                                        label="رمز العقار / رقم الموقع / رقم العميل"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            
                            <v-divider class="my-10"></v-divider>

                            <v-row>
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم المنطقة</label>
                                    <v-text-field
                                        label="اسم المنطقة"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم المدينة</label>
                                    <v-text-field
                                        label="اسم المدينة"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم الحى</label>
                                    <v-text-field
                                        label="اسم الحى"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم الشارع</label>
                                    <v-text-field
                                        label="اسم الشارع"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم المخطط</label>
                                    <v-text-field
                                        label="اسم المخطط"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم المخطط</label>
                                    <v-text-field
                                        label="رقم المخطط"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم البلوك</label>
                                    <v-text-field
                                        label="رقم البلوك"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم القطعة</label>
                                    <v-text-field
                                        label="رقم القطعة"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">استخدام العقار</label>
                                    <v-select
                                    :items="items"
                                    label="استخدام العقار"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع العقار</label>
                                    <v-select
                                    :items="items"
                                    label="نوع العقار"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اسم المالك</label>
                                    <v-text-field
                                        label="اسم المالك"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">جوال المالك</label>
                                    <v-text-field
                                        label="جوال المالك"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم الصك</label>
                                    <v-text-field
                                        label="رقم الصك"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">تاريخ الصك</label>
                                    <v-text-field
                                        label="تاريخ الصك"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم رخصة البناء</label>
                                    <v-text-field
                                        label="رقم رخصة البناء"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">تاريخ رخصة البناء</label>
                                    <v-text-field
                                        label="تاريخ رخصة البناء"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">عمر البناء</label>
                                    <v-text-field
                                        label="عمر البناء"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم محضر التجزئة</label>
                                    <v-text-field
                                        label="رقم محضر التجزئة"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">تاريخ محضر التجزئة</label>
                                    <v-text-field
                                        label="تاريخ محضر التجزئة"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">حالة البناء</label>
                                    <v-select
                                    :items="items"
                                    label="حالة البناء"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">حالة الأشغال</label>
                                    <v-select
                                    :items="items"
                                    label="حالة الأشغال"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-row>
                            
                            <v-divider class="my-10"></v-divider>

                            <v-row>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">الموقع العام</label>
                                    <v-select
                                    :items="items"
                                    label="الموقع العام"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">التصميم</label>
                                    <v-select
                                    :items="items"
                                    label="التصميم"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">المنسوب</label>
                                    <v-select
                                    :items="items"
                                    label="المنسوب"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">الجار</label>
                                    <v-select
                                    :items="items"
                                    label="الجار"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">الشوارع</label>
                                    <v-select
                                    :items="items"
                                    label="الشوارع"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">اضاءة الشوارع</label>
                                    <v-select
                                    :items="items"
                                    label="اضاءة الشوارع"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">التيار الكهربائى</label>
                                    <v-select
                                    :items="items"
                                    label="التيار الكهربائى"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع العزل</label>
                                    <v-text-field
                                        label="نوع العزل"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع أرضية الاحواش</label>
                                    <v-select
                                    :items="items"
                                    label="نوع أرضية الاحواش"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع أرضية الاستقبال</label>
                                    <v-select
                                    :items="items"
                                    label="نوع أرضية الاستقبال"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع أرضية المدخل</label>
                                    <v-select
                                    :items="items"
                                    label="نوع أرضية المدخل"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع أرضية الغرف</label>
                                    <v-select
                                    :items="items"
                                    label="نوع أرضية الغرف"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">وصف الأبواب الخارجية</label>
                                    <v-text-field
                                        label="وصف الأبواب الخارجية"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">وصف الأبواب الداخلية</label>
                                    <v-text-field
                                        label="وصف الأبواب الداخلية"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">الهيكل الانشائى</label>
                                    <v-select
                                    :items="items"
                                    label="الهيكل الانشائى"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>

                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوع الاسقف</label>
                                    <v-select
                                    :items="items"
                                    label="نوع الاسقف"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block font-weight-bold">مميزات العقار</label>
                                </v-col>
                            </v-row>
                            <v-row class="mt-0">
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex1"
                                    label="حوائط زجاجية"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex2"
                                    label="زجاج مزدوج"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex3"
                                    label="جبس فى السقف"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex4"
                                    label="إضاءة مخفية"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex5"
                                    label="مصاعد"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex5"
                                    label="حمام عربى"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex7"
                                    label="سلالم"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex8"
                                    label="كراج كهربائى"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex9"
                                    label="كراج عادى"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex10"
                                    label="بوابات"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex11"
                                    label="سخانات"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex12"
                                    label="حمام افرنجى"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                            </v-row>
                            
                            <v-row class="mt-10">
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block font-weight-bold">نوع التكييف</label>
                                </v-col>
                            </v-row>


                            <v-row class="mt-0 mb-5">
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex13"
                                    label="مركزى"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                            </v-row>
                            <v-row align="center"  v-for="(row,index) in airRows" :key="index">
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوعية التركيب</label>
                                    <v-select
                                    :items="items"
                                    label="نوعية التركيب"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم العداد</label>
                                    <v-text-field
                                        label="رقم العداد"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block font-weight-bold" @click.prevent="airRows++">
                                        <v-icon left> mdi-plus </v-icon>
                                        إضافة رقم عداد جديد
                                    </label>
                                </v-col>
                            </v-row>


                            <v-row class="mt-0 mb-5">
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex14"
                                    label="منفصل"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                            </v-row>
                            <v-row align="center"  v-for="(row,index) in airRows2" :key="'row2'+index">
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوعية التركيب</label>
                                    <v-select
                                    :items="items"
                                    label="نوعية التركيب"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم العداد</label>
                                    <v-text-field
                                        label="رقم العداد"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block font-weight-bold" @click.prevent="airRows2++">
                                        <v-icon left> mdi-plus </v-icon>
                                        إضافة رقم عداد جديد
                                    </label>
                                </v-col>
                            </v-row>

                            <v-row class="mt-0 mb-5">
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex15"
                                    label="شباك"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                            </v-row>
                            <v-row align="center"  v-for="(row,index) in airRows3" :key="'row3'+index">
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوعية التركيب</label>
                                    <v-select
                                    :items="items"
                                    label="نوعية التركيب"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم العداد</label>
                                    <v-text-field
                                        label="رقم العداد"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block font-weight-bold" @click.prevent="airRows3++">
                                        <v-icon left> mdi-plus </v-icon>
                                        إضافة رقم عداد جديد
                                    </label>
                                </v-col>
                            </v-row>

                            <v-row class="mt-0 mb-5">
                                <div class="mr-3">
                                    <v-checkbox  class="check-label"
                                    v-model="ex16"
                                    label="كونسيلد"
                                    color="info"
                                    value=""
                                    hide-details
                                    ></v-checkbox>
                                </div>
                            </v-row>
                            <v-row align="center"  v-for="(row,index) in airRows4" :key="'row4'+index">
                                <v-col
                                    cols="12"
                                    lg="3"
                                    md="4"
                                >
                                    <label class="d-block mb-3 font-weight-bold">نوعية التركيب</label>
                                    <v-select
                                    :items="items"
                                    label="نوعية التركيب"
                                    single-line
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block mb-3 font-weight-bold">رقم العداد</label>
                                    <v-text-field
                                        label="رقم العداد"
                                        single-line
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    lg="2"
                                    md="2"
                                >
                                    <label class="d-block font-weight-bold" @click.prevent="airRows4++">
                                        <v-icon left> mdi-plus </v-icon>
                                        إضافة رقم عداد جديد
                                    </label>
                                </v-col>
                            </v-row>
                        </div>

                        <v-divider class="my-10"></v-divider>

                        <v-row class="mb-10"
                            align="center"
                            justify="space-between"
                        >
                            <div>
                                <v-btn
                                x-large
                                class="ma-2"
                                color="blue"
                                >
                                    <v-icon left>
                                        fas fa-save
                                    </v-icon>
                                    حفظ
                                </v-btn>
                                <v-btn
                                x-large
                                class="ma-2"
                                outlined
                                color="blue"
                                >
                                    <v-icon left>
                                        far fa-paper-plane
                                    </v-icon>
                                    إرسال
                                </v-btn>
                            </div>
                            <div>
                                <v-btn
                                x-large
                                class="ma-2"
                                color="black"
                                >
                                تعليق
                                </v-btn>
                                <v-btn
                                x-large
                                class="ma-2"
                                color="error"
                                >
                                الغاء
                                </v-btn>
                            </div>
                        </v-row>
                    </form>
                </div>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    name: 'NewTreatment',

    data: () => ({
      airRows: 1,
      airRows2: 1,
      airRows3: 1,
      airRows4: 1,

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
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      // Date Inputs
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      menu3: false,
    }),
  }
</script>

<style lang="scss" scoped>
.time-chip span{
    font-size: 15px;
}
.form-container{
    margin-top: 50px;
}
.form-container h2{
    font-size: 25px;
    color: #37A8FF;
    margin-bottom: 25px
}
label{
    font-size: 13px;
}
</style>
