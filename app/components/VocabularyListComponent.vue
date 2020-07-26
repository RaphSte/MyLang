<template>
        <ListView row="1" class="list-group" for="vocabulary in vocabularies" backgroundColor="transparent">
            <v-template height="100%">
                <ScrollView orientation="horizontal">
                    <GridLayout columns="*,*,*,*" rows="auto,*,auto" orientation="horizontal">
                        <Label col="0" class="white" :text="vocabulary.english"/>
                        <Label col="1" class="white" :text="vocabulary.german"/>
                        <Label col="2" class="white" :text="vocabulary.thai"/>
                        <Label col="3" class="white" :text="vocabulary.romanization"/>
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
            console.log("created!!!");
            this.vocabularyList = this.vocabularies;
        },
    }
</script>

<style scoped>
    .white {
        color: #fff;
    }
</style>