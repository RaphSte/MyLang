<template>
    <page class="page" actionBarHidden="true">
        <GridLayout columns="*" rows="auto,auto,auto,auto,*,auto" orientation="vertical">
            <Label text="database debugging section" col="0" row="0"/>
            <Button class="button" text="drop and refill table " row="1" @tap="sampleEntry"/>
            <Button class="button" text="select all rows. Set props for list" row="2" @tap="selectAndLog"/>
            <VocabularyListComponent v-bind:vocabularies="vocabularies" row="4"/>
            <Button class="button" text="back" @tap="goBack" col="0" row="5"/>
        </GridLayout>
    </page>
</template>

<script lang="ts">
    import VocabularyListComponent from "@/components/VocabularyListComponent.vue";
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import {VocabularyDataProvider} from "@/classes/VocabularyDataProvider";

    export default {
        name: "DatabaseDebugging",
        components: {VocabularyListComponent},
        data() {
            return {
                vocabularies: [],
            }
        },

        methods: {
            goBack(): void {
                this.$navigateBack();
            },
            sampleEntry(): void {
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
            viewVocabs(): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

                this.$navigateTo(VocabularyListComponent, {
                    props: {
                        vocabularies: this.vocabularies,
                    }
                });
            },
            created() {
                console.log("created!!!");
            },
        }

    }
</script>

<style scoped>

</style>