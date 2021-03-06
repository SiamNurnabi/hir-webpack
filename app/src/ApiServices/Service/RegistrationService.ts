import RegistrationService, { config } from "@packages/api/lib/proxy/Service/RegistrationService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findRegistrations(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findRegistrations](Params)
}

export function findRegistrationsWebAdmin(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findRegistrationsWebAdmin](Params)
}

export function findRegistrationDetail(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findRegistrationDetail](Params)
}

export function getCreditMemoData(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.getCreditMemoData](Params)
}

export function findGradeScoreDefinition(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findGradeScoreDefinition](Params)
}

export function dropWithdrawRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.dropWithdrawRegistration](Params)
}

export function dropOrWithdrawRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.dropOrWithdrawRegistration](Params)
}

export function deleteRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.deleteRegistration](Params)
}

export function editRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.editRegistration](Params)
}

export function getGradeDefinitionDetails(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.getGradeDefinitionDetails](Params)
}

export function saveFinalGrade(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.saveFinalGrade](Params)
}

export function searchNoShowProcessings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.searchNoShowProcessings](Params)
}

export function bulkDropRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.bulkDropRegistration](Params)
}

export function bulkDeleteRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.bulkDeleteRegistration](Params)
}

export function validateRegistration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.validateRegistration](Params)
}

export function checkCertificate(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.checkCertificate](Params)
}

export function issueCertificate(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.issueCertificate](Params)
}

export function searchCertificate(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.searchCertificate](Params)
}

export function previewCertificate(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RegistrationService[config.Actions.previewCertificate](Params)
}
