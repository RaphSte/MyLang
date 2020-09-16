<template>
        <ListView row="1" class="list-group" for="vocabulary in vocabularies" backgroundColor="transparent">
            <v-template height="100%">
                <ScrollView orientation="horizontal">
                    <GridLayout columns="*,*,*,*,*,*,*,*,*,*" rows="auto,*,*,auto" orientation="horizontal">
                        <Label col="0" class="white" :text="vocabulary.id"/>
<!--                        <Label col="0" class="white" :text="vocabulary.english"/>-->
                        <Label col="1" class="white" :text="vocabulary.german"/>
                        <Label col="2" class="white" :text="vocabulary.thai"/>
                        <Label col="3" class="white" :text="vocabulary.romanization"/>
                        <Label col="4" class="white" :text="vocabulary.subTopic"/>
                        <Label col="5" class="white" :text="vocabulary.superTopic"/>
                        <Label col="0" row="1" class="white" text="flags: "/>
                        <Label col="1" row="1" class="white" :text="'not learning: '+vocabulary.excludeFromLearning"/>
                        <Label col="4" row="1" class="white" :text="'learning: '+vocabulary.includeToLearning"/>
                        <Label col="0" row="2" class="white" text="repetition stats: "/>
                        <Label col="1" row="2" class="white" :text="'repetitions: '+vocabulary.repetitions"/>
                        <Label col="2" row="2" colSpan="2" class="white" :text="'correctRepetitions: '+vocabulary.correctRepetitions"/>
                        <Label col="4" row="2" colSpan="2" class="white" :text="'%: '+vocabulary.percentageCorrect"/>
                        <Label col="0" row="3" colSpan="10"  class="white" :text="'repetition history: '+vocabulary.repetitionHistory"/>
                    </GridLayout>
                </ScrollView>
            </v-template>
        </ListView>
</template>

<script lang="ts">
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
            this.vocabularyList = this.vocabularies;
        },
    }
</script>

<style scoped>
    .white {
        color: #fff;
    }
</style>