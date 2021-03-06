import RequestModelService, { config } from "@packages/api/lib/proxy/Service/RequestModelService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function retry(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestModelService[config.Actions.retry](Params)
}

export function cancel(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestModelService[config.Actions.cancel](Params)
}
