<template>

    <ScrollView orientation="horizontal">
        <StackLayout orientation="horizontal">
            <Label :text="msg"/>
            <ListView for="topic in topics">
                <v-template>
                    <Label :text="btnmsg"/>
                </v-template>
            </ListView>
        </StackLayout>
    </ScrollView>
</template>

<script>
    export default {
        name: "SidewayTopicScrollComponent",
        data() {
            return {
                msg: 'tap da button!!!1!1!1',
                btnmsg: 'tap da fing button1!',
                topics: []
            }
        },
        props: ['topics'],

        methods: {
            getTopics() {
                this.props.topics.forEach((topic, index) => {
                    this.topics.push({
                        english: topic.english
                    });
                    console.log("asd");
                });
            }
        },
        created() {
            this.getTopics();
        }
    }
</script>

<style scoped>

</style>