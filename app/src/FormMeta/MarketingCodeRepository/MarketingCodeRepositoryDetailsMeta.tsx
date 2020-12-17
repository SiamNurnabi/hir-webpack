import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"

export const getMarketingCodeRepositoryDetailsMeta = (MarketingCode: { [key: string]: any }): IDetailsMeta => {
  const tabMetas: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Description", value: MarketingCode.Description, render: undefined },
      { label: "Category", value: MarketingCode.CategoryName, render: undefined },
      { label: "Start Date", value: MarketingCode.StartDate, render: renderDate },
      { label: "End Date", value: MarketingCode.EndDate, render: renderDate }
    ]
  }

  tabMetas.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  tabMetas.push({
    tabTitle: "Responses",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getMarketingCodeResponseTableColumns(),
        searchParams: { MarketingCodeID: MarketingCode.MarketingCodeID }
      }
    }
  })

  return {
    pageTitle: `Marketing Code - ${MarketingCode.Name}`,
    tabs: tabMetas
  }
}
