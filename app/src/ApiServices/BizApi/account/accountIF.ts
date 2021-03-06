import AccountIf, { config } from "@packages/api/lib/proxy/BizApi/account/accountIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function findAccountForLookUp(Params: { [key: string]: any }): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccountForLookUp]([Params])
}
export function findAccountAffiliation(Params: Array<{ [key: string]: any }>): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccountAffiliation](Params)
}
export function findAccount(Params: Array<any>): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccount](Params)
}
export function getAffiliationRoleTypes(Params: Array<any>): Promise<IApiResponse> {
  return AccountIf[config.Actions.getAffiliationRoleTypes](Params)
}
export function getTaggedQuestionsByAffiliationRoleType(Params: Array<any>): Promise<IApiResponse> {
  return AccountIf[config.Actions.getTaggedQuestionsByAffiliationRoleType](Params)
}
