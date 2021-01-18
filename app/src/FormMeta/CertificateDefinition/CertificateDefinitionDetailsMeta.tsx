import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"

export const getCertificateDefinitionDetailsMeta = (certificate: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    title: certificate.Name,
    contents: [
      { label: "Certificate Type", value: certificate.CertificateType, render: undefined },
      { label: "Department", value: certificate.OrganizationName, render: undefined },
      { label: "Published On Web", value: certificate.PublishOnWeb, render: renderBoolean },
      { label: "Active", value: certificate.IsActive, render: renderBoolean },
      { label: "Category", value: certificate.CertificateCategoryTypeName, render: undefined },
      { label: "Prefix Format", value: certificate.PrefixFormat, render: undefined },
      { label: "Template Name", value: certificate.TemplateFileName, render: undefined },
      { label: "Valid Months", value: certificate.ValidityMonths, render: undefined },
      { label: "Description ", value: certificate.Description, render: undefined }

      //TODO: add table for static params
    ]
  }
  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })
  return { tabs: meta }
}