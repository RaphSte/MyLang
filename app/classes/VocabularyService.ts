import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";

export class VocabularyService {

    private vocabularyDatabaseConnector: VocabularyDatabaseConnector;

    constructor() {
        this.vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
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
