<template>
    <ScrollView>


        <GridLayout rows="*">
            <StackLayout row="0" class="no-padding">
                <Button class="sideways-scroll-button" :style="{'background-color':color}"
                        v-bind:key="topic.id" :text="topic" @tap="goToLearn(topic)" col="0" row="0" colSpan="2">
                </Button>
            </StackLayout>
            <StackLayout row="0" class="no-padding">
                <!-- Your FOREROUND layout -->
                <GridLayout columns="auto,*, auto" rows="auto">
                    <!--            TODO: calculate progress  in% on tap-->
                    <Label class="sideways-scroll-progress-button" text="progress: % done!" col="0" row="0"/>
                    <Button
                            class="sideways-scroll-info-button fa"
                            @tap="viewTopicOverView(topic)"
                            col="2"
                            row="0">

                    </Button>
                    <Label class="fa fa-info-circle" text.decode="&#xf05a;" col="2" row="0"/>

                </GridLayout>

            </StackLayout>
        </GridLayout>


        <!--        <GridLayout columns="*,auto" rows="*,*">-->
        <!--            <Button class="sideways-scroll-button" :style="{'background-color':color}"-->
        <!--                    v-bind:key="topic.id" :text="topic" @tap="viewVocabsForTopic(topic)" col="0" row="0" colSpan="2">-->
        <!--            </Button>-->
        <!--            <Button class="" :style="{'background-color':color}"-->
        <!--                    v-bind:key="topic.id"  @tap="viewVocabsForTopic(topic)" col="0" row="1">-->
        <!--            </Button>-->


        <!--&lt;!&ndash;            <Button class="button" text="goBack" @tap="navigateBack" col="0" row="0"/>&ndash;&gt;-->
        <!--&lt;!&ndash;            <VocabularyListComponent colSpan="3" v-bind:vocabularies="vocabularies" row="1"/>&ndash;&gt;-->
        <!--        </GridLayout>-->


    </ScrollView>
</template>

<script lang="ts">
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import Learn from "@/components/Learn.vue";
    import TopicOver from "@/components/TopicOver.vue";


    export default {
        name: "SidewayTopicScrollButton",
        data() {
            return {}
        },
        props: ['subTopicsProps', 'color', 'topic', 'superTopic'],

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
            viewTopicOverView(subToic) {
                this.$navigateTo(TopicOver, {
                    transition: {
                        name: 'scaleUp',
                        duration: 300
                    },
                    transitioniOS: {},
                    transitionAndroid: {},

                    props: {
                        subTopicProp: subToic,
                    }
                });
            }

        },
        created() {
            this.subTopics = this.subTopicsProps;
        }
        ,
    }
</script>

<style scoped>

    .sideways-scroll-button {
        color: white;
        width: 320px;
        height: 220px;
        border-radius: 30px;
        opacity: 1;
        padding: 0;
        margin: 0;
    }

    .sideways-scroll-info-button {
        border-radius: 32px;
        opacity: 0.0;
        background-color: transparent;
        padding: 0;
        margin: 0;
        width: 64px;
        height: 64px;
    }

    .fa-info-circle {
        color: lightgray;
        font-size: 16;
    }

    .no-padding {
        padding: 0;
    }

</style>