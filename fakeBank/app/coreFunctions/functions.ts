interface routeToPageProps {
  route: string
  router: any
}

export function routeToPage({ route, router }: routeToPageProps) {
  router.push(route)
}
