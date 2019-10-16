/* eslint-disable */
export default async function auth({next, router}) {
  await router.app.$apiAuth.checkAuth()

  if (!router.app.$store.state.isAuth) {
    return router.push({name: 'login'}).catch(err => {
    })
  }

  return next();
}