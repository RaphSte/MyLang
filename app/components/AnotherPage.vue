<template>
    <Page>
        <ActionBar title="AnotherPage!!!"/>
        <GridLayout columns="*" rows="*">
            <Label class="" text="AnotherPage!!! Awesome!!!" col="0" row="0"/>
			<Button class="button" :text="btnmsg" @tap="goback" col="0" row="0"/>
			
        </GridLayout>
    </Page>
</template>

<script lang="ts">

	import App from './App';

  export default {
    data() {
      return {
        msg: 'tap da button!!!!1!1',
		counter: 1,
		btnmsg: 'tap me'
      }
    },
	
	methods: {
	goback(){
		this.$navigateTo(App)
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
