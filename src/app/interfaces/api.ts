export interface ApiProperty {
    property: string;
    type: ExpectedType;
}

export type ExpectedType = 'expectedAndFound' | 'expectedAndNotFound' | 'notExpected';