<template>
    <StackLayout columns="*" rows="*,*,*" orientation="vertical">
        <Label class="header" text="settings!" col="0" row="0"/>
        <Button class="button" text="DB-Debugging" @tap="goToDBDebug"/>
    </StackLayout>

</template>

<script lang="ts">
    import AnotherPage from "@/components/AnotherPage.vue";
    import DatabaseDebugging from "@/components/DatabaseDebugging.vue";

    export default {
        name: "Settings",
        data() {
            return {
                hello: "hello world!",
                vocabularies: [],
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
            goToDBDebug() {
                console.log("-> DatabaseDebugging")
                this.$navigateTo(DatabaseDebugging, {});
            }
        }
    }
</script>

<style scoped>

</style>