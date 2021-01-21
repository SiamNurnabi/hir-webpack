import React from "react"
import { renderDateTime, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { Link } from "react-router-dom"
import { findPaymentGatewayActivities } from "~/ApiServices/Service/PaymentGatewayService"

export const getActivityPaymentGatewayTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "PaymentGatewayActivityID",
      render: (text: any, record: any) => renderDetailsLink(`/gateway-activity/${record.PaymentGatewayActivityID}`)
    },
    {
      title: "Activity Time",
      dataIndex: "RequestDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Purcahser",
      dataIndex: "PersonName",
      render: (text: any, record: any) => <Link to={`/person/${record.PersonID}`}>{text}</Link>
    },
    {
      title: "Transaction Number",
      dataIndex: "TransactionNo"
    },
    {
      title: "CC Type",
      dataIndex: "CreditCardType"
    },
    {
      title: "Amount",
      dataIndex: "RequestAmount"
    },
    {
      title: "Authorization",
      dataIndex: "AuthorizationCode"
    }
  ]

  return { columns, searchFunc: findPaymentGatewayActivities }
}
