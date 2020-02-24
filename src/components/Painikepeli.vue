<template>
    <div>
        <div v-if="balance0">
            Your balance is 0. Want to start again?
            <button v-on:click="resetBalance">Yes!</button>
        </div>
        <button v-on:click="updateBalance"  :disabled="isDisabled">Click to win</button>
        <p v-if="win5" class="success-message">
        ✅ You won 5
        <p v-if="win40" class="success-message">
            ✅ You won 40
        <p v-if="win250" class="success-message">
            ✅ You won 250
        <p>You have {{ money }} clicks left.</p>

        <p>{{ leftClicks }} clicks till win.</p>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "Painikepeli",
        data() {
            return{
                //amount clicks the player has
                money: '',
                //amount clicks till the next win
                leftClicks: '',
                //boolean for showing win 5 message
                win5: false,
                //boolean for showing win 40 message
                win40: false,
                //boolean for showing win 5 message
                win250:false,
                //boolean for showing the reset div
                balance0: false,
                //boolean for disabling of the click button
                isDisabled: false,
                //player's id
                id: ''
            }
        },
        methods:{
            //decrease player's saldo by 1
            updateBalance(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/updateSaldo/?id=" + this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    });
                //get the new balance
                this.getBalance();
                //update the total click amount
                this.updateClicks();
            },
            //get player's balance from the database
            getBalance(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/getsaldo/?id=" + this.id)
                    .then( response => {
                        if(response.data[0].money==0){
                            //show the reset div
                            this.balance0=true;
                            //make the click button non-active
                            this.isDisabled = true;
                        }
                        else{
                            //hide the div with the reset option
                            this.balance0=false;
                            //make the click button active
                            this.isDisabled=false;
                        }
                        this.money = response.data[0].money;
                    });
            },
            //increase the total amount of clicks by 1 and check if it's time to win
            updateClicks(){
                //hide win messages
                this.win40 =false;
                this.win250 = false;
                this.win5 = false;
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/updateclicks/")
                    .then( response => {
                        var clicks = response.data[0].amount;
                        if(clicks%500==0){
                            //increase player's balance with the win amount
                            this.addBalance(250);
                            //show win message
                            this.win250 = true;
                        }
                        else if(clicks%100==0){
                            //increase player's balance with the win amount
                            this.addBalance(40);
                            //show win message
                            this.win40 = true;
                        }
                        else if(clicks%10==0) {
                            //increase player's balance with the win amount
                            this.addBalance(5);
                            //show win message
                            this.win5 = true;
                        }
                        this.leftClicks = 10-clicks%10;
                    });
            },
            //increase player's balance with the win amount
            addBalance(amount){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/addsaldo/?amount=" + amount + "&&user="+this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        //get the new balance
                        this.getBalance();
                    });

            },
            //get amount clicks till the next win from the database
            getleft(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/clicks/")
                    .then( response => {
                        var clicks = response.data[0].amount;
                        this.leftClicks = 10-clicks%10;
                    });
            },
            //set balance to 20 again
            resetBalance(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/resetSaldo/?id=" + this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    });
                //hide the div with the reset option
                this.balance0=false;
                //make the click button active
                this.isDisabled=false;
                //get the new balance
                this.getBalance();
            }
        },
        mounted(){
            //if player's id is not found in cookies, create new player, get player's balance and amount clicks till the next win from the database
            if(this.$cookies.get('id') == null){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/api/adduser/")
                    .then( response => {
                        var userid = parseInt(response.data);
                        //remember the id of the player
                        this.$cookies.set('id', userid);
                        this.id = this.$cookies.get('id');
                    });
            }
            //get player's id from the cookies
            else{
                this.id = this.$cookies.get('id');
            }
            //get player's balance and amount clicks till the next win from the database
            this.getBalance();
            this.getleft();
        }
    }

</script>

<style scoped>
    .success-message {
        color: #32a95d;
    }
</style>
