import { getCatalogContent } from "~/ApiServices/Service/CatalogService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCatalogContentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Type", dataIndex: "contentType" },
    { title: "Code/ Number", dataIndex: "contentCode" },
    { title: "Status", dataIndex: "contentStatus" },
    { title: "Start Date", dataIndex: "startDate", render: renderDate },
    { title: "End Date", dataIndex: "endDate", render: renderDate }
  ]
  return { columns, searchFunc: getCatalogContent, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
