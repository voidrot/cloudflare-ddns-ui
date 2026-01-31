<script setup lang="ts">
import { authClient } from '~/lib/auth-client'

definePageMeta({
  layout: false,
})

const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const errors = ref<Record<string, string>>({})
const isLoading = ref(false)
const serverError = ref('')
const socialLoading = ref<'github' | 'gitlab' | null>(null)

const validateForm = () => {
  errors.value = {}

  if (!formData.value.username.trim()) {
    errors.value.username = 'Username or email is required'
  }

  if (!formData.value.password) {
    errors.value.password = 'Password is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  serverError.value = ''

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const { data, error } = await authClient.signIn.username({
      username: formData.value.username,
      password: formData.value.password,
    })

    if (error) {
      serverError.value = error.message || 'Login failed. Please check your credentials.'
      return
    }

    if (data) {
      await router.push('/dashboard')
    }
  } catch {
    serverError.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleSocialSignIn = async (provider: 'github' | 'gitlab') => {
  serverError.value = ''
  socialLoading.value = provider

  try {
    await authClient.signIn.social({
      provider,
      callbackURL: '/dashboard',
    })
  } catch {
    serverError.value = `${provider === 'github' ? 'GitHub' : 'GitLab'} sign-in failed. Please try again.`
    socialLoading.value = null
  }
}
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-base-200">
    <!-- Main centered content -->
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-3xl font-bold justify-center mb-2">
          Sign In
        </h1>
        <p class="text-center text-base-content/60 mb-6">
          Welcome back
        </p>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div v-if="serverError" role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ serverError }}</span>
          </div>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.username }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              v-model="formData.username"
              type="text"
              class="grow"
              placeholder="Username or Email"
              :disabled="isLoading || socialLoading !== null"
            >
          </label>
          <p v-if="errors.username" class="text-error text-sm mt-1">{{ errors.username }}</p>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.password }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
            </svg>
            <input
              v-model="formData.password"
              type="password"
              class="grow"
              placeholder="Password"
              :disabled="isLoading || socialLoading !== null"
            >
          </label>
          <p v-if="errors.password" class="text-error text-sm mt-1">{{ errors.password }}</p>

          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="isLoading || socialLoading !== null"
          >
            <span v-if="isLoading" class="loading loading-spinner loading-sm" />
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="divider">OR</div>

        <div class="space-y-2">
          <button
            type="button"
            :disabled="isLoading || socialLoading !== null"
            class="btn btn-outline w-full"
            @click="handleSocialSignIn('github')"
          >
            <span v-if="socialLoading === 'github'" class="loading loading-spinner loading-sm" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>

          <button
            type="button"
            :disabled="isLoading || socialLoading !== null"
            class="btn btn-outline w-full"
            @click="handleSocialSignIn('gitlab')"
          >
            <span v-if="socialLoading === 'gitlab'" class="loading loading-spinner loading-sm" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M23.6 5.8l-1.5-4.4a.9.9 0 00-.9-.4H3.8a.9.9 0 00-.9.4L1.4 5.8a.9.9 0 00.4 1.2l10 7.3v8a1 1 0 001.8 0v-8l10-7.3a.9.9 0 00.4-1.2z" />
            </svg>
            Continue with GitLab
          </button>
        </div>

        <div class="divider" />

        <div class="text-center">
          <p class="text-sm text-base-content/60">
            Don't have an account?
            <NuxtLink to="/register" class="link link-primary">
              Sign up
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
    </div>
    <!-- Footer -->
    <footer class="footer footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p><a href="https://github.com/voidrot/cloudflare-ddns-ui">Cloudflare DDNS UI</a>. Built for the Home Lab.</p>
      </aside>
    </footer>
  </div>
</template>
