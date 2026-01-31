import { authClient } from '~/lib/auth-client'
export default defineNuxtRouteMiddleware(async (to, _from) => {
	const { data: session } = await authClient.useSession(useFetch)
	if (!session.value) {
		if (to.path.startsWith('/dashboard')) {
			return navigateTo('/login')
		}
	} else {
    if (!to.path.startsWith('/dashboard')) {
      return navigateTo('/dashboard')
    }
  }
})
