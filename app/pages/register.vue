<script setup lang="ts">
import { authClient } from '~/lib/auth-client'

definePageMeta({
  layout: false,
})

const router = useRouter()

const formData = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref<Record<string, string>>({})
const isLoading = ref(false)
const serverError = ref('')

const validateForm = () => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!formData.value.username.trim()) {
    errors.value.username = 'Username is required'
  } else if (formData.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters'
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!formData.value.password) {
    errors.value.password = 'Password is required'
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  serverError.value = ''

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const { data, error } = await authClient.signUp.email({
      name: formData.value.name,
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      serverError.value = error.message || 'Registration failed. Please try again.'
      return
    }

    if (data) {
      await router.push('/')
    }
  } catch {
    serverError.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
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
          Create Account
        </h1>
        <p class="text-center text-base-content/60 mb-6">
          Join us today
        </p>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div v-if="serverError" role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ serverError }}</span>
          </div>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.name }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              v-model="formData.name"
              type="text"
              class="grow"
              placeholder="Full Name"
              :disabled="isLoading"
            >
          </label>
          <p v-if="errors.name" class="text-error text-sm mt-1">{{ errors.name }}</p>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.username }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              v-model="formData.username"
              type="text"
              class="grow"
              placeholder="Username"
              :disabled="isLoading"
            >
          </label>
          <p v-if="errors.username" class="text-error text-sm mt-1">{{ errors.username }}</p>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.email }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              v-model="formData.email"
              type="email"
              class="grow"
              placeholder="Email"
              :disabled="isLoading"
            >
          </label>
          <p v-if="errors.email" class="text-error text-sm mt-1">{{ errors.email }}</p>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.password }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
            </svg>
            <input
              v-model="formData.password"
              type="password"
              class="grow"
              placeholder="Password"
              :disabled="isLoading"
            >
          </label>
          <p v-if="errors.password" class="text-error text-sm mt-1">{{ errors.password }}</p>

          <label class="input input-bordered w-full flex items-center gap-2" :class="{ 'input-error': errors.confirmPassword }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
            </svg>
            <input
              v-model="formData.confirmPassword"
              type="password"
              class="grow"
              placeholder="Confirm Password"
              :disabled="isLoading"
            >
          </label>
          <p v-if="errors.confirmPassword" class="text-error text-sm mt-1">{{ errors.confirmPassword }}</p>

          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading loading-spinner loading-sm" />
            <span v-else>Create Account</span>
          </button>
        </form>

        <div class="divider">OR</div>

        <div class="text-center">
          <p class="text-sm text-base-content/60">
            Already have an account?
            <NuxtLink to="/login" class="link link-primary">
              Sign in
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
