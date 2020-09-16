<template>
    <GridLayout rows="auto,*" columns="*" height="100%" class="custom-topic-list-wrapper">
        <Label text="Some other stuff will come here soon (hopefully) " row="0" class="lab"/>

        <ListView row="1" class="list-group" for="topic in allTopics" backgroundColor="transparent">
            <v-template height="100%">
                <ScrollView orientation="vertical">

                    <StackLayout class="" orientation="vertical">
                        <Label :text="topic.superTopic" class="lab super-topic-label"/>
                        <SidewaysTopicScrollComponent
                                :color="getColor($index)"
                                v-bind:subTopicsProps="topic.subTopics"
                                v-bind:superTopic="topic.superTopic"
                        />

                    </StackLayout>
                </ScrollView>
            </v-template>
        </ListView>

    </GridLayout>
</template>


<script lang="ts">
    import SidewaysTopicScrollComponent from './SidewayTopicScrollComponent.vue';
    import {Vocabularies} from "@/data/vocabularies";
    import {DatabaseConnector} from '@/classes/DatabaseConnector';
    import {VocabularyDataProvider} from "@/classes/VocabularyDataProvider";
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";


    export default {
        name: "Topics",
        data() {
            return {
                SidewaysTopicScrollComponent: 'sidewaysTopicScrollComponent',
                vocabularies: Vocabularies,
                allVocabularies: [],
                allTopics: [],
                cardColor: "",
                colorArrayIndex: 0
            };
        },

        components: {
            SidewaysTopicScrollComponent
        },
        methods: {
            getVocabularies() {
                let dataBaseConnector = new DatabaseConnector();
                this.vocabularies.forEach((vocabulary, index) => {
                    this.allVocabularies.push({
                        english: vocabulary.english,
                        german: dataBaseConnector.greet()

                    });
                    console.log("push");
                });
            },
            setTopicArray() {
                let vocabularyDataProvider = new VocabularyDataProvider();
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                vocabularyDatabaseConnector.selectSuperTopics().then((superTopics: string[]) => {


                    superTopics.forEach((superTopic: string) => {
                        console.log("superTopic!: ", superTopic);
                        if (superTopic !== null) {
                            let subs = vocabularyDatabaseConnector.selectSubTopicsFor(superTopic).then((subTopics: string[]) => {
                                this.allTopics.push({
                                    superTopic: superTopic,
                                    subTopics: subTopics,
                                });
                                this.$forceUpdate();
                            });
                        }
                    });

                });
            },
            getColor(rowIndex) {
                let colors = ['#90f', '#008080', '#f0f', '#00f'];
                let duplicatedColors = [];

                colors.forEach((color) => {
                    duplicatedColors.push(color);
                    duplicatedColors.push(color);
                });
                return duplicatedColors[rowIndex % duplicatedColors.length];
            }

        },
        created() {
            this.getVocabularies();
            this.setTopicArray();
            console.log("topics created");
        }

    }
</script>


<style scoped>
    .custom-topic-list-wrapper {
        margin: 10px;
        padding: 5px;
        height: 50%;
    }

    .super-topic-label {
        vertical-align: center;
    }

</style>