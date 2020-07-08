<template>

            <ListView for="topic in topics">
                <v-template>
                    <ScrollView orientation="horizontal">
                        <StackLayout class="" orientation="horizontal">
                            <Label text="1. agdfsdaqwe"/>
                            <Label :text="btnmsg"/>
                            <Label text="3. btnmsg"/>
                            <Label :text="btnmsg"/>
                            <Label text="4. asdasdasd"/>
                        </StackLayout>
                    </ScrollView>
                </v-template>
            </ListView>


</template>

<script>
    export default {
        name: "SidewayTopicScrollComponent",
        data() {
            return {
                msg: 'tap da button!!!1!1!1',
                btnmsg: 'tap da fing button1!',
                topics: ['lel','kek','asd','lul','lol']
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