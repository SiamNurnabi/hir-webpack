import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"

import { SearchAccountLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Account Owner",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Select Date",
    inputType: DATE_PICKERS,
    rules: [{ required: true, message: "Date field is Required" }],
    displayKey: "From",
    fieldName: "TxDateFrom",
    valueKey: "FromDate",
    displayKey2: "To",
    fieldName2: "TxDateTo",
    valueKey2: "ToDate"
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
