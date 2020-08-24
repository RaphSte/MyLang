<template>
    <page class="page" actionBarHidden="true">
        <GridLayout columns="*,*" rows="auto,auto,auto,auto,*,auto" orientation="vertical">
            <Label text="database debugging section" col="0" row="0"/>
            <Button class="button" text="drop and refill table " row="1" @tap="sampleEntry"/>
            <Button class="button" text="select all rows. Set props for list" row="2" @tap="selectAndLog"/>
            <TextField class="inputFieldStyling" v-model="subTopicInput" hint="Enter (sup)Tpoic..." row="2" col="1"
                       @returnPress="selectVocabsForInput"/>
            <Button class="button" text="select and print topics" row="3" col="0" @tap="selectTopics"/>
            <Button class="button" text="log super & subtopics" row="3" col="1" @tap="selectSubSuperTopics"/>
            <VocabularyListComponent colSpan="2" v-bind:vocabularies="vocabularies" row="4" v-if="state === 1"/>
            <TopicListComponent v-bind:vocabularies="vocabularies" row="4" v-if="state === 2"/>
            <Button class="button" text="back" @tap="goBack" col="0" row="5"/>
        </GridLayout>
    </page>
</template>

<script lang="ts">
    import VocabularyListComponent from "@/components/VocabularyListComponent.vue";
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import {VocabularyDataProvider} from "@/classes/VocabularyDataProvider";
    import TopicListComponent from "@/components/TopicListComponent.vue";

    export default {
        name: "DatabaseDebugging",
        components: {TopicListComponent, VocabularyListComponent},
        data() {
            return {
                vocabularies: [],
                state: 0,
                subTopicInput: '',
            }
        },

        methods: {
            goBack(): void {
                this.$navigateBack();
            },
            sampleEntry(): void {
                this.state = 0;
                this.dropTable();

                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                let vocabularyDataProvider = new VocabularyDataProvider();


                vocabularyDataProvider.provideSampleVocabs().forEach((vocabularyDTO, index) => {
                    vocabularyDatabaseConnector.insert(vocabularyDTO);
                });
            },
            dropTable(): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                vocabularyDatabaseConnector.dropVocabulariesTable();
            },
            selectAndLog(): void {
                this.state = 1;
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                let vocabularyDTOs = vocabularyDatabaseConnector.selectAll().then((vocabularyDTOs: IVocabularyDTO[]) => {

                    this.vocabularies = vocabularyDTOs;
                    vocabularyDTOs.forEach((vocabularyDTO) => {
                        console.log("___________________________");
                        console.log(vocabularyDTO.english);
                        console.log(vocabularyDTO.german);
                        console.log(vocabularyDTO.romanization);
                        console.log(vocabularyDTO.thai);
                        console.log("___________________________");
                    });
                });
            },
            viewVocabs(): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

                this.$navigateTo(VocabularyListComponent, {
                    props: {
                        vocabularies: this.vocabularies,
                    }
                });
            },
            selectTopics(): void {
                this.state = 2;
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                let vocabularyDTOs = vocabularyDatabaseConnector.selectTopics().then((vocabularyDTOs: IVocabularyDTO[]) => {

                    this.vocabularies = vocabularyDTOs;
                    vocabularyDTOs.forEach((vocabularyDTO) => {
                        console.log("___________________________");
                        console.log(vocabularyDTO.superTopic);
                        console.log(vocabularyDTO.subTopic);
                        console.log("___________________________");
                    });
                });
            },
            selectSubSuperTopics(): void {
                let vocabularyDataProvider = new VocabularyDataProvider();
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

                let superTopics = vocabularyDataProvider.provideSuperTopics();


                console.log("superTopics: ", superTopics);
            },
            selectVocabsForInput(): void {
                this.state = 1;

                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();


                console.log("selecting vocabs for: " + this.subTopicInput);
                vocabularyDatabaseConnector.selectVocabulariesFor(this.subTopicInput).then((vocabularyDTOs: IVocabularyDTO[]) => {
                    this.vocabularies = vocabularyDTOs;
                });

            }
        }

    }
</script>

<style scoped>

    .inputFieldStyling {

        color: white;
    }

</style>