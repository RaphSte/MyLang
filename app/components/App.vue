<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
		<Label class="" :text="msg" col="0" row="0"/>
			<Button class="button" :text="btnmsg" @tap="onTap" col="0" row="0"/>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
  import AnotherPage from './AnotherPage';
  
  
  export default {
    
		
	data() {
      return {
        msg: 'tap da button!!!!1!1',
		counter: 1,
		btnmsg: 'tap me'
      }
    },

  methods: {
	onTap(){
		this.btnmsg = "YES! TAP ME HARDER DADDY!! UwU" + this.counter
		this.counter = this.counter +1
		this.$navigateTo(AnotherPage)
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
		background-color: pink;
	}

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: white;
    }
</style>
