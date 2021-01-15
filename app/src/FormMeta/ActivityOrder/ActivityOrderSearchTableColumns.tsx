import React from "react"
import { Link } from "react-router-dom"
import { getOrderActivity } from "~/ApiServices/Service/ActivityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getActivityOrderSearchTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (
        <Link to={`/order/${record.OrderID}`}>
          <ReadOutlined />
        </Link>
      )
    },
    {
      title: "Activity Time",
      dataIndex: "ActivityModifiedDate",
      render: renderDateTime
    },
    {
      title: "Activity Type",
      dataIndex: "ActivityOperation"
    },
    {
      title: "Activity By",
      dataIndex: "ActivityModifiedByName"
    },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => <Link to={`/order/${record.OrderID}`}>{text}</Link>
    },
    {
      title: "Purchaser",
      dataIndex: "PersonName",
      render: (text: any, record: any) => {
        return <Link to={`/person/${record.PersonID}`}>{text}</Link>
      }
    }
    // {
    //   title: "User Name",
    //   dataIndex: "ActivityModifiedByName",
    //   width: 100
    // },
    // {
    //   title: "Payer Name",
    //   dataIndex: "PersonName",
    //   render: (text: any, record: any) => {
    //     return <Link to={`/person/${record.PersonID}`}>{text}</Link>
    //   },
    //   width: 100
    // },
    // // {
    // //   title: "Order Status",
    // //   dataIndex: "OPCStatusCodeID",
    // //   width: 100
    // // },
    // {
    //   title: "Order Date",
    //   dataIndex: "OrderDate",
    //   render: renderDateTime,
    //   width: 100
    // },
    // {
    //   title: "Total Items",
    //   dataIndex: "TotalItems",
    //   width: 100
    // },
    // {
    //   title: "Discount Amount",
    //   dataIndex: "DiscountAmount",
    //   width: 100
    // },
    // {
    //   title: "Total Amount",
    //   dataIndex: "TotalAmount",
    //   width: 100
    // },
    // {
    //   title: "Creation Date",
    //   dataIndex: "CreateDate",
    //   render: renderDateTime,
    //   width: 100
    // },
    // {
    //   title: "Completed Date",
    //   dataIndex: "CompletedDate",
    //   render: renderDateTime,
    //   width: 100
    // }
  ]
  return { columns, searchFunc: getOrderActivity, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
// findOrderActivity
