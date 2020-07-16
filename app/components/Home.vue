<template>
    <Page class="page" actionBarHidden="true">

        <GridLayout columns="*,*,*,*" rows="auto,*,auto" orientation="horizontal">

            <component
                    v-for="component in componentsArray"
                    v-show="component === currentComponent"
                    :is="component"
                    row="1"
                    col="0"
                    colSpan="4"
            />


            <GridLayout class="nav-button-wrapper" columns="*,*,*,*" rows="auto" row="2" colSpan="4"
                        orientation="horizontal">
                <Button :class="navigationButtonClasses('Topics')" text.decode="&#xf0c8;"
                        @tap="currentComponent = 'Topics'" row="2" col="0"/>

                <Button text.decode="Dojo" :class="navigationButtonClasses('Dojo')"
                        @tap="currentComponent = 'Dojo' " row="2" col="1"/>

                <Button text.decode="&#xf24d;" :class="navigationButtonClasses('Collection')"
                        @tap="currentComponent = 'Collection'" row="2" col="2"/>

                <Button text.decode="&#xf013;" :class="navigationButtonClasses('Settings')"
                        @tap="currentComponent = 'Settings'" row="2" col="3"/>
            </GridLayout>
        </GridLayout>
    </Page>
</template>


<script lang="ts">
    import AnotherPage from './AnotherPage.vue';
    import Topics from './Topics.vue';
    import Collection from './Collection.vue';
    import Dojo from './Dojo.vue';
    import Settings from './Settings.vue';

    export default {

        data() {
            return {
                currentComponent: 'Topics',
                componentsArray: ['Topics', 'Collection', 'Dojo', 'Settings'],
                msg: 'tap da buttonZ',
                counter: 1,
                btnmsg: 'tap me'
            }
        },

        components: {
            Topics, Collection, Dojo, Settings
        },

        methods: {},

        computed: {
            navigationButtonClasses() {
                return component => ({
                    "fa": true,
                    "custom-nav-btn": true,
                    "nav-button-focus": component === this.currentComponent
                });
            }
        },

    };

</script>

<style scoped>

    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .custom-nav-btn {
        /*color: #9D95B4;*/
        color: gray;
        font-size: 12px;
        border-color: transparent;
        z-index: 0;
    }

    .nav-button-focus {
        color: white;
        font-size: 20px;
        border-radius: 10px;
    }

    .button {
        background-color: pink;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: white;
    }

    .purple {
        background-color: #5326BF;
        color: white;
        font-size: 30px;
        border-radius: 10px;
    }

    .nav-button-wrapper {
        background-color: rgba(44, 22, 61, 0.6);
    }

    Button {
        background-color: rgba(255, 0, 0, 0.0);
    }

</style>
