import React from "react"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Col } from "antd"
import { ColProps } from "antd/lib/col"
import { CheckboxChangeEvent } from "antd/lib/checkbox"

export const TEXT = "TEXT"
export const DROPDOWN = "DROPDOWN"
export const DATE_PICKER = "DATE_PICKER"
export const DATE_PICKERS = "DATE_PICKERS"

type IFilterFieldType = typeof TEXT | typeof DROPDOWN | typeof DATE_PICKER | typeof DATE_PICKERS | string

export interface IFilterField {
  label: string
  inputType: IFilterFieldType
  defaultValue: string
  placeholder?: string

  fieldName: string
  displayKey?: string
  valueKey?: string
  ariaLabel: string

  fieldName2?: string
  ariaLabel2?: string
  displayKey2?: string
  valueKey2?: string

  options?: any[]
  refLookupService?: () => Promise<IApiResponse>

  customFilterComponent?: any
}

export interface IFilterGenericComponentProps extends IFilterField {
  value: string | number
  value2?: string | number
  show: boolean
  toggleCheckboxHandler: (event: CheckboxChangeEvent) => void
  filterValueChanged: (key: string, value: any) => void
}

const layout = {
  label: {
    md: 24,
    lg: 24,
    xl: 24,
    xxl: 24,
    sm: 24,
    xs: 24
  },
  input: {
    md: 20,
    lg: 20,
    xl: 20,
    xxl: 20,
    sm: 20,
    xs: 20
  }
}

export function LabelCol(props: ColProps) {
  return <Col {...layout.label} {...props} />
}

export function InputCol(props: ColProps) {
  return <Col {...layout.input} {...props} />
}
