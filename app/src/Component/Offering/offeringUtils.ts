import { useState, useEffect } from "react"
import {
  getOfferingStatusTypes,
  getOrganizations,
  getOfferingTypes,
  getSectionTypes,
  getTagTypes
} from "~/ApiServices/Service/RefLookupService"
import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { IFilterValues } from "./FilterColumn"
import { IFilterValues as IInstructorFilterValues } from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { eventBus, REFRESH_OFFERING_PAGE } from "~/utils/EventBus"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

export function useFilterData() {
  const [offeringStatusTypes, setOfferingStatusTypes] = useState<Array<any>>([])
  const [tagTypes, setTagTypes] = useState<Array<any>>([])
  const [offeringTypes, setOfferingTypes] = useState<Array<any>>([])
  const [sectonTypes, setSectionTypes] = useState<Array<any>>([])
  const [organizations, setOrganizations] = useState<Array<any>>([])
  const [users, setUsers] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getOfferingStatusTypes()
      if (response && response.data && Array.isArray(response.data)) {
        setOfferingStatusTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getOrganizations()
      if (response && response.data) {
        setOrganizations(response.data)
      }
    })()
    ;(async () => {
      const response = await getOfferingTypes()
      if (response && response.data) {
        setOfferingTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getUsersByRole({ Role: "coordinator" })
      if (response && response.data) {
        setUsers(response.data)
      }
    })()
    ;(async () => {
      const response = await getSectionTypes()
      if (response && response.success) {
        setSectionTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getTagTypes()
      if (response && response.success) {
        setTagTypes(response.data)
      }
    })()
  }, [])

  return [offeringStatusTypes, tagTypes, offeringTypes, sectonTypes, organizations, users]
}

export function useOfferings(filterData: IFilterValues): [boolean, any[]] {
  const [offeringItems, setOfferingItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadOfferings = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["OfferingCode"] = filterData.OfferingCode !== "" ? filterData.OfferingCode : "*"
      params["OfferingName"] = filterData.OfferingName !== "" ? filterData.OfferingName : undefined
      params["ToCreationDate"] = filterData.ToCreationDate !== "" ? filterData.ToCreationDate : undefined
      params["FromCreationDate"] = filterData.FromCreationDate !== "" ? filterData.FromCreationDate : undefined
      params["ToTerminationDate"] = filterData.ToTerminationDate !== "" ? filterData.ToTerminationDate : undefined
      params["FromTerminationDate"] = filterData.FromTerminationDate !== "" ? filterData.FromTerminationDate : undefined
      params["StatusID"] = filterData.StatusID !== "" ? Number(filterData.StatusID) : undefined
      params["Coordinator"] = filterData.Coordinator !== "" ? filterData.Coordinator : undefined
      params["OrganizationID"] = filterData.OrganizationID !== "" ? Number(filterData.OrganizationID) : undefined
      params["OfferingTypeID"] = filterData.OfferingTypeID !== "" ? Number(filterData.OfferingTypeID) : undefined
      params["SectionTypeID"] = filterData.SectionTypeID !== "" ? Number(filterData.SectionTypeID) : undefined
      params["InstructorID"] = filterData.InstructorID !== "" ? Number(filterData.InstructorID) : undefined
      params["ShowProgramOffering"] = filterData.ShowProgramOffering !== "" ? filterData.ShowProgramOffering : undefined
      params["OfferingNearCapacity"] =
        filterData.OfferingNearCapacity !== "" ? filterData.OfferingNearCapacity : undefined
      params["IsQuickAdmit"] = filterData.IsQuickAdmit !== "" ? Boolean(filterData.IsQuickAdmit) : undefined
      params["IsSearchTagHierarchy"] =
        filterData.IsSearchTagHierarchy !== "" ? Boolean(filterData.IsSearchTagHierarchy) : undefined
      params["TagName"] = filterData.TagName !== "" ? filterData.TagName : undefined
      params["TagTypeID"] = filterData.TagTypeID !== "" ? filterData.TagTypeID : undefined
      params["ToFinalEnrollmentDate"] =
        filterData.ToFinalEnrollmentDate !== "" ? filterData.ToFinalEnrollmentDate : undefined
      params["FromFinalEnrollmentDate"] =
        filterData.FromFinalEnrollmentDate !== "" ? filterData.FromFinalEnrollmentDate : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (!Boolean(params[key]) && typeof params[key] !== "number") {
          delete params[key]
        }
      })

      const result = await searchOffering(params)

      if (result && result.success) {
        setOfferingItems(result.data)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_OFFERING_PAGE, loadOfferings)
    eventBus.publish(REFRESH_OFFERING_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_PAGE)
    }
  }, [filterData])

  return [loading, offeringItems]
}

const INITIAL_OFFERING_FILTER_DATA: IFilterValues = {
  OfferingCode: "",
  OfferingName: "",
  ToCreationDate: "",
  FromCreationDate: "",
  ToTerminationDate: "",
  FromTerminationDate: "",
  IsQuickAdmit: "",
  StatusID: "",
  Coordinator: "",
  OrganizationID: "",
  OfferingTypeID: "",
  SectionTypeID: "",
  InstructorID: "",
  ShowProgramOffering: "",
  TagName: "",
  TagTypeID: "",
  IsSearchTagHierarchy: "",
  OfferingNearCapacity: "",
  ToFinalEnrollmentDate: "",
  FromFinalEnrollmentDate: ""
}

export function useOfferingFilterState(state = INITIAL_OFFERING_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<IFilterValues>(state)
  return { filterData, updateFilterData }
}

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

const INITIAL_INSTRUCTOR_FILTER_DATA: IInstructorFilterValues = {
  LastName: "",
  FirstName: "",
  FacultySerialNum: "",
  InstructorTypeID: ""
}

export function useInstructorFilterState(state = INITIAL_INSTRUCTOR_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<IInstructorFilterValues>(state)
  return { filterData, updateFilterData }
}

export function useInstructors(filterData: IInstructorFilterValues): [boolean, any[]] {
  const [instructorItems, setInstructorItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadInstructors = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["LastName"] = filterData.LastName !== "" ? filterData.LastName : "*"
      params["FIrstName"] = filterData.FirstName !== "" ? filterData.FirstName : undefined
      params["FacultySerialNum"] = filterData.FacultySerialNum !== "" ? filterData.FacultySerialNum : undefined
      params["InstructorTypeID"] = filterData.InstructorTypeID !== "" ? Number(filterData.InstructorTypeID) : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (!Boolean(params[key]) && typeof params[key] !== "number") {
          delete params[key]
        }
      })

      const result = await searchFaculties([params])

      if (result && result.success) {
        setInstructorItems(result.data)
      }
      setLoading(false)
    }
    loadInstructors()
  }, [filterData])

  return [loading, instructorItems]
}
