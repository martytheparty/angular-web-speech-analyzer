export interface DiscreteResult {
    language: string
    transcript: string
    confidence: number
    count: number
    maxAlternatives: number
    allTranscripts: DiscreteTranscript[]
}

export interface DiscreteTranscript {
    transcript: string
    confidence: number
}