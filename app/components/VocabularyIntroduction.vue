<template>
    <GridLayout columns="*" rows="auto,auto,*,auto,*,auto" class="text-center" orientation="horizontal">
        <Button class="button" text="Dont learn!" @tap="markAsNotLearn(vocabulary)" col="0" row="0"/>
        <!--        TODO: swich languages dynamically-->
        <!--        TODO: display icons/images-->
        <Label col="0" row="1" class="white top-element" :text="vocabulary.english"/>
        <Label col="0" row="2" class="white" :text="vocabulary.german"/>
        <Label col="0" row="3" class="white" :text="vocabulary.thai"/>
        <Label col="0" row="4" class="white" :text="vocabulary.romanization"/>
        <Button class="button" text="Learn!" @tap="markAsLearn(vocabulary)" col="0" row="5"/>


    </GridLayout>
</template>

<script lang="ts">
    import {VocabularyService} from "@/classes/VocabularyService";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

    export default {

        name: "VocabularyIntroduction",
        data() {
            return {}
        },
        props: ['vocabulary', 'componentTaskCompleted'],

        methods: {
            componentTaskIsFinished(){
                this.$emit('componentTaskIsFinished', true);
            },
            markAsNotLearn(vocabularyDTO: IVocabularyDTO): void {
                let vocabularyService = new VocabularyService();
                vocabularyService.remarkExcludeFromLearning(vocabularyDTO);
                this.componentTaskIsFinished();

            },
            markAsLearn(vocabularyDTO: IVocabularyDTO): void {
                let vocabularyService = new VocabularyService();
                vocabularyService.remarkLearning(vocabularyDTO);
                this.componentTaskIsFinished();
            },
        },
        created() {
            console.log("vocab introduction created!")
        },
    }
</script>

<style scoped>
    .white {
        color: #fff;
    }

    .top-element {
        padding-top: 150;
    }

</style>