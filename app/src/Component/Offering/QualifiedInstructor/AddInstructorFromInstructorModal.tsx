import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddInstructorFromOfferingModal } from "~/store/ModalState"
import { FilterColumn, IFilterValues } from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn"
import { Row, Col, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import onlyUnique from "~/utils/util"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import moment from "moment"
import { updateInstructors } from "~/ApiServices/Service/OfferingService"
import ResponsiveTable from "~/Component/ResponsiveTable"

const { useState } = React

interface IInstructorProps {
  offeringID: number
  rowData: Array<any>
  closeAddInstructorFromInstructorModal: () => void
}

const INITIAL_FILTER_DATA: IFilterValues = {
  LastName: "",
  FirstName: "",
  FacultySerialNum: "",
  InstructorTypeID: ""
}

enum ModalPages {
  FilterPage,
  InstructorsList
}

function AddInstructorFromInstructorModal({
  offeringID,
  rowData,
  closeAddInstructorFromInstructorModal
}: IInstructorProps) {
  const [filterData, updateFilterData] = useState<IFilterValues>(INITIAL_FILTER_DATA)
  const [instructorItems, setInstructorItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedInstructors, setSelectedInstructors] = useState<any[]>([])

  const loadInstructors = async function () {
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

    setLoading(true)
    const result = await searchFaculties([params])
    setLoading(false)

    if (result && result.success) {
      setInstructorItems(result.data)
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    {
      title: "Last Name",
      dataIndex: "LastName"
    },
    {
      title: "First Name",
      dataIndex: "FirstName"
    },
    {
      title: "Status",
      dataIndex: "Status"
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Gender",
      dataIndex: "GenderTypeName"
    },
    {
      title: "Ethnicity",
      dataIndex: "EthnicityTypeName"
    },
    {
      title: "Address",
      dataIndex: "Address"
    },
    {
      title: "Telephone",
      dataIndex: "TelephoneNumber"
    },
    {
      title: "Email",
      dataIndex: "EmailAddress"
    }
  ]

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="8">Organization:</Col>
          <Col span="16">{data.OrganizationName}</Col>
        </Row>
        {mobileView && (
          <Row>
            <Col span="8">Instructor Type:</Col>
            <Col span="16">{data.InstructorType}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="8">Deceased:</Col>
            <Col span="16">{data.IsDeceased}</Col>
          </Row>
        )}
      </div>
    )
  }

  const rowSelection: { [key: string]: any } = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedInstructors(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  }

  function handleSelect() {
    const selectedInstructorIds = selectedInstructors.map((instructor) => instructor.FacultyID)
    rowData.push(...selectedInstructorIds)

    const uniqueRowData = rowData.filter(onlyUnique)
    updateInstructors(offeringID, uniqueRowData)
      .then(() => eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE))
      .finally(closeAddInstructorFromInstructorModal)
  }

  const actions = []
  actions.push(
    <Button
      onClick={() => {
        setModalPage(ModalPages.FilterPage)
      }}
    >
      Go Back
    </Button>
  )

  actions.push(<Button onClick={closeAddInstructorFromInstructorModal}>Cancel</Button>)
  actions.push(
    <Button disabled={selectedInstructors.length === 0} onClick={handleSelect}>
      Submit
    </Button>
  )

  return (
    <Modal showModal={true} width="1000px">
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row style={{ justifyContent: "center" }}>
          <FilterColumn
            data={filterData}
            visible
            toggleVisiibility={() => {
              closeAddInstructorFromInstructorModal()
              setSelectedInstructors([])
            }}
            onApplyChanges={(newFilterValues) => {
              loadInstructors()
              updateFilterData({ ...filterData, ...newFilterValues })
              setModalPage(ModalPages.InstructorsList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.InstructorsList && (
          <Card title={"Add Instructors"} actions={actions}>
            <Row style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
              <ResponsiveTable
                columns={columns}
                dataSource={instructorItems}
                loading={loading}
                bordered
                rowSelection={rowSelection}
                expandableRowRender={expandableRowRender}
                responsiveColumnIndices={[3, 4, 5, 6, 7, 8, 9]}
                rowKey="FacultyID"
                pagination={{ position: ["bottomLeft"] }}
                scroll={{ x: "fit-content" }}
              />
            </Row>
          </Card>
        )) || <></>}
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddInstructorFromInstructorModal: () => dispatch(showAddInstructorFromOfferingModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddInstructorFromInstructorModal)
