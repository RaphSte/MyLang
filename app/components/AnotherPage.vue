<template>
    <Page class="page">
        <ActionBar title="AnotherPage!!!"/>
        <StackLayout columns="*" rows="*">
            <Label class="" text="Awesome!!!" col="0" row="0"/>
            <Label class="" :text="'Current Score' + $props.foo" col="0" row="0"/>
            <Label class="" :text="'Highscore: ' + hits" col="0" row="0"/>
            <Button class="button" :text="btnmsg" @tap="goBack" col="0" row="0"/>
            <Button class="button" text="save" @tap="saveNumber" col="0" row="0"/>
            <Button class="button" text="getHighscore" @tap="getNumber" col="0" row="0"/>
            <Button class="button" text="DROP IT!!" @tap="dropTable" col="0" row="0"/>

        </StackLayout>
    </Page>
</template>

<script lang="ts">
    const appSettings = require("tns-core-modules/application-settings");
    import {DatabaseConnector} from '@/classes/DatabaseConnector';


    export default {
        data() {
            return {
                msg: 'tap da button!!!!1!1',
                btnmsg: 'tap me',
                hits: 1
            }
        },
        props: ['foo'],
        methods: {
            goBack(): void {
                this.$navigateBack();
            },
            saveNumber(): void {
                let databaseConnector = new DatabaseConnector();
                databaseConnector.insert(this.$props["foo"]);
                appSettings.setNumber("hits", this.$props["foo"]);
            },
            getNumber(): number {
                let databaseConnector = new DatabaseConnector();
                databaseConnector.selectAll().then((res: any) => {
                    this.hits = res.score;
                    console.log(res[0][1]);
                    console.log(this.hits);
                });
                return this.hits;
            },
            dropTable(){
                let databaseConnector = new DatabaseConnector();
                databaseConnector.dropTableTapMeScore();
            }
        }


    };

</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .button {
        background-color: purple;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: white;
    }
</style>
