type GlobalContext = {
  state: any
  dispatch: React.Dispatch<any>
}

declare interface IConfigProps {
  page: number,
  monetization: string
}

declare interface IColumnList {
  listing: boolean
  nicheStatus: boolean
  status: boolean
  price: boolean
  monthlyNetProfit: boolean
  rfs: boolean
  risk: boolean
  countries: boolean
  businessCreated: boolean
}

declare type IMonetizationType =
| "Affiliate"
| "Amazon Associates"
| "Amazon FBA"
| "Amazon FBM"
| "Amazon KDP"
| "Amazon Merch"
| "Application"
| "Digital Product"
| "Display Advertising"
| "DropShipping"
| "eCommerce"
| "Info Product"
| "Lead Gen"
| "Other"
| "SaaS"
| "Service"
| "Subscription"
| "Subscription-Box"

declare enum columnKeys {
  listing = 'listing',
  nicheStatus = 'nicheStatus',
  status = 'status',
  price = 'price',
  monthlyNetProfit = 'monthlyNetProfit',
  rfs = 'rfs',
  risk = 'risk',
  countries = 'countries',
  businessCreated = 'businessCreated',
}