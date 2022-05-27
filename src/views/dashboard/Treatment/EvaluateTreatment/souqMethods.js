function watchMany (arrayOfKeys, value) {
    const object = {}
    for (let i = 0; i < arrayOfKeys.length; i++) {
        object[arrayOfKeys[i]] = value
    }

    return object
}

function watchers () {
    return ({
        ...watchMany(
            [
                'data.cm_time_factor_adjustment',
                'data.cm_settlement_financing_terms',
                'data.cm_settling_market_conditions',
                'data.cm_space_settlement',
                'data.cm_other_settlement',
            ]
            , function () { this.setTotalFunding(1) }
        ),
        ...watchMany(
            [
                'data.cm_time_factor_adjustment_2',
                'data.cm_settlement_financing_terms_2',
                'data.cm_settling_market_conditions_2',
                'data.cm_space_settlement2',
                'data.cm_other_settlement2',
            ]
            , function () { this.setTotalFunding(2) }
        ),
        ...watchMany(
            [
                'data.cm_time_factor_adjustment_3',
                'data.cm_settlement_financing_terms_3',
                'data.cm_settling_market_conditions_3',
                'data.cm_space_settlement3',
                'data.cm_other_settlement3',
            ]
            , function () { this.setTotalFunding(3) }
        ),
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

        // القيمة السوقية باستخدام طريقة البيوع المقارنة
        'data.cm_contribution_comparative_p_relative_weight': function () {
            this.cm_market_v_comparative_sales_method()
        },
        'data.cm_contribution_comparative_p_relative_weight2': function () {
            this.cm_market_v_comparative_sales_method()
        },
        'data.cm_contribution_comparative_p_relative_weight3': function () {
            this.cm_market_v_comparative_sales_method()
        },
    })
}

export { watchers }
