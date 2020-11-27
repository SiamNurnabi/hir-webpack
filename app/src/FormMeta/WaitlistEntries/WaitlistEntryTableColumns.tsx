import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"
import { deleteWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getWaitlistEntriesTableColumns = (
  isModal = false,
  setShowCreateModal: (record: any) => void
): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/section/${record.SectionID}/waitlist/${record.WaitListEntryID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "SectionNumber",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    { title: "SeatGroupName", dataIndex: "SeatGroupName" },
    {
      title: "AccountName",
      dataIndex: "AccountName",
      width: 100,
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/account/${record.AccountID}`}>{record.AccountName}</Link>
    },
    {
      title: "PurchaserName",
      dataIndex: "PurchaserName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/person/${record.PurchaserID}`}>{record.PurchaserName}</Link>
    },
    { title: "StudentName", dataIndex: "StudentName" },
    { title: "Email", dataIndex: "StudentEmailAddress" },
    { title: "Request State", dataIndex: "RequestState" },
    { title: "Priority", dataIndex: "Priority" },
    { title: "Email", dataIndex: "StudentEmailAddress" },
    { title: "CreationTime", dataIndex: "CreationTime", render: renderDate },
    { title: "ExpirationTime", dataIndex: "RequestExpirationTime", render: renderDate },
    { title: "Start Date", dataIndex: "startDate", render: renderDate },
    { title: "End Date", dataIndex: "endDate", render: renderDate },
    { title: "Current Status", dataIndex: "currentStatus", render: renderDate },
    { title: "Source", dataIndex: "Source" },
    {
      ...(!isModal && {
        title: "Action",
        render: (text: any, record: any) => {
          return (
            <>
              <Button
                style={{ marginRight: "10px" }}
                type="primary"
                onClick={() => {
                  setShowCreateModal(record)
                }}
                disabled={!!record.RequestState}
              >
                Edit
              </Button>
              <Button
                danger
                onClick={() => {
                  deleteWaitListEntry({ WaitListEntryID: record.WaitListEntryID }).then((x) => {
                    if (x.success) eventBus.publish(REFRESH_PAGE)
                  })
                }}
                disabled={!!record.RequestState}
              >
                Remove
              </Button>
            </>
          )
        }
      })
    }
  ]
  const responsiveColumnIndices = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const expandableColumnIndices = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findWaitListEntries }
}
