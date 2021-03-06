import AnonymizationRequestService, { config } from "@packages/api/lib/proxy/Service/AnonymizationRequestService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAnonymizeRequests(Params: { [key: string]: any }): Promise<IApiResponse> {
  return AnonymizationRequestService[config.Actions.getAnonymizeRequests](Params)
}
