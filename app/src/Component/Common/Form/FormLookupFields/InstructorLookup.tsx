import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { InstructorSearchMeta } from "~/FormMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/FormMeta/Instructor/InstructorTableColumns"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

export function InstructorLookupButton(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Instructor"
      valueField="FacultyID"
      displayField="FirstName"
      meta={InstructorSearchMeta as IField[]}
      {...props}
      formInstance={props.formInstance}
      {...getInstructorTableColumns(true)}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          searchFaculties({ FacultyID: props.defaultValue }).then((x) => {
            return x.data[0]
          })
      })}
    />
  )
}