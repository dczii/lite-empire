export const MonetizationList: Array<string> =  ["Affiliate",
  "Amazon Associates",
  "Amazon FBA",
  "Amazon FBM",
  "Amazon KDP",
  "Amazon Merch",
  "Application",
  "Digital Product",
  "Display Advertising",
  "DropShipping",
  "eCommerce",
  "Info Product",
  "Lead Gen",
  "Other",
  "SaaS",
  "Service",
  "Subscription",
  "Subscription-Box"
]

export const columnList: IColumnList ={
  listing: true,
  nicheStatus: true,
  status: true,
  price: true,
  monthlyNetProfit: true,
  rfs: true,
  risk: true,
  countries: true,
  businessCreated: true,
}

export const columnListTranslate: Record<
keyof typeof columnKeys,
string
> = {
  listing: 'Listing',
  nicheStatus: 'Niche Status',
  status: 'Status',
  price: 'Price',
  monthlyNetProfit: 'Monthly Net Profit',
  rfs: 'Reason For Sale',
  risk: 'Risk',
  countries: 'Countries',
  businessCreated: 'Business Created'
}