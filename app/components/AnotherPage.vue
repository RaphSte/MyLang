<template>
    <Page class="page">
        <ActionBar title="AnotherPage!!!"/>
        <StackLayout columns="*" rows="*">
            <Label class="" text="Awesome!!!" col="0" row="0"/>
            <Label class="" :text="$props.foo" col="0" row="0"/>
            <Button class="button" :text="btnmsg" @tap="goBack" col="0" row="0"/>

        </StackLayout>
    </Page>
</template>

<script lang="ts">


    export default {
        data() {
            return {
                msg: 'tap da button!!!!1!1',
                btnmsg: 'tap me'
            }
        },

        methods: {
            goBack(): void {
                this.$navigateBack();
            }
        },
        props: ['foo']

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
