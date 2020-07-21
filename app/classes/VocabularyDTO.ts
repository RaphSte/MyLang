export class VocabularyDTO {

    // constructor(english: string, german: string, thai: string, romanization: string, subTopic: string, superTopic: string, audioKey: string, imageKey: string, repetitions: number, correctRepetitions: number, repetitionHistory: string, percentageCorrect: number, excludeFromLearning: number, containsWords: any, flags: any) {
    //     this._english = english;
    //     this._german = german;
    //     this._thai = thai;
    //     this._romanization = romanization;
    //     this._subTopic = subTopic;
    //     this._superTopic = superTopic;
    //     this._audioKey = audioKey;
    //     this._imageKey = imageKey;
    //     this._repetitions = repetitions;
    //     this._correctRepetitions = correctRepetitions;
    //     this._repetitionHistory = repetitionHistory;
    //     this._percentageCorrect = percentageCorrect;
    //     this._excludeFromLearning = excludeFromLearning;
    //     this._containsWords = containsWords;
    //     this._flags = flags;
    // }

    private _english: string;
    private _german: string;
    private _thai: string;
    private _romanization: string;
    private _subTopic: string;
    private _superTopic: string;
    private _audioKey: string;
    private _imageKey: string;
    private _repetitions: number;
    private _correctRepetitions: number;
    private _repetitionHistory: string;
    private _percentageCorrect: number;
    private _excludeFromLearning: number;
    private _containsWords: any;
    private _flags: any;


    get english(): string {
        return this._english;
    }

    set english(value: string) {
        this._english = value;
    }

    get german(): string {
        return this._german;
    }

    set german(value: string) {
        this._german = value;
    }

    get thai(): string {
        return this._thai;
    }

    set thai(value: string) {
        this._thai = value;
    }

    get romanization(): string {
        return this._romanization;
    }

    set romanization(value: string) {
        this._romanization = value;
    }

    get subTopic(): string {
        return this._subTopic;
    }

    set subTopic(value: string) {
        this._subTopic = value;
    }

    get superTopic(): string {
        return this._superTopic;
    }

    set superTopic(value: string) {
        this._superTopic = value;
    }

    get audioKey(): string {
        return this._audioKey;
    }

    set audioKey(value: string) {
        this._audioKey = value;
    }

    get imageKey(): string {
        return this._imageKey;
    }

    set imageKey(value: string) {
        this._imageKey = value;
    }

    get repetitions(): number {
        return this._repetitions;
    }

    set repetitions(value: number) {
        this._repetitions = value;
    }

    get correctRepetitions(): number {
        return this._correctRepetitions;
    }

    set correctRepetitions(value: number) {
        this._correctRepetitions = value;
    }

    get repetitionHistory(): string {
        return this._repetitionHistory;
    }

    set repetitionHistory(value: string) {
        this._repetitionHistory = value;
    }

    get percentageCorrect(): number {
        return this._percentageCorrect;
    }

    set percentageCorrect(value: number) {
        this._percentageCorrect = value;
    }

    get excludeFromLearning(): number {
        return this._excludeFromLearning;
    }

    set excludeFromLearning(value: number) {
        this._excludeFromLearning = value;
    }

    get containsWords(): string {
        return this._containsWords;
    }

    set containsWords(value: string) {
        this._containsWords = value;
    }

    get flags(): string {
        return this._flags;
    }

    set flags(value: string) {
        this._flags = value;
    }
}
