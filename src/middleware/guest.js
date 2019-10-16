/* eslint-disable */
export default async function guest({next, router}) {
  await router.app.$apiAuth.checkAuth()

  if (router.app.$store.state.isAuth) {
    return router.push({name: 'dashboard'}).catch(err => {
    })
  }

  return next();
}