<template>
    <GridLayout columns="*" rows="auto,auto,*,auto,*,auto" class="text-center" orientation="horizontal">
        <Button class="button" text="Dont learn!" @tap="markAsNotLearn" col="0" row="0"/>
        <!--        TODO: swich languages dynamically-->
        <Label col="0" row="1" class="white top-element" :text="vocabulary.english"/>
        <Label col="0" row="2" class="white" :text="vocabulary.german"/>
        <Label col="0" row="3" class="white" :text="vocabulary.thai"/>
        <Label col="0" row="4" class="white" :text="vocabulary.romanization"/>
        <Button class="button" text="Learn!" @tap="markAsLearn" col="0" row="5"/>


    </GridLayout>
</template>

<script lang="ts">
    export default {

        name: "VocabularyIntroduction",
        data() {
            return {}
        },
        props: ['vocabulary'],

        methods: {
            markAsNotLearn(): void {

            },
            markAsLearn(): void {

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
    .top-element{
        padding-top: 150;
    }

</style>