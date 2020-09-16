import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

var Sqlite = require("nativescript-sqlite");
import {VocabularyDTO} from "./VocabularyDTO";

enum ColumnName {
    id = "id",
    english = "english ",
    german = "german ",
    thai = "thai ",
    romanization = "romanization ",
    subTopic = "sub_topic ",
    superTopic = "super_topic ",
    audioKey = "audio_key ",
    imageKey = "image_key ",
    repetitions = "repetitions ",
    correctRepetitions = "correct_Repetitions ",
    repetitionHistory = "repetition_history ",
    percentageCorrect = "percentage_correct ",
    excludeFromLearning = "exclude_from_learning ",
    includeToLearning = "include_to_learning ",
    containsWords = "contains_words ",
    flags = "flags ",
}

enum QueryElement {
    text = "TEXT",
    integer = "INTEGER",
    numeric = "NUMERIC",
    blob = "BLOB",
    comma = ",",
}


export class VocabularyDatabaseConnector {


    private createDB() {
        return new Promise((resolve, reject) => {
            return (new Sqlite("vocabularies.db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS vocabularies (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    ColumnName.english + QueryElement.text + QueryElement.comma +
                    ColumnName.german + QueryElement.text + QueryElement.comma +
                    ColumnName.thai + QueryElement.text + QueryElement.comma +
                    ColumnName.romanization + QueryElement.text + QueryElement.comma +
                    ColumnName.subTopic + QueryElement.text + QueryElement.comma +
                    ColumnName.superTopic + QueryElement.text + QueryElement.comma +
                    ColumnName.audioKey + QueryElement.text + QueryElement.comma +
                    ColumnName.imageKey + QueryElement.text + QueryElement.comma +
                    ColumnName.repetitions + QueryElement.integer + QueryElement.comma +
                    ColumnName.correctRepetitions + QueryElement.integer + QueryElement.comma +
                    ColumnName.repetitionHistory + QueryElement.text + QueryElement.comma +
                    ColumnName.percentageCorrect + QueryElement.numeric + QueryElement.comma +
                    ColumnName.excludeFromLearning + QueryElement.integer + QueryElement.comma +
                    ColumnName.includeToLearning + QueryElement.integer + QueryElement.comma +
                    ColumnName.containsWords + QueryElement.text + QueryElement.comma +
                    ColumnName.flags + QueryElement.text +
                    ")").then(id => {
                    resolve(db);
                }, error => {
                    console.log("CREATE TABLE: ", error);
                    reject(error);
                });
            }, error => {
                reject(error);
            })
        });
    }


    public insert(entry: IVocabularyDTO) {
        //sortArray
        let entryArray = [];
        entryArray.push(
            entry.english,
            entry.german,
            entry.thai,
            entry.romanization,
            entry.subTopic,
            entry.superTopic,
            entry.audioKey,
            entry.imageKey,
            entry.repetitions,
            entry.correctRepetitions,
            entry.repetitionHistory,
            entry.percentageCorrect,
            entry.excludeFromLearning,
            entry.includeToLearning,
            entry.containsWords,
            entry.flags,
        )


        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO vocabularies (" +
                    ColumnName.english + QueryElement.comma +
                    ColumnName.german + QueryElement.comma +
                    ColumnName.thai + QueryElement.comma +
                    ColumnName.romanization + QueryElement.comma +
                    ColumnName.subTopic + QueryElement.comma +
                    ColumnName.superTopic + QueryElement.comma +
                    ColumnName.audioKey + QueryElement.comma +
                    ColumnName.imageKey + QueryElement.comma +
                    ColumnName.repetitions + QueryElement.comma +
                    ColumnName.correctRepetitions + QueryElement.comma +
                    ColumnName.repetitionHistory + QueryElement.comma +
                    ColumnName.percentageCorrect + QueryElement.comma +
                    ColumnName.excludeFromLearning + QueryElement.comma +
                    ColumnName.includeToLearning + QueryElement.comma +
                    ColumnName.containsWords + QueryElement.comma +
                    ColumnName.flags +
                    ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", entryArray).then(id => {
                    console.log("INSERT RESULT: ", id);
                }, error => {
                    console.log("INSERT FAILED: ", error);
                    reject(false);
                })
            })
        })
    }

    public selectAll() {
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM vocabularies").then(rows => {
                    let vocabularyDTOArray: IVocabularyDTO[] = [];
                    rows.forEach((row) => {
                        let vocabularyDTO: IVocabularyDTO = this.createVocabularyDTO(row)
                        vocabularyDTOArray.push(vocabularyDTO);
                    });
                    resolve(vocabularyDTOArray);
                }, error => {
                    console.log("SELECT ERROR: ", error);
                    reject(error);
                });
            })
        });
    }


    public selectTopics() {
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                //TODO may be optimized(distinct) by saving topics in their dedicated table - gimme some nosql lol
                return res.all("SELECT DISTINCT " + ColumnName.subTopic + QueryElement.comma + ColumnName.superTopic + " FROM vocabularies").then(rows => {
                    let vocabularyDTOArray: IVocabularyDTO[] = [];
                    rows.forEach((row) => {
                        let vocabularyDTO: IVocabularyDTO = this.createVocabularyDTO(row);
                        vocabularyDTOArray.push(vocabularyDTO);
                    });
                    resolve(vocabularyDTOArray);
                }, error => {
                    console.log("SELECT TOPICS ERROR: ", error);
                    reject(error);
                });
            })
        });
    }


    public selectSuperTopics() {
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT DISTINCT " + ColumnName.superTopic + " FROM vocabularies").then(rows => {
                    let superTopics: string[] = [];

                    rows.forEach((row, index) => {
                        superTopics.push(rows[index][0]);
                    });
                    resolve(superTopics);
                }, error => {
                    console.log("SELECT SUPER TOPICS ERROR: ", error);
                    reject(error);
                });
            })
        });
    }


    public selectSubTopicsFor(superTopic: string) {
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                //TODO may be optimized(distinct) by saving topics in their dedicated table - gimme some nosql lol
                return res.all("SELECT DISTINCT " + ColumnName.subTopic +
                    " FROM vocabularies WHERE " + ColumnName.superTopic + "='" + superTopic + "'").then(rows => {
                    let subTopics: string[] = [];
                    rows.forEach((row, index) => {
                        subTopics.push(rows[index][0]);
                    });
                    resolve(subTopics);
                }, error => {
                    console.log("SELECT SUBTOPICS ERROR: ", error);
                    reject(error);
                });
            })
        });
    }


    public selectVocabulariesFor(subTopic: string) {
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT DISTINCT * FROM vocabularies WHERE " + ColumnName.subTopic + "='" + subTopic + "'").then(rows => {
                    //TODO if empty, return string that says, 'no vocabs for $topic found'
                    let vocabularyDTOArray: IVocabularyDTO[] = [];
                    rows.forEach((row) => {
                        let vocabularyDTO: IVocabularyDTO = this.createVocabularyDTO(row)
                        vocabularyDTOArray.push(vocabularyDTO);
                    });
                    resolve(vocabularyDTOArray);
                }, error => {
                    console.log("SELECT SUBTOPICS ERROR: ", error);
                    reject(error);
                });
            })
        });
    }

    public selectVocabularyById(id: number) {
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM vocabularies WHERE " + ColumnName.id + this.wrapQueryNumber(id)).then(rows => {
                    let vocabularyDTOArray: IVocabularyDTO[] = [];
                    rows.forEach((row) => {
                        let vocabularyDTO: IVocabularyDTO = this.createVocabularyDTO(row);
                        vocabularyDTOArray.push(vocabularyDTO);
                    });
                    resolve(vocabularyDTOArray[0]);
                }, error => {
                    console.log("SELECT VOCABULARY BY ID ERROR: ", error);
                    reject(error);
                });
            })
        });
    }

    public updateVocabulary(vocabularyDTO: IVocabularyDTO) {
        return new Promise((resolve, reject) => {
            return (new Sqlite("vocabularies.db")).then(db => {
                db.execSQL("UPDATE vocabularies SET " +
                    ColumnName.english + this.wrapQueryString(vocabularyDTO.english) + QueryElement.comma +
                    ColumnName.german + this.wrapQueryString(vocabularyDTO.german) + QueryElement.comma +
                    ColumnName.thai + this.wrapQueryString(vocabularyDTO.thai) + QueryElement.comma +
                    ColumnName.romanization + this.wrapQueryString(vocabularyDTO.romanization) + QueryElement.comma +
                    ColumnName.subTopic + this.wrapQueryString(vocabularyDTO.subTopic) + QueryElement.comma +
                    ColumnName.superTopic + this.wrapQueryString(vocabularyDTO.superTopic) + QueryElement.comma +
                    ColumnName.audioKey + this.wrapQueryString(vocabularyDTO.audioKey) + QueryElement.comma +
                    ColumnName.imageKey + this.wrapQueryString(vocabularyDTO.imageKey) + QueryElement.comma +
                    ColumnName.repetitions + this.wrapQueryNumber(vocabularyDTO.repetitions) + QueryElement.comma +
                    ColumnName.correctRepetitions + this.wrapQueryNumber(vocabularyDTO.correctRepetitions) + QueryElement.comma +
                    ColumnName.repetitionHistory + this.wrapQueryString(vocabularyDTO.repetitionHistory) + QueryElement.comma +
                    ColumnName.percentageCorrect + this.wrapQueryNumber(vocabularyDTO.percentageCorrect) + QueryElement.comma +
                    ColumnName.excludeFromLearning + this.wrapQueryNumber(vocabularyDTO.excludeFromLearning) + QueryElement.comma +
                    ColumnName.includeToLearning + this.wrapQueryNumber(vocabularyDTO.includeToLearning) + QueryElement.comma +
                    ColumnName.containsWords + this.wrapQueryString(vocabularyDTO.containsWords) + QueryElement.comma +
                    ColumnName.flags + this.wrapQueryString(vocabularyDTO.flags) +
                    "WHERE " + ColumnName.id + "='" + vocabularyDTO.id + "'").then(id => {

                    resolve(db);
                    console.log("UPDATE VOCABULARY SUCCESS: ");
                }, error => {
                    console.log("UPDATE VOCABULARY ERROR: ", error);
                    reject(error);
                });
            }, error => {
                reject(error);
            })
        });
    }


    public dropVocabulariesTable() {
        return new Promise((resolve, reject) => {
            return (new Sqlite("vocabularies.db")).then(db => {
                db.execSQL("DROP TABLE IF EXISTS vocabularies").then(id => {
                    resolve(db);
                    console.log("DROPPED TABLE: ");
                }, error => {
                    console.log("DROP TABLE: ", error);
                    reject(error);
                });
            }, error => {
                reject(error);
            })
        });
    }


    private createVocabularyDTO(contents: any[]): IVocabularyDTO {
        let vocabularyDTO: IVocabularyDTO = new VocabularyDTO();
        vocabularyDTO.id = contents[0];
        vocabularyDTO.english = contents[1];
        vocabularyDTO.german = contents[2];
        vocabularyDTO.thai = contents[3];
        vocabularyDTO.romanization = contents[4];
        vocabularyDTO.subTopic = contents[5];
        vocabularyDTO.superTopic = contents[6]
        vocabularyDTO.audioKey = contents[7]
        vocabularyDTO.imageKey = contents[8];
        vocabularyDTO.repetitions = contents[9];
        vocabularyDTO.correctRepetitions = contents[10];
        vocabularyDTO.repetitionHistory = contents[11];
        vocabularyDTO.percentageCorrect = contents[12];
        vocabularyDTO.excludeFromLearning = contents[13];
        vocabularyDTO.includeToLearning = contents[14];
        vocabularyDTO.containsWords = contents[15];
        vocabularyDTO.flags = contents[16];
        return vocabularyDTO;
    }

    private wrapQueryString(queryString: string) {
        return "='" + queryString + "'";
    }

    private wrapQueryNumber(queryNumber: number) {
        return "=" + queryNumber;
    }

    greet(): string {
        let a: 1;
        return "Hello, World";
    }

    getTopics() {

        return [
            {
                superTopic: 'Basics', subTopics: [
                    {name: "letters"},
                    {name: "more letters"},
                    {name: "numbers 0-100"},
                    {name: "numbers 0-20"}
                ]
            },
            {
                superTopic: 'Travelling', subTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
            {
                superTopic: 'Food & Drinks', subTopics: [
                    {name: "Food"},
                    {name: "More Food"},
                    {name: "Drinks"},
                    {name: "Cooking"}
                ]
            },
            {
                superTopic: 'Travelling', subTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
            {
                superTopic: 'Travelling', subTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
            {
                superTopic: 'Travelling', subTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
            {
                superTopic: 'Travelling', subTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
            {
                superTopic: 'Travelling', subTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            }
        ];
    }


}