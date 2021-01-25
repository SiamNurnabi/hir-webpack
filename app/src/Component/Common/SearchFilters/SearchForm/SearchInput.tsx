import React from "react"
import { SearchFieldWrapper } from "~/Component/Common/SearchFilters/SearchForm/common"
import { Input } from "antd"
import { IGeneratedField } from "./common"

export function SearchInputType(props: IGeneratedField) {
  return (
    <SearchFieldWrapper {...props}>
      <Input
        aria-label={props.ariaLabel}
        type={props.inputType ? props.inputType.toLowerCase() : "text"}
        disabled={props.disabled}
      />
    </SearchFieldWrapper>
  )
}