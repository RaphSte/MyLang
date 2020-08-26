<template>
    <Page @loaded="initVue" class="page">
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
                    :componentTaskCompleted="childComponentTaskCompleted"
                    :is="component"
                    row="1"
                    col="0"
                    colSpan="4"
                    @componentTaskIsFinished="handleStateChanges($event)"
            />


        </GridLayout>

    </Page>

</template>
<script lang="ts">

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
            setVocabArrayFor(subTopic): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();
                vocabularyDatabaseConnector.selectVocabulariesFor(subTopic).then((vocabularyDTOs: IVocabularyDTO[]) => {
                    this.vocabularies = vocabularyDTOs;
                    this.prepareNextChildComponent();
                });
            },
            prepareNextChildComponent() {
                let vocabularyService: VocabularyService = new VocabularyService();

                let nextUnIntroducedVocabulary: IVocabularyDTO = vocabularyService.getNextUnIntroducedVocabularyFrom(this.vocabularies);

                //TODO: dont do anything if previous vocab was newly introduced
                if (nextUnIntroducedVocabulary !== null){
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
                if(this.childComponentTaskCompleted){
                    this.childComponentTaskCompleted = false;
                    this.prepareNextChildComponent();
                }
            },

            initVue(): void {
                this.subTopic = this.$props["subTopicProp"];
                this.setVocabArrayFor(this.subTopic);
            },
        },

    }
</script>

<style scoped>

</style>