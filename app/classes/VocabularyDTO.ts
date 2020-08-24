import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

export class VocabularyDTO implements IVocabularyDTO {

    private _id: string = "defaultKey";
    private _english: string = "defaultString";
    private _german: string = "defaultString";
    private _thai: string = "defaultString";
    private _romanization: string = "defaultString";
    private _subTopic: string = "defaultString";
    private _superTopic: string = "defaultString";
    private _audioKey: string = "defaultString";
    private _imageKey: string = "defaultString";
    private _repetitions: number = 0;
    private _correctRepetitions: number = 0;
    private _repetitionHistory: string = "defaultString";
    private _percentageCorrect: number = 0;
    private _excludeFromLearning: number = 0;
    private _includeToLearning: number = 0;
    //contains array with id´s of words that occur in this word bc I´m to lazy to implement a proper db-scheme lol
    private _containsWords: any = "";
    private _flags: any = "";


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

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

    get includeToLearning(): number {
        return this._includeToLearning;
    }

    set includeToLearning(value: number) {
        this._includeToLearning = value;
    }

    get containsWords(): number[] {
        return this._containsWords;
    }

    set containsWords(value: number[]) {
        this._containsWords = value;
    }

    get flags(): string {
        return this._flags;
    }

    set flags(value: string) {
        this._flags = value;
    }
}
