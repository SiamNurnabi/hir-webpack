import { getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, NUMBER, CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"

import { SearchAccountLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Order Date",
    rules: [{ required: true, message: "Order Date is Required" }],
    inputType: DATE_PICKERS,
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo"
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    rules: [{ required: true, message: "Account is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "OrderID",
    inputType: NUMBER,
    fieldName: "OrderID"
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    OrderDateFrom: "OrderDateFrom_DisplayOnly",
    OrderDateTo: "OrderDateTo_DisplayOnly"
  }
}

export default reportMeta
