import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
import {VocabularyDTO} from "@/classes/VocabularyDTO";

export class VocabularyService {

    private vocabularyDatabaseConnector: VocabularyDatabaseConnector;

    constructor() {
        this.vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
    }

    getVocabularyById(id: number) {
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
        //TODO: remove/filtering item from array doesnt seem to work
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

}
