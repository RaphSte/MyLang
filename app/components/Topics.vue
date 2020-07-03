<template>
    <!--    <StackLayout class="custom-list-wrapper">-->


    <StackLayout class="custom-list-wrapper" orientation="vertical">
        <Label text="vocabularies" class="lab" verticalAlignment="center"/>
        <ListView class="list-group" for="item in allVocabularies" backgroundColor="transparent" separatorColor="transparent">
            <StackLayout class="custom-list-wrapper" orientation="vertical">
                <v-template>
                    <Label :text="item.name" class="lab" verticalAlignment="center"/>
                </v-template>
            </StackLayout>
        </ListView>
    </StackLayout>


</template>
<script lang="ts">

    import {Vocabularies} from "../data/vocabularies";

    export default {
        name: "Topics",
        data() {
            return {
                vocabularies: Vocabularies,
                allVocabularies: [],
                myTitles: [
                    {id: 1, title: "The Da Vinci Code"},
                    {id: 2, name: "Harry Potter and the Chamber of Secrets"}
                ]
            };
        },

        methods: {
            getVocabularies() {
                this.vocabularies.forEach((vocabulary, index) => {
                    this.allVocabularies.push({
                        name: vocabulary.english
                    });
                    console.log("push");
                });
            }
        },
        created() {
            this.getVocabularies();
        }
    }
</script>


<style scoped>
    .custom-list-wrapper {
        margin: 10;
        padding: 5;
    }


</style>