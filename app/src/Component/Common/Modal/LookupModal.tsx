import React, { useState } from "react"
import { Card, Button } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import SearchFilters from "~/Component/Common/SearchFilters"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import zIndex from "~/utils/zIndex"

interface ILookupModal {
  title: string
  closeModal: (items?: any[]) => void
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  responsiveColumnIndices?: number[]
  expandableColumnIndices?: number[]
  isArray?: boolean
  columns: TableColumnType
  meta: IFilterField[]
  defaultFilter?: { [key: string]: any }
  zIndex?: boolean
}

export function LookupModal(props: ILookupModal) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const rowSelection: any = {
    type: props.isArray ? "checkbox" : "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedItems(selectedRows)
    }
  }
  return (
    <Modal width="1000px" zIndex={props.zIndex ? zIndex.defaultModal + 1 : undefined}>
      <Card
        title={props.title}
        actions={[
          <Button type="ghost" onClick={() => props.closeModal()}>
            Cancel
          </Button>,
          <Button type="primary" disabled={selectedItems.length === 0} onClick={() => props.closeModal(selectedItems)}>
            Select
          </Button>
        ]}
      >
        <div className="modal-card">
          <SearchFilters
            meta={props.meta}
            isModalView={true}
            isCheckeble={false}
            initialFilter={searchParams}
            title={""}
            visible
            hideFilters={() => {
              setSelectedItems([])
            }}
            onApplyChanges={(newSearchParams, newSearchParamsCount) => {
              console.log(props.defaultFilter, newSearchParams)
              setSearchParams({ ...props.defaultFilter, ...newSearchParams })
            }}
          />
          <ResponsiveTable
            columns={props.columns}
            searchFunc={props.searchFunc}
            searchParams={searchParams}
            isModal={true}
            rowSelection={rowSelection}
            responsiveColumnIndices={props.responsiveColumnIndices}
            expandableColumnIndices={props.expandableColumnIndices}
          />
        </div>
      </Card>
    </Modal>
  )
}
