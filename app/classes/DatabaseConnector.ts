import {Vocabularies} from "@/data/vocabularies";

export class DatabaseConnector {

    constructor() {
        //default constructor
    }

    greet(): string {
        let a: 1;
        return "Hello, World";
    }

    getTopics() {
        // let allTopics = [];
        // topics.forEach((topic) => {
        //     allTopics.push({
        //
        //
        //     });

        return [
            {
                superTopic: 'Basics', supTopics: [
                    {name: "letters"},
                    {name: "more letters"},
                    {name: "numbers 0-100"},
                    {name: "numbers 0-20"}
                ]
            },
            {
                superTopic: 'Travelling', supTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
            {
                superTopic: 'Food & Drinks', supTopics: [
                    {name: "Food"},
                    {name: "More Food"},
                    {name: "Drinks"},
                    {name: "Cooking"}
                ]
            },
            {
                superTopic: 'Travelling', supTopics: [
                    {name: "Day trip"},
                    {name: "Bargaining"},
                    {name: "Directions"},
                    {name: "Transport"},
                    {name: "Airport"}
                ]
            },
        ];
    }


}