<template>

    <StackLayout columns="*" rows="*,*,*" orientation="vertical">
        <Label class="" :text="msg" col="0" row="0"/>
        <Button class="button" :text="btnmsg" @tap="onTap2" col="0" row="1"/>
        <Button class="button" text="go to another Page" @tap="onTap" col="0" row="2"/>
    </StackLayout>


</template>

<script lang="ts">
    import AnotherPage from "@/components/AnotherPage.vue";

    export default {
        name: "Dojo",

        data() {
            return {
                msg: 'tap da buttonZZ',
                btnmsg: 'tap me',
                counter: 1
            }
        },

        methods: {
            onTap() {
                this.$navigateTo(AnotherPage, {
                    transition: {
                        name: 'scaleUp',
                        duration: 300
                    },
                    transitioniOS: {},
                    transitionAndroid: {},

                    props: {
                        foo: this.counter,
                    }
                });
            },
            onTap2() {
                this.btnmsg = "YES! TAP ME HARDER!!" + this.counter
                this.counter = this.counter + 1
            }
        }

    }
</script>

<style scoped>

</style>