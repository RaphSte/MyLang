<template>
    <!--    <StackLayout class="custom-list-wrapper">-->

    <ScrollView rows="auto,*" columns="*">
        <GridLayout rows="auto,*" columns="*" height="50%" class="custom-topic-list-wrapper">
            <Label  row="0" text="vocabularies!" class="lab" verticalAlignment="center"/>
            <ListView row="1" class="list-group" for="vocabulary in allVocabularies" backgroundColor="transparent" separatorColor="black">



                <v-template height="100%">
                    <ScrollView orientation="vertical">
                        <StackLayout class="" orientation="vertical">

                        <Label text="topic n" class="lab" verticalAlignment="center"/>

                    <Label :text="vocabulary.english" class="lab" verticalAlignment="center"/>
                    <SidewaysTopicScrollComponent/>



                    </StackLayout>
                </ScrollView>

                </v-template>
                <!--                <component v-show="sidewaysTopicScrollComponent"/>-->

            </ListView>
        </GridLayout>
    </ScrollView>

</template>


<script lang="ts">
    import SidewaysTopicScrollComponent from './SidewayTopicScrollComponent.vue';
    import {Vocabularies} from "../data/vocabularies";

    export default {
        name: "Topics",
        data() {
            return {
                SidewaysTopicScrollComponent: 'sidewaysTopicScrollComponent',
                vocabularies: Vocabularies,
                allVocabularies: [],
                myTitles: [
                    {id: 1, name: "The Da Vinci Code"},
                    {id: 2, name: "Harry Potter and the Chamber of Secrets"}
                ]
            };
        },

        components: {
            SidewaysTopicScrollComponent
        },
        methods: {
            getVocabularies() {
                this.vocabularies.forEach((vocabulary, index) => {
                    this.allVocabularies.push({
                        english: vocabulary.english
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
    .custom-topic-list-wrapper {
        margin: 10px;
        padding: 5px;
        height: 50%;
    }


</style>