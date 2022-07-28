<template>
  <v-app
    style="background: linear-gradient(180deg, rgba(74,54,83,1) 0%, rgba(8,0,11,0.9374124649859944) 45%);"
  >
    <v-card>
      <v-btn
        @click="generatePrivateKey()"
      >
        Generate Private Key
      </v-btn>
      <v-text-field
        v-model="privateKey"
      >
      </v-text-field>
      <v-btn
        @click="getBalance(privateKey)"
      >
        Get Balance
      </v-btn>
      <p>{{cloBalance}}</p>
      <p>{{bscBalance}}</p>
      <p>{{plyBalance}}</p>
      <p>{{etcBalance}}</p>
      <p>{{vlsBalance}}</p>
    </v-card>
  </v-app>
</template>

<script>
const Web3 = require('web3');

export default {
  name: 'App',
  data: () => ({
    privateKey: "",
    providerRPC: {
        clo: 'https://rpc.callisto.network/',
        bsc: 'https://bsc-dataseed.binance.org/',
        ply: 'https://polygon-rpc.com/',
        etc: 'https://www.ethercluster.com/etc',
        vls: 'https://evmexplorer.velas.com/rpc'
    },
    cloBalance: "",
    bscBalance: "",
    plyBalance: "",
    etcBalance: "",
    vlsBalance: "",
  }),
  methods: {
    generatePrivateKey: function () {
        var result           = '';
        var characters       = 'ABCDEFabcdef0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 64; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.privateKey = '0x'+result;
      },
    getBalance: function () {
      const clo = new Web3(this.providerRPC.clo);
      const bsc = new Web3(this.providerRPC.bsc);
      const ply = new Web3(this.providerRPC.ply);
      const etc = new Web3(this.providerRPC.etc);
      const vls = new Web3(this.providerRPC.vls);

      var wallet = clo.eth.accounts.privateKeyToAccount(this.privateKey).address

      clo.eth.getBalance(wallet).then(balance => {
          this.cloBalance = "Address: " + wallet + " has " + balance + " on Callisto Network"
      })

      bsc.eth.getBalance(wallet).then(balance => {
          this.bscBalance = "Address: " + wallet + " has " + balance + " on Binance Smart Chain"
      })

      ply.eth.getBalance(wallet).then(balance => {
          this.plyBalance = "Address: " + wallet + " has " + balance + " on Polygon"
      })

      etc.eth.getBalance(wallet).then(balance => {
          this.etcBalance = "Address: " + wallet + " has " + balance + " on Ethereum Classic"
      })

      vls.eth.getBalance(wallet).then(balance => {
          this.vlsBalance = "Address: " + wallet + " has " + balance + " on Velas"
      })
    }
  }
};
</script>

<style>
  .contacto{
    background-color: #FD3592;
    padding: 4px;
    border-radius: 10px;
    text-align: center;
  }
</style>
