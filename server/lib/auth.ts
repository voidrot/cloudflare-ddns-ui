import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '~~/server/database/client'
import { username, admin } from 'better-auth/plugins'
import { authSchema } from '~~/server/database/schema'

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseUrl: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: process.env.BETTER_AUTH_DISABLE_SIGNUP === 'true',
  },
  socialProviders: {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string || 'bogus-client-id',
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string || 'bogus-client-secret',
        disableSignUp: process.env.BETTER_AUTH_DISABLE_SIGNUP === 'true',
      },
      gitlab: {
        clientId: process.env.GITLAB_CLIENT_ID as string || 'bogus-client-id',
        clientSecret: process.env.GITLAB_CLIENT_SECRET as string || 'bogus-client-secret',
        issuer: process.env.GITLAB_ISSUER as string || 'https://gitlab.com',
        disableSignUp: process.env.BETTER_AUTH_DISABLE_SIGNUP === 'true',
      }
  },
  plugins: [
    username(),
    admin(),
  ]
})
