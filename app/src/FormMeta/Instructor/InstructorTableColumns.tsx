import React from "react"
import { Link } from "react-router-dom"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getInstructorTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      render: (text: any, record: any) => (
        <Link to={`/person/faculty/${record.FacultyID}`}>{record.FacultySerialNum}</Link>
      ),
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    { title: "Last Name", dataIndex: "LastName" },
    { title: "First Name", dataIndex: "FirstName" },
    { title: "SSN", dataIndex: "SSN" },
    { title: "ERP ID", dataIndex: "ERPID" },
    { title: "Status", dataIndex: "Status" },
    { title: "Birthday", render: renderDate, dataIndex: "Birthday" },
    { title: "Gender", dataIndex: "GenderTypeName" },
    { title: "Ethnicity", dataIndex: "EthnicityTypeName" },
    { title: "Address", dataIndex: "Address" },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "Email", dataIndex: "EmailAddress" },
    { title: "Organization", dataIndex: "OrganizationName" },
    { title: "Instructor Type", dataIndex: "InstructorType" },
    { title: "Deceased", render: renderBoolean, dataIndex: "IsDeceased" },
    { title: "Address Line1", dataIndex: "AddressLine1" },
    { title: "Address Line2", dataIndex: "AddressLine2" },
    { title: "Address Line 3", dataIndex: "AddressLine3" },
    { title: "City", dataIndex: "Locality" },
    { title: "State", dataIndex: "State" },
    { title: "Country", dataIndex: "Country" },
    { title: "Postal Code", dataIndex: "PostalCode" },
    { title: "Maiden Name", dataIndex: "MaidenName" },
    { title: "Other Name", dataIndex: "OtherName" }
  ]

  const responsiveColumnIndices: number[] = [4, 5, 7, 8, 9, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const expandableColumnIndices: number[] = [4, 5, 7, 8, 9, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchFaculties }
}
