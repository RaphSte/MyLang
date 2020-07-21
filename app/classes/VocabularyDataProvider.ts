import {VocabularyDTO} from "@/classes/VocabularyDTO";
import {sampleVocabs} from "@/data/sampleVocabs";


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

            sampleVocabDtoArray.push(vocabularyDTO);
        });

        return sampleVocabDtoArray;
    }

}