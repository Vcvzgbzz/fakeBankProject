interface CallApiProps<RequestType, ResponseType> {
  steps?: {
    onSuccess?: (data: ResponseType) => void
    onFail?: (error: any) => void
    onRequest?: () => void
  }

  url: string
  requestPayload?: RequestType
  method?: 'get' | 'post'
  raceLocker?: boolean
}

export function callApi<RequestType, ResponseType>({
  steps,
  url,
  requestPayload,
  method,
  raceLocker,
}: CallApiProps<RequestType, ResponseType>) {
  if (raceLocker) {
    return
  }
  if (steps.onRequest) {
    steps.onRequest()
  }
  fetch(url, {
    method: method ? method : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  })
    .then((res) => res.json())
    .then((data: ResponseType) => {
      if (steps.onSuccess) {
        steps.onSuccess(data)
      }
    })
    .catch((error) => {
      if (steps.onFail) {
        steps.onFail(error)
      }
    })
}

interface routeToPageProps {
  route: string
  router: any
}

export function routeToPage({ route, router }: routeToPageProps) {
  router.push(route)
}
