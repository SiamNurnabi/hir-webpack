import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Form, Select } from "antd"
import React, { useEffect, useState } from "react"

interface IDropDown {
  fieldName: string
  label: string
  displayField: string
  valueField: string
  searchFunc: (Params: any) => Promise<IApiResponse>
  searchParams?: { [key: string]: any } | any[]
  labelColumn?: { [key: string]: any }
  defaultValue?: any
  disabled?: boolean
  onChange?: (Params: any) => void
}
export default function DropDown(props: IDropDown) {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  useEffect(() => {
    if (props.searchFunc) {
      setLoading(true)
      props.searchFunc(props.searchParams).then((x) => {
        setLoading(false)
        if (x.success && Array.isArray(x.data)) {
          setDataSource(
            x.data.map((y, key) => {
              return {
                ...y,
                key
              }
            })
          )
        }
      })
    }
  }, [props])
  return (
    <Form.Item label={props.label} name={props.fieldName} labelCol={props.labelColumn}>
      <Select defaultValue={props.defaultValue} disabled={props.disabled} loading={loading} onChange={props.onChange}>
        {dataSource.map((x) => (
          <Select.Option key={x.key + x[props.valueField] + x[props.displayField]} value={x[props.valueField]}>
            {x[props.displayField]}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
