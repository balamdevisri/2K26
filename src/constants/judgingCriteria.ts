// ─── Judging Criteria — single source of truth ───────────────────────────────

export const JUDGING_CRITERIA = {
  innovation: {
    key: 'innovation',
    label: 'Innovation',
    description: 'Originality and creative thinking',
    maxScore: 20,
    weight: 20,
  },
  technicalImplementation: {
    key: 'technicalImplementation',
    label: 'Technical Implementation',
    description: 'Code quality, architecture, technology usage',
    maxScore: 25,
    weight: 25,
  },
  problemSolving: {
    key: 'problemSolving',
    label: 'Problem Solving',
    description: 'How well the solution addresses the problem',
    maxScore: 20,
    weight: 20,
  },
  uiUx: {
    key: 'uiUx',
    label: 'UI/UX Design',
    description: 'User interface design and user experience',
    maxScore: 15,
    weight: 15,
  },
  impactPracticalValue: {
    key: 'impactPracticalValue',
    label: 'Impact & Practical Value',
    description: 'Real-world applicability and societal impact',
    maxScore: 10,
    weight: 10,
  },
  presentation: {
    key: 'presentation',
    label: 'Presentation',
    description: 'Clarity, confidence, and demo quality',
    maxScore: 10,
    weight: 10,
  },
} as const;

export type CriterionKey = keyof typeof JUDGING_CRITERIA;

// Default tie-break order (admin-configurable via eventConfig)
export const DEFAULT_TIE_BREAK_ORDER: CriterionKey[] = [
  'technicalImplementation',
  'innovation',
  'problemSolving',
  'uiUx',
  'impactPracticalValue',
  'presentation',
];

// Total must equal 100
export const TOTAL_SCORE_MAX = 100;
