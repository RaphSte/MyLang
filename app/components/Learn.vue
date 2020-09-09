<template>
    <Page @loaded="initVue" class="page">
        <GridLayout>

            <GridLayout columns="*,*,*,*" rows="auto,*,auto" orientation="horizontal">
                <Button class="button" text="goBack" @tap="navigateBack" col="0" row="0"/>
                <Label text="Learn!" col="1" row="0"/>
                <Label text=":time left: XX:XX" col="4" row="0"/>

                <!--            <VocabularyIntroduction colSpan="4" v-bind:vocabulary="currentVocabulary" row="1"/>-->
                <!--            &lt;!&ndash;            <VocabularyListComponent colSpan="4" v-bind:vocabularies="vocabularies" row="1"/>&ndash;&gt;-->


                <component
                        v-for="component in componentsArray"
                        v-show="component === currentChildComponent"
                        v-bind:vocabulary="currentVocabulary"
                        v-bind:vocabularyDTOs="vocabularies"
                        v-bind:componentTaskCompleted="childComponentTaskCompleted"
                        v-bind:answerState="childAnswerState"
                        :is="component"
                        row="1"
                        col="0"
                        colSpan="4"
                        @componentTaskIsFinished="handleStateChanges($event)"
                        @answerState="showEvaluationPopover($event)"
                />
            </GridLayout>

            <!--            <AbsoluteLayout class="dialog-wrapper">-->


            <!--                <GridLayout>-->
            <!--                    &lt;!&ndash;                    <Button class="correct-answer dialog-button fa" text.decode="&#xf00c;"></Button>&ndash;&gt;-->
            <!--                    &lt;!&ndash;                    <Button class="wrong-answer dialog-button fa" text.decode="&#xf00d;"></Button>&ndash;&gt;-->
            <!--                    <Button :class="overlayClassesCorrectAnswer('Learn')" text.decode="&#xf00c;"-->
            <!--                            @tap="childAnswerState = -1"/>-->
            <!--                    <Button :class="overlayClassesWrongAnswer('Learn')" text.decode="&#xf00d;"-->
            <!--                            @tap="childAnswerState = -1"/>-->
            <!--                </GridLayout>-->


            <!--            </AbsoluteLayout>-->

        </GridLayout>
    </Page>

</template>
<script lang="ts">

    import AnswerEvaluationScreen from "@/components/AnswerEvaluationScreen.vue";
    import VocabularyListComponent from "@/components/VocabularyListComponent.vue";
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import VocabularyIntroduction from "@/components/VocabularyIntroduction.vue";
    import {VocabularyDTO} from "@/classes/VocabularyDTO";
    import Topics from "@/components/Topics.vue";
    import Collection from "@/components/Collection.vue";
    import Dojo from "@/components/Dojo.vue";
    import Settings from "@/components/Settings.vue";
    import TrainingYesNo from "@/components/TrainingYesNo.vue";
    import {VocabularyService} from "@/classes/VocabularyService";
    import AnotherPage from "@/components/AnotherPage.vue";

    export default {
        components: {
            VocabularyIntroduction,
            VocabularyListComponent,
            TrainingYesNo,
        },
        name: "Learn",
        data() {
            return {
                currentChildComponent: "VocabularyIntroduction",
                componentsArray: ['TrainingYesNo', 'VocabularyIntroduction'],
                childComponentTaskCompleted: false,
                childAnswerState: -1,
                vocabularies: [],
                subTopic: "",
                currentVocabulary: "",
                vocabularyIntroductionIsFinished: false,
            }
        },

        props: ['subTopicProp'],
        methods: {
            navigateBack(): void {
                this.$navigateBack();
            },
            async setVocabArrayFor(subTopic) {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                await vocabularyDatabaseConnector.selectVocabulariesFor(subTopic).then((vocabularyDTOs: IVocabularyDTO[]) => {
                    this.vocabularies = vocabularyDTOs;
                    this.prepareNextChildComponent();
                });
            },
            prepareNextChildComponent() {
                let vocabularyService: VocabularyService = new VocabularyService();

                let nextUnIntroducedVocabulary: IVocabularyDTO = vocabularyService.getNextUnIntroducedVocabularyFrom(this.vocabularies);

                //TODO: dont do anything if previous vocab was newly introduced
                if (nextUnIntroducedVocabulary !== null) {
                    this.currentVocabulary = nextUnIntroducedVocabulary;
                    this.currentChildComponent = "VocabularyIntroduction";
                } else {
                    this.vocabularyIntroductionIsFinished = true;
                    //TODO move this logic to VocabularyService (eg. determineNextComponentType)
                    //TODO: handle multiple child components
                    //TODO: yadaayadaa this is the place where ne next unlearned vocab needs to be provided. For now a random element from the array is provided.
                    let randomVocab: IVocabularyDTO = this.vocabularies[Math.floor(Math.random() * this.vocabularies.length)];
                    this.currentVocabulary = randomVocab;
                    this.currentChildComponent = "TrainingYesNo";
                }


            },
            handleStateChanges(changedState): void {
                this.childComponentTaskCompleted = changedState;
                if (this.childComponentTaskCompleted) {
                    this.childComponentTaskCompleted = false;
                    this.prepareNextChildComponent();
                }
            },
            showEvaluationPopover(childAnswerState): void {


                this.$navigateTo(AnswerEvaluationScreen, {
                    transition: {
                        name: 'scaleUp',
                        duration: 300
                    },
                    transitioniOS: {},
                    transitionAndroid: {},

                    props: {
                        answerCorrect: childAnswerState === 1,
                        vocabulary: this.currentVocabulary,

                    }
                });



                // console.log('childAnswerState: ', childAnswerState);
                // this.childAnswerState = childAnswerState;
                // this.$forceUpdate();
                // console.log("forced update");
                // setTimeout(() => {
                //     this.childAnswerState = -1;
                // }, 3500);
            },
            resetChildAnswerState(): void {
                this.childAnswerState = -1;
            },
            getDialogRenderItem() {
                if (this.chilsAnswerState === 0) {
                    return "wrong!";
                }
                if (this.chilsAnswerState === 1) {
                    return "correct!";
                }
                if (this.chilsAnswerState === -1) {
                    return "undefined!";
                }
                return "undefined!";
            },

            initVue(): void {
                this.subTopic = this.$props["subTopicProp"];
                this.setVocabArrayFor(this.subTopic);
            },
        },
    }
</script>

<style scoped>


    .dialog-wrapper {
        padding-top: 100;
    }

    .dialog-button {
        background-color: white;
        font-size: 80;
        border-radius: 80;
        width: 180;
        height: 180;
        border: 0;
        z-index: 0;
    }

    .background-button {
        background-color: pink;
        opacity: 0.5;
        width: 1010;
        height: 100;
        border: 0;
        z-index: -1;
        padding: 0;
        margin: 0;
    }

    .correct-answer {
        color: forestgreen;
    }

    .wrong-answer {
        color: indianred;
    }

    .hidden {
        opacity: 0;
        height: 1;
    }


</style>