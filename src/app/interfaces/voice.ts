export interface DiscreteResult {
    transcript: string
    confidence: number
    count: number
    allTranscripts: DiscreteTranscript[]
}

export interface DiscreteTranscript {
    transcript: string
    confidence: number
}