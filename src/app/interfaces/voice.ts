export interface DiscreteResult {
    language: string;
    transcript: string;
    confidence: number;
    count: number;
    maxAlternatives: number;
    allTranscripts: DiscreteTranscript[];
}

export interface DiscreteTranscript {
    transcript: string;
    confidence: number;
}

export interface ContinuousResult {
    language: string;
    transcript: string;
    confidence: number;
    count: number;
    maxAlternatives: number;
    allTranscripts: ContinuousTranscripts[];
}

export interface ContinuousTranscript {
    transcript: string;
    confidence: number;
}

export interface ContinuousTranscripts {
    transcripts: ContinuousTranscript[];
}