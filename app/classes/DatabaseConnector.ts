var Sqlite = require("nativescript-sqlite");


export class DatabaseConnector {


    private createDB() {
        return new Promise((resolve, reject) => {
            return (new Sqlite("myLang.db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS tap_me_score (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, score INTEGER)").then(id => {
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


    public insert(score: any) {
        let myScore = 420;
        let myName = "Raffler!";
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO tap_me_score (username, score) VALUES (?,?)", myName, myScore).then(id => {
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
                return res.all("SELECT * FROM tap_me_score").then(rows => {
                    let result = [];

                    for (let row in rows) {
                        result.push({
                            "username": rows[row][1],
                            "score": rows[row][2]
                        });
                        console.log("SELECT success: ", rows[row][0]);
                        console.log("SELECT success: ", rows[row][1]);
                        console.log("SELECT success: ", rows[row][2]);
                    }
                    resolve(result);
                }, error => {
                    console.log("SELECT ERROR: ", error);
                    reject(error);
                });
            })
        });
    }

    public dropTableTapMeScore() {
        let tap_me_score = "tap_me_score";

        return new Promise((resolve, reject) => {
            return (new Sqlite("myLang.db")).then(db => {
                db.execSQL("DROP TABLE IF EXISTS tap_me_score").then(id => {
                    resolve(db);
                    console.log("DROPPED TABLE!");
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