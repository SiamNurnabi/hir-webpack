import * as React from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ILookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function PersonLookup(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Person"
      displayField="SortName"
      meta={PersonSearchMeta as IField[]}
      {...props}
      {...getPersonTableColumns(true)}
      valueField={props.valueField || "PersonID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Person", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
