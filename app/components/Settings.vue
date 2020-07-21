<template>
    <StackLayout columns="*" rows="*,*,*" orientation="vertical">
        <Label class="header" text="settings" col="0" row="0"/>
        <Label text="database stuff" col="0" row="0"/>
        <Button class="button" text="process sample entry" @tap="sampleEntry" col="0" row="2"/>
    </StackLayout>



</template>

<script lang="ts">
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {VocabularyDTO} from "@/classes/VocabularyDTO";
    import {VocabularyDataProvider} from "@/classes/VocabularyDataProvider";

    export default {
        name: "Settings",
        data() {
            return {
                hello: "hello world",
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
        }
    }
</script>

<style scoped>

</style>