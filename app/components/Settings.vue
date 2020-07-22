<template>
    <StackLayout columns="*" rows="*,*,*" orientation="vertical">
        <Label class="header" text="settings" col="0" row="0"/>
        <Label text="database stuff" col="0" row="0"/>
        <Button class="button" text="process sample entry" @tap="sampleEntry"/>
        <Button class="button" text="drop vocabulary table" @tap="dropTable"/>
        <Button class="button" text="select and console log all rows" @tap="selectAndLog"/>
    </StackLayout>


</template>

<script lang="ts">
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {VocabularyDTO} from "@/classes/VocabularyDTO";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import {VocabularyDataProvider} from "@/classes/VocabularyDataProvider";


    export default {
        name: "Settings",
        data() {
            return {
                hello: "hello world!",
            }
        },
        methods: {
            sampleEntry(): void {
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
                let vocabularyDTOs = vocabularyDatabaseConnector.selectAll();

                for (let vocabularyDTO  in vocabularyDTOs) {
                    let vocabularyDTONoPromise: IVocabularyDTO = vocabularyDTO;
                    console.log("___________________________");
                    console.log(vocabularyDTONoPromise.english);
                    console.log("___________________________");
                }


            },
        }
    }
</script>

<style scoped>

</style>