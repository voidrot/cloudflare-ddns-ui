import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '~~/server/database/client'
import { username, admin } from 'better-auth/plugins'
import { authSchema } from '~~/server/database/schema'

const buildSocialProvidersConfig = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: Record<string, any> = {}
  if (process.env.BETTER_AUTH_SOCIAL_PROVIDERS_ENABLED !== 'true') {
    config.socialProviders = {}
    return config
  }

    if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
      config.socialProviders.github = {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      }
    }

    if (process.env.GITLAB_CLIENT_ID && process.env.GITLAB_CLIENT_SECRET) {
      config.socialProviders.gitlab = {
        clientId: process.env.GITLAB_CLIENT_ID as string,
        clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
        issuer: process.env.GITLAB_ISSUER as string || 'https://gitlab.com',
      }
    }
  return config
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseUrl: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: process.env.BETTER_AUTH_EMAIL_PASSWORD_ENABLED !== 'false',
  },
  ...buildSocialProvidersConfig(),
  plugins: [
    username(),
    admin(),
  ]
})
