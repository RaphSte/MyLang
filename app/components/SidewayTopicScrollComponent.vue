<template>
    <ScrollView orientation="horizontal">
        <StackLayout class="" orientation="horizontal">
            <!--            <Button class="card-style" :style="{'background-color':color}" v-for="topic in subTopics"-->
            <!--                    v-bind:key="topic.id" :text="topic" @tap="viewVocabsForTopic(topic)">-->
            <!--            </Button>-->
<!--            <Label class="super-topic-label" :text="superTopic" row="0" verticalAlignment="center"/>-->
<!--            <Label class="super-topic-label" text="superTopic" row="0" verticalAlignment="center"/>-->
            <SidewayTopicScrollButton class="scroll-card"
                                      v-for="topic in subTopics"
                                      row="1"
                                      v-bind:color="color"
                                      v-bind:subTopicsProps="subTopicsProps"
                                      v-bind:key="topic.id"
                                      v-bind:topic="topic"
            />


        </StackLayout>
    </ScrollView>
</template>

<script lang="ts">
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import Learn from "@/components/Learn.vue";
    import SidewayTopicScrollButton from "@/components/SidewayTopicScrollButton.vue";


    export default {
        name: "SidewayTopicScrollComponent",
        components: {SidewayTopicScrollButton},
        data() {
            return {}
        },
        props: ['subTopicsProps', 'color', 'superTopic'],

        methods: {

            goToLearn(subTopic): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

                console.log("button pressed!");
                console.log(subTopic);

                // vocabularyDatabaseConnector.selectVocabulariesFor(subTopic).then((vocabularyDTOs: IVocabularyDTO[]) => {
                //     vocabularyDTOs.forEach((vocabularyDTO) => {
                //         console.log("___________________________");
                //         console.log(vocabularyDTO);
                //         console.log("___________________________");
                //     });
                // });


                this.$navigateTo(Learn, {
                    transition: {
                        name: 'scaleUp',
                        duration: 300
                    },
                    transitioniOS: {},
                    transitionAndroid: {},

                    props: {
                        subTopicProp: subTopic,
                    }
                });

            },


        },
        created() {
            this.subTopics = this.subTopicsProps;
            //this.superTopic = this.superTopic;
            console.log("supertopic: |",this.superTopic,"|");
        }
        ,
    }
</script>

<style scoped>
    .scroll-card {
        margin-right: 30px;
    }
    .super-topic-label{
        color: white;
    }

</style>