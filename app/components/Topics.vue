<template>
    <!--    <StackLayout class="custom-list-wrapper">-->

    <ScrollView>
        <StackLayout height="50%" class="custom-topic-list-wrapper" orientation="vertical">
            <Label text="vocabularies!!" class="lab" verticalAlignment="center"/>
            <ListView class="list-group" for="vocabulary in allVocabularies" backgroundColor="transparent"
                      separatorColor="black">


                <v-template>
                    <Label text="topic n" class="lab" verticalAlignment="center"/>
                    <Label :text="vocabulary.english" class="lab" verticalAlignment="center"/>
                </v-template>
                <!--                <component v-show="sidewaysTopicScrollComponent"/>-->

            </ListView>
        </StackLayout>
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