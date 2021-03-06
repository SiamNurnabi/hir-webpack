import { Button } from "antd"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { searchSectionInstructor } from "~/ApiServices/Service/InstructorService"
import { getFacultySchedule } from "~/ApiServices/Service/PersonService"
import CommentCreateModalOpenButton from "~/Component/Comment/CommentAddLink"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderDateTime, sortByTime } from "~/Component/Common/ResponsiveTable"
import CreateNewFinancial from "~/Component/Financial/FinancialFormModal"
import OfferingAddButton from "~/Component/Offering/OfferingAddButton"
import { getFacultyCommentTableColumns } from "~/FormMeta/InstructorComment/CommentTableColumns"
import { getQualifiedInstructorTableColumns } from "~/FormMeta/Offering/QualifiedInstructorTableColumns"
import { getOfferingFinancialTableColumns } from "~/FormMeta/OfferingFinancial/OfferingFinancialTableColumns"
import { COMMENT_TYPES, FINANCIAL_FACULTY_TYPE_ID, FINANCIAL_TYPE_FACULTY } from "~/utils/Constants"
import { REFRESH_FACULTY_OFFERINGS_TAB, REFRESH_INSTRUCTOR_COMMENT_PAGE } from "~/utils/EventBus"

export const getInstructorMeta = (person: any, instructor: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const instructorInfo: CardContainer = {
    title: "Instructor Info",
    contents: [
      { label: "Serial Num", value: instructor?.FacultySerialNum },
      { label: "Organization", value: instructor?.OrganizationName },
      { label: "Status", value: instructor?.InstitutionStatusCodeName },
      { label: "Type", value: instructor?.InstructorTypeName },
      { label: "Active", value: instructor?.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [instructorInfo]
  }

  const FinancialFormModalOpenButton = (props: { FacultyID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Create Financial
          </Button>
        )}
        {showModal && (
          <CreateNewFinancial
            applyToID={props.FacultyID}
            financialType={FINANCIAL_TYPE_FACULTY}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })
  tabMetas.push({
    tabTitle: "Faculty Schedule",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "Start Date",
            dataIndex: "StartDate",
            render: renderDateTime,
            sorter: (a: any, b: any) => sortByTime(a.StartDate, b.StartDate)
          },
          {
            title: "End Date",
            dataIndex: "EndDate",
            render: renderDateTime,
            sorter: (a: any, b: any) => sortByTime(a.EndDate, b.EndDate)
          },
          { title: "Schedule Item", dataIndex: "Name" }
        ],
        searchFunc: getFacultySchedule,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_FACULTY_SCHEDULE_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Instructor Fees",
    tabType: "table",
    tabMeta: {
      blocks: [<FinancialFormModalOpenButton FacultyID={instructor.FacultyID} />],
      tableProps: {
        ...getOfferingFinancialTableColumns(instructor.FacultyID, FINANCIAL_FACULTY_TYPE_ID),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_FACULTY_OFFERINGS_TAB
      }
    }
  })

  tabMetas.push({
    tabTitle: "Qualified Offerings",
    tabType: "table",
    tabMeta: {
      blocks: [<OfferingAddButton FacultyId={instructor.FacultyID} />],
      tableProps: {
        pagination: false,
        ...getQualifiedInstructorTableColumns(),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_FACULTY_OFFERINGS_TAB
      }
    }
  })

  tabMetas.push({
    tabTitle: "Instructor Contracts",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "Name",
            dataIndex: "FirstName",
            render: (text: any, record: any) => (
              <Link to={`/person/${record.PersonID}`}>{text + " " + record.LastName}</Link>
            )
          },
          {
            title: "Section Number",
            dataIndex: "SectionNumber",
            render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
          },
          { title: "Status", dataIndex: "SectionStatusCodeName" },
          { title: "StartDate", dataIndex: "StartDate", render: renderDate },
          { title: "EndDate", dataIndex: "EndDate", render: renderDate },
          { title: "Current Enrollment", dataIndex: "CurrentEnrollment" },
          { title: "Max Enrollment", dataIndex: "MaxEnrollment" },
          { title: "Pay Rate", dataIndex: "Amount" }
        ],
        searchFunc: searchSectionInstructor,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: "REFRESH_FACULTY_CONTACT_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Comments",
    tabType: "table",
    tabMeta: {
      blocks: [<CommentCreateModalOpenButton FacultyID={instructor.FacultyID} CommentType={COMMENT_TYPES.GENERAL} />],
      tableProps: {
        pagination: false,
        ...getFacultyCommentTableColumns(),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_INSTRUCTOR_COMMENT_PAGE
      }
    }
  })
  return tabMetas
}
