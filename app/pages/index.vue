<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
    <div class="min-h-screen bg-linear-to-br from-base-100 to-base-200">
    <!-- Hero Section -->
    <div class="flex flex-col items-center justify-center min-h-screen px-4">
      <div class="max-w-2xl text-center">
        <!-- Logo/Icon -->
        <div class="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 mx-auto text-primary">
            <path d="M13.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8.5L13.5 2z" />
            <path d="M13 11h-2v2h2v-2zm0 4h-2v2h2v-2zM9 11H7v2h2v-2zm0 4H7v2h2v-2z" fill="currentColor" />
          </svg>
        </div>

        <!-- Heading -->
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          Cloudflare DDNS UI
        </h1>

        <!-- Subheading -->
        <p class="text-xl md:text-2xl text-base-content/70 mb-6">
          Manage your dynamic DNS records with ease
        </p>

        <!-- Description -->
        <p class="text-lg text-base-content/60 mb-12 leading-relaxed">
          Keep your domain pointing to the right IP address automatically. Simple, secure, and always in sync with your infrastructure.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register" class="btn btn-primary btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Get Started
          </NuxtLink>
          <NuxtLink to="/login" class="btn btn-outline btn-lg">
            Sign In
          </NuxtLink>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl w-full">
        <!-- Feature 1 -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-primary mb-4">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <h3 class="card-title text-lg">Easy to Use</h3>
            <p class="text-sm text-base-content/70">
              Simple interface to manage your DNS records with just a few clicks
            </p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-primary mb-4">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <h3 class="card-title text-lg">Secure</h3>
            <p class="text-sm text-base-content/70">
              Your data is protected with industry-standard security practices
            </p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-primary mb-4">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <h3 class="card-title text-lg">Always Updated</h3>
            <p class="text-sm text-base-content/70">
              Your DNS automatically stays in sync with your current IP address
            </p>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer footer-center bg-base-200 text-base-content p-4 mt-auto">
      <aside>
        <p><a href="https://github.com/voidrot/cloudflare-ddns-ui">Cloudflare DDNS UI</a>. Built for the Home Lab.</p>
      </aside>
    </footer>
  </div>
</template>
