import HRUserService, { config } from "@packages/api/lib/proxy/Service/HRUserService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAllUsers(): Promise<IApiResponse> {
  return HRUserService[config.Actions.getAllUsers]({})
}
export function getLoggedInUser(): Promise<IApiResponse> {
  return HRUserService[config.Actions.getLoggedInUser]({})
}
export function getUsersByID(Params: { [key: string]: any }): Promise<IApiResponse> {
  return HRUserService[config.Actions.getUserByUserID](Params)
}
export function getUsersByRole(Params: { [key: string]: any }): Promise<IApiResponse> {
  return HRUserService[config.Actions.getUsersByRole](Params)
}
export function getUserByUserLogin(Params: { [key: string]: any }): Promise<IApiResponse> {
  return HRUserService[config.Actions.getUserByUserLogin](Params)
}
