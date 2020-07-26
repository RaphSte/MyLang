<template>
    <StackLayout columns="*" rows="*,*,*" orientation="vertical">
        <Label class="header" text="settings" col="0" row="0"/>
        <Label text="database stuff" col="0" row="0"/>
        <Button class="button" text="drop and refill table " @tap="sampleEntry"/>
        <Button class="button" text="select and console log all rows" @tap="selectAndLog"/>
        <Button class="button" text="view vocabulary list" @tap="viewVocabs"/>

    </StackLayout>


</template>

<script lang="ts">
    import VocabularyListComponent from "@/components/VocabularyListComponent.vue";
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {VocabularyDTO} from "@/classes/VocabularyDTO";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import {VocabularyDataProvider} from "@/classes/VocabularyDataProvider";


    export default {
        name: "Settings",
        data() {
            return {
                hello: "hello world!",
                vocabularies: [],
            }
        },
        methods: {
            sampleEntry(): void {
                this.   dropTable();

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
                this.vocabularies = vocabularyDTOs;
            },
            viewVocabs(): void{
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();



                this.$navigateTo(VocabularyListComponent,{
                    props: {
                        vocabularies: this.vocabularies,
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>