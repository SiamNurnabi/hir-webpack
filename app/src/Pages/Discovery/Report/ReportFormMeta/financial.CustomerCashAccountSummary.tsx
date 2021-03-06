import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  }
]

export default meta
