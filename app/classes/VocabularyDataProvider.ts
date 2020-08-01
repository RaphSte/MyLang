import {VocabularyDTO} from "@/classes/VocabularyDTO";
import {sampleVocabs} from "@/data/sampleVocabs";
import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

export class VocabularyDataProvider {


    public provideSampleVocabs(): any {
        let sampleVocabDtoArray = [];

        let sampleVocabArray = sampleVocabs;

        sampleVocabArray.forEach((vocabulary, index) => {
            let vocabularyDTO = new VocabularyDTO();
            vocabularyDTO.english = vocabulary.english;
            vocabularyDTO.german = vocabulary.german;
            vocabularyDTO.thai = vocabulary.thai;
            vocabularyDTO.romanization = vocabulary.romanization;
            vocabularyDTO.subTopic = vocabulary.subTopic;
            vocabularyDTO.superTopic = vocabulary.superTopic;

            sampleVocabDtoArray.push(vocabularyDTO);
        });

        return sampleVocabDtoArray;
    }

    public provideSubTopics(): any {
        let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
        vocabularyDatabaseConnector.getTopics();

        let subTopics: string[];

        let vocabularyDTOs = vocabularyDatabaseConnector.selectTopics().then((vocabularyDTOs: IVocabularyDTO[]) => {

            vocabularyDTOs.forEach((vocabularyDTO) => {
                subTopics.push(vocabularyDTO.subTopic);
                // console.log(vocabularyDTO.superTopic);
                // console.log(vocabularyDTO.subTopic);
            });
        });

        return subTopics;
    }


    public provideSuperTopics(): string[] {
        let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

        let superTopics: string[] = [];


        vocabularyDatabaseConnector.selectSuperTopics().then((superTopicPromise: any) => {
            superTopicPromise.forEach((superTopic) => {
                if (superTopic !== null) {
                    console.log("pushing single topic: ", superTopic);
                    superTopics.push(superTopic);
                }
            });
            console.log("superTopics: ", superTopics);
            return superTopics;
        });

        return superTopics;
    }

}