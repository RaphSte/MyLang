import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
import {VocabularyDTO} from "@/classes/VocabularyDTO";

export class VocabularyService {

    private vocabularyDatabaseConnector: VocabularyDatabaseConnector;

    constructor() {
        this.vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
    }

    databaseRequestProcessing(){
        //thats a regular string
        let sqlQuery = "SELECT * FROM your_table_name WHERE ";

        //filter, two of them are set, two are blank
        let name = "Raphael Sterk";
        let department = "it-department";
        let phone = "";
        let country = "";

        let nameSnippet = this.createWhereQuerySnippet(name);
        let departmentSnippet = this.createWhereQuerySnippet(department);
        let phoneSnippet = this.createWhereQuerySnippet(phone);
        let countrySnippet = this.createWhereQuerySnippet(country);

        sqlQuery = sqlQuery + nameSnippet + departmentSnippet + phoneSnippet + countrySnippet;
        //this will be:  'SELECT * FROM your_table_name WHERE name="Raphael Sterk" OR department="it-department" OR'

        //remove last 3 chars from string (OR ) (last character is a space)
        sqlQuery = sqlQuery.substring(0, sqlQuery.length - 3);

        //add semicolon to complete query;
        sqlQuery = sqlQuery+";"


        this.myDataBaseExecuteQuery(sqlQuery);
    }


    //only works for string
    createWhereQuerySnippet(filter) {
        if (filter === "") {
            return "";
        } else {
            //keep in mind that there is a space behind the 'OR'
            return "name=\"" + filter + "\n OR ";
        }
    }

    myDataBaseExecuteQuery(sqlQuery){
        //code for execution
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
