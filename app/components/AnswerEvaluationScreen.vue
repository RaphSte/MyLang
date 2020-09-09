<template>
    <Page @loaded="initVue" class="page">


        <GridLayout rows="*">
            <DockLayout stretchLastChild="true">
                <Button @tap="goBack()" class="background-button" text="right" dock="bottom"/>
            </DockLayout>
            <GridLayout>
                <Label :class="overlayClassesCorrectAnswer('Learn')" text.decode="&#xf00c;"/>
                <Label :class="overlayClassesWrongAnswer('Learn')" text.decode="&#xf00d;"/>

                <!--                TODO: dynamic rendering of fa-->
                <!--                <Label  :class="applyMatchingStyle('Learn')" text.decode="'&#xf00c;'"/>-->
            </GridLayout>
        </GridLayout>
    </Page>
</template>
<script lang="ts">
    export default {
        data() {
            return {
                childAnswerState: -1,
                success: '&#xf00c;',
                fail: '&#xf00d;',
                backEnabled: true,
            }
        },
        props: ['answerCorrect', 'vocabulary'],
        methods: {
            goBack(): void {
                if (this.backEnabled) {
                    this.$navigateBack();
                }
                this.backEnabled = false;
            },
            displayAnswerResult() {
                if (this.$props['answerCorrect']) {
                    this.childAnswerState = 1;
                } else {
                    this.childAnswerState = 0;
                }
            },
            initVue(): void {
                this.backEnabled = true;
                this.displayAnswerResult()
                setTimeout(() => {
                    this.goBack()
                }, 3500);
            },
        },
        computed: {
            applyMatchingStyle() {
                return component => ({
                    "fa": true,
                    "dialog-label": true,
                    "correct-answer": this.childAnswerState === 1,
                    "wrong-answer": this.childAnswerState === 0,
                });
            },


            overlayClassesCorrectAnswer() {
                return component => ({
                    "fa": true,
                    "dialog-label": true,
                    "correct-answer": true,
                    "hidden": this.childAnswerState !== 1,
                });
            },
            overlayClassesWrongAnswer() {
                return component => ({
                    "fa": true,
                    "dialog-label": true,
                    "wrong-answer": true,
                    "hidden": this.childAnswerState !== 0,
                });
            },
        },

    };
</script>

<style scoped>

    .dialog-label {
        background-color: lightgray;
        width: 160;
        height: 160;
        padding-top: 40;
        font-size: 80;
        border-radius: 80;
        text-align: center;
        vertical-align: center;
    }

    .background-button {
        background-color: pink;
        opacity: 0;
        z-index: -1;
        margin: 0;
        height: 100%;
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