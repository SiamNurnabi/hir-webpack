import { getSectionRosterStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const ActivityEnrollmentSearchMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Modified By User",
    inputType: TEXT,

    fieldName: "UserID",
    ariaLabel: "User ID"
  },
  {
    label: "Student Lookup",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Enrollment Status",
    inputType: DROPDOWN,

    fieldName: "SectionRosterStatusCodeID",
    ariaLabel: "Enrollment Status",
    refLookupService: getSectionRosterStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Activity Date Range",
    inputType: DATE_PICKERS,

    displayKey: "From",
    fieldName: "FromDate",
    valueKey: "FromDate",
    ariaLabel: "From",
    displayKey2: "To",
    fieldName2: "ToDate",
    valueKey2: "ToDate",
    ariaLabel2: "To"
  },
  {
    label: "Registration Source",
    inputType: DROPDOWN,

    fieldName: "SourceID",
    ariaLabel: "Registration Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  }
]
