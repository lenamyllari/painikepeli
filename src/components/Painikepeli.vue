<template>
    <div id="example-1">
        <div v-if="saldo0">
            Your saldo is 0. Want to start again?
            <button v-on:click="resetsaldo">Yes!</button>
        </div>
        <button v-on:click="updateClicks"  :disabled="isDisabled">Click to win</button>
        <p v-if="win5" class="success-message">
        ✅ You won 5
        <p v-if="win40" class="success-message">
            ✅ You won 40
        <p v-if="win250" class="success-message">
            ✅ You won 250
        <p>You have {{ money }} clicks left.</p>
        <p>Total amount {{ totalClicks }} clicks.</p>
        <p>Left till win {{ leftClicks }} clicks.</p>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "Painikepeli",
        data() {
            return{
                money: '',
                totalClicks:'',
                leftClicks: '',
                win5: false,
                win40: false,
                win250:false,
                saldo0: false,
                isDisabled: false,
                id: ''
        }
        },
        methods:{
            updatesaldo(){
                this.win40 =false;
                this.win250 = false;
                this.win5 = false;
                axios
                    .get("https://painikepeli2020lena.herokuapp.com:3000/api/updateSaldo/?id=" + this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);

                    });
                this.getsaldo();
                this.getClicks();
            },
            getsaldo(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com/:3000/api/getsaldo/?id=" + this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        if(response.data[0].money==0){
                            this.saldo0=true;
                            this.isDisabled = true;
                        }
                        this.money = response.data[0].money;
                    });
            },
            getClicks(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com:3000/api/clicks/")
                    .then( response => {
                        // eslint-disable-next-line no-console
                        //console.log(response);
                        this.totalClicks = response.data[0].amount;
                    });
            },
            updateClicks(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com:3000/api/updateclicks/")
                    .then( response => {
                        // eslint-disable-next-line no-console
                        //console.log("update cliskc response" +response);
                        if(response.data[0].amount%500==0){
                            this.addsaldo(250);
                            this.win250 = true;
                        }
                        else if(response.data[0].amount%100==0){
                            this.addsaldo(40);
                            this.win40 = true;
                        }
                        else if(response.data[0].amount%10==0){
                            console.log("adding 5");
                            this.addsaldo(5);
                            this.win5=true;
                        }
                    });
                this.updatesaldo();
                this.getleft();
            },
            addsaldo(amount){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com:3000/api/addsaldo/?amount=" + amount + "&&user="+this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);

                    });
                this.getsaldo();
            },
            getleft(){
                axios
                    .get("http://localhost:3000/api/clicks/")
                    .then( response => {
                        // eslint-disable-next-line no-console
                        //console.log(response);
                        var clicks = response.data[0].amount;
                        this.leftClicks = 10-clicks%10;
                    });
            },
            resetsaldo(){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com:3000/api/resetSaldo/?id=" + this.id)
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);

                    });
                this.getsaldo();
                this.getClicks();
                this.saldo0=false;
                this.isDisabled=false;
            }
        },
        mounted(){
            if(this.$cookies.get('id') == null){
                axios
                    .get("https://painikepeli2020lena.herokuapp.com:3000/api/adduser/")
                    .then( response => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        var userid = parseInt(response.data);
                        console.log("userid " + userid);
                        this.$cookies.set('id', userid);
                        this.id = this.$cookies.get('id');
                        console.log("line 140, id " + this.id);
                        this.getClicks();
                        this.getsaldo();
                        this.getleft();
                    });
            }
            else{
                this.id = this.$cookies.get('id');
                console.log("cookies " + this.$cookies.get('id'));
                console.log("line 148, id " + this.id);
                this.getClicks();
                this.getsaldo();
                this.getleft();
            }

        }
    }

</script>

<style scoped>
    .success-message {
        color: #32a95d;
    }
</style>
