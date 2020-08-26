<template>
    <GridLayout columns="*, *" rows="*,auto" class="text-center" orientation="horizontal">
        <Label textWrap="true" col="0" row="0" colSpan="2" class="white top-element" :text="provideYesNoRenderObject(vocabulary)"/>

        <Button col="0" row="1" class="fa button no-button" text.decode="&#xf057;" @tap="answerNo(vocabulary)"/>
        <Button col="1" row="1" class="fa button yes-button" text.decode="&#xf058;" @tap="answerYes(vocabulary)"/>
    </GridLayout>
</template>

<script lang="ts">
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";

    export default {

        name: "TrainingYesNo",
        data() {
            return {}
        },
        props: ['vocabulary', 'componentTaskCompleted'],

        methods: {
            componentTaskIsFinished(){
                this.$emit('componentTaskIsFinished', true);
            },

            answerYes(vocabularyDTO: IVocabularyDTO): void {
                console.log("yes has been chosen");
                //TODO: evaluate if correct, initiate dto-update, update history, update percentage correct...


                this.componentTaskIsFinished();
            },
            answerNo(vocabularyDTO: IVocabularyDTO): void {
                console.log("no has been chosen");
                //TODO: evaluate if correct, initiate dto-update, update history, update percentage correct...

                this.componentTaskIsFinished();
            },
            provideYesNoRenderObject(vocabularyDTO: IVocabularyDTO) {
                //TODO: implement picture/font/etc...
                return vocabularyDTO.german + "\n=\n" + vocabularyDTO.thai;
            }


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
        font-size: 64;
        word-break: break-all;
    }

    .button {
        background-color: transparent;
        font-size: 80;
        border-radius: 80;
        width: 80;
        height: 80;
        padding-bottom: 0;
        margin-bottom: 64;
        border : 0 solid black;
        z-index: 0;
    }

    .yes-button {
        color: forestgreen;
    }

    .no-button {
        color: indianred;
    }
</style>