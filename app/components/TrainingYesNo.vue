<template>
    <GridLayout columns="*, *" rows="*,auto" class="text-center" orientation="horizontal">
        <Label textWrap="true" col="0" row="0" colSpan="2" class="white top-element"
               :text="provideYesNoRenderObject(vocabulary)"/>

        <Button col="0" row="1" class="fa button no-button" text.decode="&#xf057;" @tap="answerNo(vocabulary)"/>
        <Button col="1" row="1" class="fa button yes-button" text.decode="&#xf058;" @tap="answerYes(vocabulary)"/>
    </GridLayout>
</template>

<script lang="ts">
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import {VocabularyService} from "@/classes/VocabularyService";
    import {VocabularyDTO} from "@/classes/VocabularyDTO";

    export default {

        name: "TrainingYesNo",
        data() {
            return {
                compareVocabularyDTO: VocabularyDTO,
            }
        },
        props: ['vocabulary', 'vocabularyDTOs', 'componentTaskCompleted', 'answerState'],

        methods: {
            componentTaskIsFinished(): void {
                this.$emit('componentTaskIsFinished', true);
            },
            emitAnswerState(answerState: number): void {
                this.$emit('answerState', answerState);
            },

            answerYes(vocabularyDTO: IVocabularyDTO): void {
                //TODO: evaluate if correct, initiate dto-update, update history, update percentage correct...
                this.processAnswer(true);
            },
            answerNo(vocabularyDTO: IVocabularyDTO): void {
                //TODO: evaluate if correct, initiate dto-update, update history, update percentage correct...
                this.processAnswer(false);
            },

            processAnswer(answer: boolean) {

                let answerCorrect: number = -1;
                //evaluate if correct
                if ((this.compareVocabularyDTO.id === this.$props["vocabulary"].id && answer)
                    || (this.compareVocabularyDTO.id !== this.$props["vocabulary"].id && !answer)
                ) {
                    answerCorrect = 1;
                } else {
                    answerCorrect = 0;
                }

                this.emitAnswerState(answerCorrect);
                this.componentTaskIsFinished();
            },
            provideYesNoRenderObject(vocabularyDTO: IVocabularyDTO) {
                //TODO: implement picture/font/etc...
                let vocabularyService: VocabularyService = new VocabularyService();
                let compareVocabulary: IVocabularyDTO;
                let extraString = "";

                if (Math.random() > 0.5 && this.$props["vocabularyDTOs"].length !== 0) {
                    compareVocabulary = vocabularyService.provideAnotherRandomVocabularyFromBatch(this.$props["vocabularyDTOs"], vocabularyDTO);
                    this.compareVocabularyDTO = compareVocabulary;
                    console.log(compareVocabulary.german, " provided");
                    extraString = "(n)";
                } else {
                    this.compareVocabularyDTO = vocabularyDTO;
                    compareVocabulary = vocabularyDTO;
                    extraString = "(y)";
                }

                return vocabularyDTO.german + "\n=\n" + compareVocabulary.thai + extraString;
            }


        },
        created() {
            console.log("TrainingYesNo created!")
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
        border: 0 solid black;
        z-index: 0;
    }

    .yes-button {
        color: forestgreen;
    }

    .no-button {
        color: indianred;
    }
</style>