<template>
    <ScrollView orientation="horizontal">
        <StackLayout class="" orientation="horizontal">
                <Button v-for="title in myTitles" v-bind:key="title.id" :text="title.id +' - '+title.name"/>
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
                myTitles: [
                    {id: 1, name: "lel"},
                    {id: 2, name: "kek"},
                    {id: 3, name: "lul"},
                    {id: 4, name: "lol"},
                    {id: 5, name: "ftw"},
                    {id: 6, name: "hello"},
                    {id: 7, name: "cruel"},
                    {id: 8, name: "world"}
                ]
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