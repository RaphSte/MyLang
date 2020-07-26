<template>
    <GridLayout rows="auto,*" columns="*" height="100%" class="custom-topic-list-wrapper">
        <Label text="topic n!" row="0" class="lab"/>

        <ListView row="1" class="list-group" for="topic in allTopics" backgroundColor="transparent">
            <v-template height="100%">
                <ScrollView orientation="vertical">
                    <StackLayout class="" orientation="vertical">

                        <Label :text="topic.superTopic" class="lab" verticalAlignment="center"/>
                        <SidewaysTopicScrollComponent :color="getColor($index)" v-bind:subTopicsProps="topic.subTopics"
                                                      row="0"/>

                    </StackLayout>
                </ScrollView>
            </v-template>
        </ListView>

    </GridLayout>
</template>


<script lang="ts">
    import SidewaysTopicScrollComponent from './SidewayTopicScrollComponent.vue';
    import {Vocabularies} from "@/data/vocabularies";
    import {DatabaseConnector} from '@/classes/DatabaseConnector';

    export default {
        name: "Topics",
        data() {
            return {
                SidewaysTopicScrollComponent: 'sidewaysTopicScrollComponent',
                vocabularies: Vocabularies,
                allVocabularies: [],
                allTopics: [],
                cardColor: "",
                colorArrayIndex: 0
            };
        },

        components: {
            SidewaysTopicScrollComponent
        },
        methods: {
            getVocabularies() {
                let dataBaseConnector = new DatabaseConnector();
                this.vocabularies.forEach((vocabulary, index) => {
                    this.allVocabularies.push({
                        english: vocabulary.english,
                        german: dataBaseConnector.greet()

                    });
                    console.log("push");
                });
            },
            setTopicArray() {
                let databaseConnector = new DatabaseConnector();
                this.allTopics = databaseConnector.getTopics();
            },
            getColor(rowIndex) {
                let colors = ['#f00' , '#90f', '#0ff','#f0f', '#00f'];
                return colors[rowIndex % colors.length];
            }


        },
        created() {
            this.getVocabularies();
            this.setTopicArray();
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