import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
import {VocabularyDTO} from "@/classes/VocabularyDTO";

export class VocabularyService {

    private vocabularyDatabaseConnector: VocabularyDatabaseConnector;

    constructor() {
        this.vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
    }

    async getVocabularyById(id: number) {
        return this.vocabularyDatabaseConnector.selectVocabularyById(id);
    }

    //checkForNextVocabularyIntroduction
    getNextUnIntroducedVocabularyFrom(vocabularyDTOS: IVocabularyDTO[]): IVocabularyDTO {

        for (let vocabularyDTO of vocabularyDTOS) {
            if (vocabularyDTO.excludeFromLearning === 0 && vocabularyDTO.includeToLearning === 0) {
                return vocabularyDTO;
            }
        }
        //intentional null
        return null;
    }

    provideRandomVocabularyFromBatch(vocabularyDTOS: IVocabularyDTO[]): IVocabularyDTO {
        return vocabularyDTOS[Math.floor(Math.random() * vocabularyDTOS.length)];
    }

    provideAnotherRandomVocabularyFromBatch(vocabularyDTOS: IVocabularyDTO[], excludedVocabulary: IVocabularyDTO): IVocabularyDTO {
        let newVocabularyDTOBatch: IVocabularyDTO[] = vocabularyDTOS.filter(obj => obj !== excludedVocabulary);
        return this.provideRandomVocabularyFromBatch(newVocabularyDTOBatch);
    }


    remarkLearning(vocabularyDTO: IVocabularyDTO): void {
        vocabularyDTO.includeToLearning = 1;
        this.vocabularyDatabaseConnector.updateVocabulary(vocabularyDTO);
    }

    remarkExcludeFromLearning(vocabularyDTO: IVocabularyDTO): void {
        vocabularyDTO.excludeFromLearning = 1;
        this.vocabularyDatabaseConnector.updateVocabulary(vocabularyDTO);
    }

    updateVocabularyStats(vocabularyDTO: IVocabularyDTO, correctlyAnswered: boolean): void {
        //updateStuff: repetitionstuff, check if vocabulary finished learning
        vocabularyDTO.repetitions++;
        if (correctlyAnswered) {
            vocabularyDTO.correctRepetitions++;
        }
        let percentageCorrect = vocabularyDTO.correctRepetitions / vocabularyDTO.repetitions;
        if (typeof percentageCorrect !== "number" || !isFinite(percentageCorrect)) {
            vocabularyDTO.percentageCorrect = 0;
        } else {
            vocabularyDTO.percentageCorrect = percentageCorrect;
        }
        let repetitionHistoryString = vocabularyDTO.repetitionHistory;
        if (repetitionHistoryString === 'defaultString') {
            repetitionHistoryString = "";
            console.log("resetting repetition history");
        }
        let repetitionHistoryArray = repetitionHistoryString.split(",",9);
        repetitionHistoryArray.unshift(String(correctlyAnswered));
        vocabularyDTO.repetitionHistory = repetitionHistoryArray.toString();

        this.vocabularyDatabaseConnector.updateVocabulary(vocabularyDTO);
        console.log("upadte vocabularyDTO in db:  ", vocabularyDTO);
    }


}
