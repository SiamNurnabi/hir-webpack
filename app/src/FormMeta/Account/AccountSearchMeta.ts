import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const AccountSearchMeta: IFilterField[] = [
  {
    label: "Account Type",
    inputType: DROPDOWN,

    fieldName: "AccountTypeID",
    ariaLabel: "Account Type Select",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Name",
    inputType: TEXT,

    fieldName: "AccountName",
    ariaLabel: "Account Name"
  },
  {
    label: "Contact Last Name",
    inputType: TEXT,

    fieldName: "LastName",
    ariaLabel: "Last Name"
  },
  {
    label: "Contact First Name",
    inputType: TEXT,

    fieldName: "FirstName",
    ariaLabel: "First Name"
  }
]
