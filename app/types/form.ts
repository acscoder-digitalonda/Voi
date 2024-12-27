export type ToneOption = 'Calm and Grounding' | 'Encouraging and Uplifting ' | 'Empowering and Confident' | 'Reflective and Meditative' | 'Dynamic and Energizing'

export interface FormData {
  name: string
  goal: string
  challenges: string
  tone: ToneOption
}