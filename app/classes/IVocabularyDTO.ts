export interface IVocabularyDTO {

    id: string;
    english: string;
    german: string;
    thai: string;
    romanization: string;
    subTopic: string;
    superTopic: string;
    audioKey: string;
    imageKey: string;
    repetitions: number;
    correctRepetitions: number;
    repetitionHistory: string;
    percentageCorrect: number;
    excludeFromLearning: number;
    includeToLearning: number;
    containsWords: number[];
    flags: any;

}