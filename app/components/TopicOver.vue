<template>
    <Page @loaded="initVue" class="page">
        <GridLayout columns="*,*,*" rows="auto,*,auto" orientation="horizontal">
            <Button class="button" text="goBack" @tap="navigateBack" col="0" row="0"/>
            <Label text="TopicOver.vue" col="1" row="0" colSpan="2"/>
            <VocabularyListComponent colSpan="3" v-bind:vocabularies="vocabularies" row="1"/>
        </GridLayout>
    </Page>

</template>
<script lang="ts">

    import VocabularyListComponent from "@/components/VocabularyListComponent.vue";
    import {VocabularyDatabaseConnector} from "@/classes/VocabularyDatabaseConnector";
    import {IVocabularyDTO} from "@/classes/IVocabularyDTO";
    import VocabularyIntroduction from "@/components/VocabularyIntroduction.vue";

    export default {
        components: {VocabularyIntroduction, VocabularyListComponent},
        name: "TopicOver",
        data() {
            return {
                vocabularies: [],
                subTopic: "",
            }
        },
        props: ['subTopicProp'],
        methods: {
            navigateBack(): void {
                this.$navigateBack();
            },
            setVocabArrayFor(subTopic): void {
                let vocabularyDatabaseConnector = new VocabularyDatabaseConnector();

                console.log("selecting vocabs for: " + subTopic);
                vocabularyDatabaseConnector.selectVocabulariesFor(subTopic).then((vocabularyDTOs: IVocabularyDTO[]) => {
                    this.vocabularies = vocabularyDTOs;
                });
            },
            initVue(): void {
                this.subTopic = this.$props["subTopicProp"];
                console.log("calling: setVocabArrayFor with" + this.subTopic);
                this.setVocabArrayFor(this.subTopic);
            },
        },

    }
</script>

<style scoped>

</style>