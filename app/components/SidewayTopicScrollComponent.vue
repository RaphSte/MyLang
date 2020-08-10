<template>
    <ScrollView orientation="horizontal">
        <StackLayout class="" orientation="horizontal">
            <Button class="card-style" :style="{'background-color':color}" v-for="topic in subTopics"
                    v-bind:key="topic.id"
                    :text="topic" @tap="viewVocabsForTopic(topic.id)">
            </Button>

            <!--            <Label class="card-style" v-for="title in myTitles" v-bind:key='title.id'-->
            <!--                   :text="title.id +' - '+title.name">-->
            <!--            </Label>-->
        </StackLayout>
    </ScrollView>
</template>

<script lang="ts">
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";


    export default {
        name: "SidewayTopicScrollComponent",
        data() {
            return {}
        },
        props: ['subTopicsProps', 'color'],

        methods: {

            viewVocabsForTopic(topicId): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

                console.log("button pressed!");
                console.log(topicId);

                vocabularyDatabaseConnector.selectVocabulariesFor(topicId).then((vocabularyDTOs: IVocabularyDTO[]) => {
                    vocabularyDTOs.forEach((vocabularyDTO) => {
                        console.log("___________________________");
                        console.log(vocabularyDTO);
                        console.log("___________________________");
                    });
                });


            },


        },
        created() {
            this.subTopics = this.subTopicsProps;
        }
        ,
    }
</script>

<style scoped>
    .card-style {
        width: 320px;
        height: 220px;
        border-radius: 30px;
        opacity: 1;
        color: white;
        margin: 30px;
    }
</style>