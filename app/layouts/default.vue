<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <a href="#maincontent" class="sr-only">Skip to main</a>

    <header class="navbar bg-base-200 shadow-md">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost text-lg font-bold">
          DDNS UI
        </NuxtLink>
      </div>

      <nav class="flex-none gap-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="handleLogout"
        >
          Logout
        </button>
      </nav>
    </header>

    <main id="maincontent" class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="footer footer-center bg-base-200 text-base-content p-4 mt-auto">
      <aside>
        <p><a href="https://github.com/voidrot/cloudflare-ddns-ui">Cloudflare DDNS UI</a>. Built with Caffeine, Linux, and LoFi Rock.</p>
      </aside>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { authClient } from '~/lib/auth-client'

const handleLogout = async (): Promise<void> => {
  try {
    await authClient.signOut()
    // Use window.location for a hard redirect to ensure page reload
    window.location.href = '/login'
  } catch (error) {
    console.error('Logout failed:', error)
    window.location.href = '/login'
  }
}
</script>

<style scoped>
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
