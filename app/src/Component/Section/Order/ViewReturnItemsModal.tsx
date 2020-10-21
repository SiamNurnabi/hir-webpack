import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Form, Input, Typography } from "antd"
import Table from "~/Component/Common/ResponsiveTable"
import { applyReturnItem, getCreditMemoDataByOrderItemID, getReturnItems } from "~/ApiServices/Service/OrderService"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"
import TextArea from "antd/lib/input/TextArea"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IViewReturnItemsModal {
  OrderItemID: number
  setShowViewReturnItemsModal: (flag: boolean) => void
}

interface ICreditMemoData {
  OrderLineID: number
  Amount: number
}

const fieldNames = {
  OrderItemID: "OrderItemID",
  ReturnQuantity: "ReturnQuantity",
  ReturnNote: "ReturnNote",
  CreditMemoData: "CreditMemoData"
}
export default function ViewReturnItemsModal(props: IViewReturnItemsModal) {
  const [CreditMemoData, setCreditMemoData] = useState<ICreditMemoData[]>([])
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <Card
          title="View Return Items"
          actions={[
            <Button
              onClick={() => {
                props.setShowViewReturnItemsModal(false)
              }}
            >
              Close
            </Button>,
            <Button
              onClick={() => {
                setErrorMessages([])
                setApiCallInProgress(true)
                applyReturnItem({
                  ...formInstance.getFieldsValue(),
                  [fieldNames.OrderItemID]: props.OrderItemID,
                  [fieldNames.CreditMemoData]: CreditMemoData
                }).then((x) => {
                  setApiCallInProgress(false)
                  if (x.success) {
                    eventBus.publish(REFRESH_PAGE)
                    props.setShowViewReturnItemsModal(false)
                  } else setErrorMessages(x.error)
                })
              }}
            >
              Save
            </Button>
          ]}
        >
          <div style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
            {" "}
            <Form form={formInstance} initialValues={{ [fieldNames.ReturnQuantity]: 1 }}>
              <FormError errorMessages={errorMessages} />
              <Form.Item name={fieldNames.ReturnQuantity} label="Return Quantity" labelCol={{ span: 6 }}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name={fieldNames.ReturnNote} label="Return Note" labelCol={{ span: 6 }}>
                <TextArea />
              </Form.Item>
            </Form>
            <Typography.Title level={4}>Credit Amount (Click "Credit Amount" Column to Edit)</Typography.Title>
            <Table
              columns={[
                { title: "Item", dataIndex: "Description" },
                { title: "Cost", dataIndex: "ChargeAmount" },
                {
                  title: "Credit Amount",
                  dataIndex: "Amount",
                  render: (text: any, record: any) => {
                    return (
                      <Input
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                          e.persist()
                          setCreditMemoData(
                            CreditMemoData.map((x) => {
                              if (x.OrderLineID === record.OrderLineID) {
                                x.Amount = Number(e.target.value)
                              }
                              return x
                            })
                          )
                        }}
                      />
                    )
                  }
                }
              ]}
              searchFunc={getCreditMemoDataByOrderItemID}
              searchParams={{ OrderItemID: props.OrderItemID }}
            />
            <Typography.Title level={4}>Returned Items</Typography.Title>
            <Table
              columns={[
                { title: "Returned Quantity", dataIndex: "ReturnedQuantity" },
                {
                  title: "Date Returned",
                  dataIndex: "DateReturned",
                  render: (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
                },
                { title: "Return Note", dataIndex: "ReturnedNote" }
              ]}
              searchFunc={getReturnItems}
              searchParams={{ OrderItemID: props.OrderItemID }}
            />
          </div>
        </Card>
      }
    />
  )
}
