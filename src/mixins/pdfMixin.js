export const PdfMixin = {
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
}
