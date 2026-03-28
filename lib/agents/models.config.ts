/**
 * Sprintsesh — Agent Model Configuration
 *
 * This is the single source of truth for which AI models are assigned to each agent.
 * To swap a model, edit this file only — never hardcode model names anywhere else.
 *
 * Each agent can be composed of one or multiple models.
 * Primary model = the main reasoning/generation model for the agent's core work.
 * Secondary models = supporting models for specific subtasks (e.g. research, synthesis, image gen).
 *
 * Model IDs must match the exact identifier used by the provider's API.
 */

export type AgentRole =
  | 'architect'
  | 'project-manager'
  | 'dev-lead'
  | 'frontend-dev'
  | 'backend-dev'
  | 'developer'
  | 'ios-android-specialist'
  | 'deploy-specialist'
  | 'design-lead'
  | 'ux-designer'
  | 'ui-designer'
  | 'designer'
  | 'content-writer'
  | 'art-director'
  | 'tester'

export type ModelProvider =
  | 'anthropic'
  | 'google'
  | 'notebooklm'
  | 'openai'

export interface ModelConfig {
  provider: ModelProvider
  modelId: string
  description?: string
}

export interface AgentModelConfig {
  role: AgentRole
  primary: ModelConfig
  secondary?: ModelConfig[]
}

export const agentModels: Record<AgentRole, AgentModelConfig> = {

  // ─── Strategy ───────────────────────────────────────────────────────────────

  architect: {
    role: 'architect',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-opus-4-5',
      description: 'Reasoning, brief generation, credit estimation, user conversation',
    },
    secondary: [
      {
        provider: 'notebooklm',
        modelId: 'notebooklm',
        description: 'Research synthesis — ingests large amounts of context and organizes it',
      },
    ],
  },

  'project-manager': {
    role: 'project-manager',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-opus-4-5',
      description: 'Sprint planning, ticket creation, progress monitoring',
    },
  },

  // ─── Engineering ────────────────────────────────────────────────────────────

  'dev-lead': {
    role: 'dev-lead',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Architecture decisions, code review, developer coordination',
    },
  },

  'frontend-dev': {
    role: 'frontend-dev',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-code',
      description: 'UI implementation, component development, responsive layouts',
    },
  },

  'backend-dev': {
    role: 'backend-dev',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-code',
      description: 'API routes, database, auth flows, third-party integrations',
    },
  },

  developer: {
    role: 'developer',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-code',
      description: 'Full-stack development for Express and Balanced tiers',
    },
  },

  'ios-android-specialist': {
    role: 'ios-android-specialist',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Expo EAS configuration, iOS/Android build artifacts, App Store setup',
    },
  },

  'deploy-specialist': {
    role: 'deploy-specialist',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Vercel deployment, Tauri desktop builds, CI/CD pipeline',
    },
  },

  // ─── Design ─────────────────────────────────────────────────────────────────

  'design-lead': {
    role: 'design-lead',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Design system definition, design review, consistency enforcement',
    },
  },

  'ux-designer': {
    role: 'ux-designer',
    primary: {
      provider: 'google',
      modelId: 'gemini-1.5-pro',
      description: 'User flows, interaction specs, animations, edge case identification',
    },
  },

  'ui-designer': {
    role: 'ui-designer',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Screen designs, component specs, visual asset direction',
    },
  },

  designer: {
    role: 'designer',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Combined UX+UI generalist for Express and Balanced tiers',
    },
  },

  'art-director': {
    role: 'art-director',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'Image generation direction and asset specification',
    },
    secondary: [
      {
        provider: 'openai',
        modelId: 'dall-e-3',
        description: 'AI image generation for app icons, illustrations, marketing assets',
      },
    ],
  },

  // ─── Content ────────────────────────────────────────────────────────────────

  'content-writer': {
    role: 'content-writer',
    primary: {
      provider: 'google',
      modelId: 'gemini-1.5-pro',
      description: 'In-app copy, email templates, error messages, onboarding text',
    },
  },

  // ─── Quality ────────────────────────────────────────────────────────────────

  tester: {
    role: 'tester',
    primary: {
      provider: 'anthropic',
      modelId: 'claude-sonnet-4-5',
      description: 'End-to-end testing, edge case coverage, issue logging, sprint sign-off',
    },
  },
}

/**
 * Helper — get the model config for a given agent role.
 * Use this everywhere in the codebase instead of referencing model IDs directly.
 *
 * @example
 * const config = getAgentModel('architect')
 * // config.primary.modelId → 'claude-opus-4-5'
 */
export function getAgentModel(role: AgentRole): AgentModelConfig {
  return agentModels[role]
}

/**
 * Helper — get just the primary model ID for a role.
 * Convenience wrapper for the most common use case.
 */
export function getPrimaryModelId(role: AgentRole): string {
  return agentModels[role].primary.modelId
}

/**
 * Helper — get all secondary model configs for a role.
 * Returns empty array if no secondary models are configured.
 */
export function getSecondaryModels(role: AgentRole): ModelConfig[] {
  return agentModels[role].secondary ?? []
}
