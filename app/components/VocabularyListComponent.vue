<template>
    <Page class="page">
        <ActionBar title="VocabList"/>
        <ListView row="1" class="list-group" for="vocabulary in vocabularies" backgroundColor="transparent">
            <v-template height="100%">
                <ScrollView orientation="horizontal">
                    <GridLayout columns="*,*,*,*" rows="auto,*,auto" orientation="horizontal">
                        <Label col="0" class="a" :text="vocabulary.english"/>
                        <Label col="1" class="a" :text="vocabulary.german"/>
                        <Label col="2" class="a" :text="vocabulary.thai"/>
                        <Label col="3" class="a" :text="vocabulary.romanization"/>
                    </GridLayout>
                </ScrollView>
            </v-template>
        </ListView>
    </Page>
</template>

<script lang="ts">
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

    export default {

        name: "VocabularyListComponent",
        data() {
            return {
                vocabularyList: [],
            }
        },
        props: ['vocabularies'],

        methods: {},
        created() {
            console.log("created!!!");
            this.vocabularyList = this.vocabularies;
        },
    }
</script>

<style scoped>
.a{
    color: #ffffff;
}
</style>