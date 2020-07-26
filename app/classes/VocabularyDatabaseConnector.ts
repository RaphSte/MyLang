import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

var Sqlite = require("nativescript-sqlite");
import {VocabularyDTO} from "./VocabularyDTO";

enum ColumnName {
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
                    ColumnName.containsWords + QueryElement.blob + QueryElement.comma +
                    ColumnName.flags + QueryElement.blob +
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


    public insert(entry: VocabularyDTO) {
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
                    ColumnName.containsWords + QueryElement.comma +
                    ColumnName.flags +
                    ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", entryArray).then(id => {
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

                    let vocabularyDTOArray: VocabularyDTO[] = [];

                    rows.forEach((row, index) => {
                        let vocabularyDTO = new VocabularyDTO();
                        vocabularyDTO.english = rows[index][1];
                        vocabularyDTO.german = rows[index][2];
                        vocabularyDTO.thai = rows[index][3];
                        vocabularyDTO.romanization = rows[index][4];
                        vocabularyDTOArray.push(vocabularyDTO);
                        // console.log("___________________________", index);
                        // console.log(rows[index][1], " - ", rows[index][2], rows[index][3], " - ", rows[index][4]," - ", rows[index][5]);
                        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                        // console.log(" ");
                    });

                    resolve(vocabularyDTOArray);
                }, error => {
                    console.log("SELECT ERROR: ", error);
                    reject(error);
                });
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