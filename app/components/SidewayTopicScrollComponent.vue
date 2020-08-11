<template>
    <ScrollView orientation="horizontal">
        <StackLayout class="" orientation="horizontal">
            <Button class="card-style" :style="{'background-color':color}" v-for="topic in subTopics"
                    v-bind:key="topic.id" :text="topic" @tap="viewVocabsForTopic(topic)">
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
    import Learn from "@/components/Learn.vue";


    export default {
        name: "SidewayTopicScrollComponent",
        data() {
            return {}
        },
        props: ['subTopicsProps', 'color'],

        methods: {

            viewVocabsForTopic(subTopic): void {
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