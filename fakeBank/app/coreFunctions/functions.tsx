import { useRouter } from 'next/router'

interface CallApiProps<RequestType, ResponseType> {
  onSuccess?: (data: ResponseType) => void
  onFail?: (error: any) => void
  onRequest?: () => void
  url: string
  requestPayload?: RequestType
  method?: 'get' | 'post'
}

export function callApi<RequestType, ResponseType>({
  onSuccess,
  onFail,
  onRequest,
  url,
  requestPayload,
  method,
}: CallApiProps<RequestType, ResponseType>) {
  if (onRequest) {
    onRequest()
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
      if (onSuccess) {
        onSuccess(data)
      }
    })
    .catch((error) => {
      if (onFail) {
        onFail(error)
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
