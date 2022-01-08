export interface Criterion {
  emoji: string
  criterion: string
  description: string
}

const BASE_CRITERION: Criterion[] = [
  {
    emoji: '🤲',
    criterion: 'Free and open source',
    description:
      'Your project code must be available to anyone to use under an open source license.',
  },
  {
    emoji: '👺',
    criterion: 'No scams',
    description:
      "Obviously, your project must not put anyone's funds or information at risk.",
  },
  {
    emoji: '👯‍♀️',
    criterion: 'No clones',
    description:
      "If you've forked code, you must provide additional, unique value to the ecosystem.",
  },
  {
    emoji: '🙋‍♀️',
    criterion: 'Project ownership',
    description:
      'The project must be yours or you must have permission from the project owner.',
  },
]

/**
 * Add any round-specific criteria here
 */
const ADDITIONAL_CRITERION: Criterion[] = [
  {
    emoji: '💰',
    criterion: 'Related to Ethereum staking',
    description: 'Your project must support Ethereum staking/validating.',
  },
  {
    emoji: '💻',
    criterion: 'No clients',
    description:
      'Client teams are so important but this round of funding is focused on supporting other parts of the ecosystem.',
  },
  {
    emoji: '💦',
    criterion: 'No pools',
    description:
      'No pools directly, but useful infrastructure and tooling built by pools can be supported.',
  },
  {
    emoji: '🆔',
    criterion: 'KYC',
    description:
      "You'll be contacted by the registry admin and must complete some basic KYC/AML requirements.",
  },
]

export const criteria: Criterion[] = [
  ...BASE_CRITERION,
  ...ADDITIONAL_CRITERION,
]
