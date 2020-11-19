import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import WaitlistSearchCustomLookupFilter from "~/FormMeta/WaitlistEntries/WaitlistSearchCustomLookupFilter"

const sectionMeta: IFilterField[] = [
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "CreationTimeFrom",
    valueKey: "CreationTimeFrom",
    ariaLabel: "Creation Date From",
    displayKey2: "To",
    valueKey2: "CreationTimeTo",
    fieldName2: "CreationTimeTo",
    ariaLabel2: "Creation Date To"
  },
  {
    label: "Expiration Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "RequestExpirationTimeFromExclusive",
    valueKey: "RequestExpirationTimeFromExclusive",
    defaultValue: "",
    ariaLabel: "Expiration Date From",
    displayKey2: "To",
    fieldName2: "RequestExpirationTimeToExclusive",
    valueKey2: "RequestExpirationTimeToExclusive",
    ariaLabel2: "Expiration Date To"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsActive",
    ariaLabel: "Is Active",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Person Lookup",
    fieldName: "SiteID",
    customFilterComponent: WaitlistSearchCustomLookupFilter
  }
]

export default sectionMeta
