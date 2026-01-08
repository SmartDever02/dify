import { oc } from '@orpc/contract'
import { z } from 'zod'

const base = oc.$route({ inputStructure: 'detailed' })

// Define Zod schema for SystemFeatures with runtime validation
export const SystemFeaturesSchema = z.object({
  plugin_installation_permission: z.object({
    plugin_installation_scope: z.enum(['all', 'none', 'official_only', 'official_and_specific_partners']),
    restrict_to_marketplace_only: z.boolean(),
  }),
  sso_enforced_for_signin: z.boolean(),
  sso_enforced_for_signin_protocol: z.string(),
  sso_enforced_for_web: z.boolean(),
  sso_enforced_for_web_protocol: z.string(),
  enable_marketplace: z.boolean(),
  enable_change_email: z.boolean(),
  enable_email_code_login: z.boolean(),
  enable_email_password_login: z.boolean(),
  enable_social_oauth_login: z.boolean(),
  is_allow_create_workspace: z.boolean(),
  is_allow_register: z.boolean(),
  is_email_setup: z.boolean(),
  license: z.object({
    status: z.enum(['none', 'inactive', 'active', 'expiring', 'expired', 'lost']),
    expired_at: z.string().nullable(),
  }),
  branding: z.object({
    enabled: z.boolean(),
    login_page_logo: z.string(),
    workspace_logo: z.string(),
    favicon: z.string(),
    application_title: z.string(),
  }),
  webapp_auth: z.object({
    enabled: z.boolean(),
    allow_sso: z.boolean(),
    sso_config: z.object({
      protocol: z.string(),
    }),
    allow_email_code_login: z.boolean(),
    allow_email_password_login: z.boolean(),
  }),
})

export const systemFeaturesContract = base
  .route({
    path: '/system-features',
    method: 'GET',
  })
  .output(SystemFeaturesSchema)

export const contract = {
  systemFeaturesContract,
}
