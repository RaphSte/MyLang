<template>

    <ScrollView orientation="horizontal">
        <StackLayout orientation="horizontal">
            <ListView for="topic in topics">
                <v-template>
                    <Label :text="btnmsg"/>

                    <Label :text="btnmsg"/>
                    <Label :text="btnmsg"/>
                    <Label :text="btnmsg"/>
                    <Label text="asdasdasd"/>
                </v-template>
            </ListView>
            <Label text="1asdasdasd"/>
            <Label text="2asdasdasd"/>
            <Label text="3asdasdasd"/>
            <Label text="4asdasdasd"/>
            <Label text="5asdasdasd"/>
            <Label text="6asdasdasd"/>
            <Label text="7asdasdasd"/>
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
        // props: ['topics'],
        //
        // methods: {
        //     getTopics() {
        //         this.props.topics.forEach((topic, index) => {
        //             this.topics.push({
        //                 english: topic.english
        //             });
        //             console.log("asd");
        //         });
        //     }
        // },
        // created() {
        //     this.getTopics();
        // }
    }
</script>

<style scoped>

</style>