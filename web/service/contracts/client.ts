import type { SystemFeatures } from '@/types/feature'
import { get } from '../base'
import { SystemFeaturesSchema } from './system-features.contract'

/**
 * Client implementation for system-features contract.
 * Uses the existing fetch infrastructure while leveraging the contract for type safety and validation.
 */
export const systemFeaturesClient = {
  systemFeaturesContract: async (): Promise<SystemFeatures> => {
    // Use the contract's route definition
    // The contract defines path: '/system-features' and method: 'GET'
    const path = '/system-features'

    // Use existing get function which handles auth, error handling, etc.
    const response = await get<unknown>(path)

    // Validate response against contract schema for runtime validation
    const validated = SystemFeaturesSchema.parse(response)

    // Return as SystemFeatures type (Zod validated data matches the structure)
    return validated as SystemFeatures
  },
}
