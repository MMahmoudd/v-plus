export const reportNameList = [
    {
      name: 'رقم المعاملة',
      id: 1,
      key: 'transaction_id',
    },
    {
      name: 'رمز العقار / رقم الموقع / رقم العميل',
      id: 2,
      key: 'trans_deposit_code_site_num_customer_num',
    },
    {
      name: 'رقم التكليف',
      id: 3,
      key: 'trans_assignment_number',
    },
    {
      name: 'رقم الصك',
      id: 4,
      key: 'trans_instrument_num',
    },
    {
      name: 'اسم العميل',
      id: 5,
      key: 'customer.cs_name',
    },
    {
      name: 'اسم العميل – رقم التكليف',
      id: 6,
      key: ['customer.cs_name', 'trans_assignment_number'],
    },
]
