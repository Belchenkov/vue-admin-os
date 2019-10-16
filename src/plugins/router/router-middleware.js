export default function (router) {

  function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index]
    if (!subsequentMiddleware) return context.next

    return (...parameters) => {
      context.next(...parameters)
      const nextMiddleware = nextFactory(context, middleware, index + 1)
      subsequentMiddleware({...context, next: nextMiddleware})
    }
  }

  router.beforeEach((to, from, next) => {
    let routeMiddleware = to.meta.middleware
    if (!routeMiddleware && to.matched.length > 0 && to.matched[0].meta) {
      routeMiddleware = to.matched[0].meta.middleware
    }

    if (routeMiddleware) {
      const middleware = Array.isArray(routeMiddleware)
        ? routeMiddleware
        : [routeMiddleware]
      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1)
      return middleware[0]({...context, next: nextMiddleware})
    }

    return next()
  })

}