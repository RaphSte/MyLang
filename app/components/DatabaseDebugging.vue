<template>

    <StackLayout columns="*" rows="*,*,*" orientation="vertical">
        <Label class="" :text="msg" col="0" row="0"/>
        <Button class="button" :text="back" @tap="goBack" col="0" row="1"/>
        <Button class="button" text="go to another Page" @tap="onTap" col="0" row="2"/>
<!--        <VocabularyListComponent v-bind:subTopicsProps="topic.subTopics" />-->
    </StackLayout>


</template>

<script lang="ts">
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import VocabularyListComponent from "@/components/VocabularyListComponent.vue";
    export default {
        name: "DatabaseDebugging",
        components: {VocabularyListComponent},
        data() {
            return {
                msg: 'tap da buttonZZ',
                btnmsg: 'tap me',
                vocabularies: [],
            }
        },

        methods: {
            goBack(): void {
                this.$navigateBack();
            },
            display(): void {

            }
        }

    }
</script>

<style scoped>

</style>