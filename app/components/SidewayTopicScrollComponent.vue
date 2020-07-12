<template>
    <ScrollView orientation="horizontal">
        <StackLayout class="" orientation="horizontal">
            <Label class="card-style" v-for="topic in subTopics" v-bind:key="topic.id"
                   :text="topic.name">
            </Label>
            <Label class="card-style" v-for="title in myTitles" v-bind:key='title.id'
                   :text="title.id +' - '+title.name">
            </Label>
        </StackLayout>
    </ScrollView>
</template>

<script>
    export default {
        name: "SidewayTopicScrollComponent",
        data() {
            return {
                msg: 'tap da button!!!1!1!1',
                myTitles: [
                    {id: 1, name: "lel"},
                    {id: 2, name: "kek"},
                    {id: 3, name: "lul"},
                    {id: 4, name: "lol"},
                    {id: 5, name: "ftw"},
                    {id: 6, name: "hello"},
                    {id: 7, name: "cruel"},
                    {id: 8, name: "world"}
                ],
                subTopics: [
                    {id: 1, name: "lel"},
                    {id: 3, name: "lul"},
                    {id: 4, name: "lol"},
                    {id: 5, name: "ftw"},
                    {id: 6, name: "hello"},
                    {id: 7, name: "cruel"},
                    {id: 8, name: "world"}
                ],
            }
        },
        props: ['subTopics'],

        methods: {},
        created() {
            this.subTopics = this.$props['subTopics'];
        }
    }
</script>

<style scoped>
    .card-style {
        width: 320px;
        height: 220px;
        border-radius: 30px;
        opacity: 1;
        background-color: purple;
        color: white;
        margin: 30px;
    }
</style>