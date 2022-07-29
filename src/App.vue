<template>
  <v-app
    style="background: linear-gradient(180deg, rgba(74,54,83,1) 0%, rgba(8,0,11,0.9374124649859944) 45%);"
  >
    <v-container>
      <v-card class="main">
        
        <h1>Wallet Finder</h1>
        <v-divider class="ma-4"></v-divider>

        <v-btn
          @click="generatePrivateKey()"
          outlined
        >
          Generate Private Key
        </v-btn>
        <v-text-field
          v-model="privateKey"
        >
        </v-text-field>
        <v-btn
          @click="getBalance(privateKey)"
          outlined
        >
          Get Balance
        </v-btn>
        <p>{{cloBalance}}</p>
        <p>{{bscBalance}}</p>
        <p>{{plyBalance}}</p>
        <p>{{etcBalance}}</p>
        <p>{{vlsBalance}}</p>
      </v-card>
    </v-container>

  </v-app>
</template>

<script>
const Web3 = require('web3');

export default {
  name: 'App',
  data: () => ({
    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000010",
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
  mounted () {
    this.getBalance()
  },
  methods: {
    generatePrivateKey: function () {
        var result           = '';
        var characters       = 'ABCDEFabcdef0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 64; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.privateKey = '0x'+result;

        this.getBalance()
      },
    getBalance: function () {
      const clo = new Web3(this.providerRPC.clo);
      const bsc = new Web3(this.providerRPC.bsc);
      const ply = new Web3(this.providerRPC.ply);
      const etc = new Web3(this.providerRPC.etc);
      const vls = new Web3(this.providerRPC.vls);

      var wallet = clo.eth.accounts.privateKeyToAccount(this.privateKey).address

      clo.eth.getBalance(wallet).then(balance => {
          this.cloBalance = "Address: " + wallet + " has " + balance + " WEI on Callisto Network"
      })

      bsc.eth.getBalance(wallet).then(balance => {
          this.bscBalance = "Address: " + wallet + " has " + balance + " WEI on Binance Smart Chain"
      })

      ply.eth.getBalance(wallet).then(balance => {
          this.plyBalance = "Address: " + wallet + " has " + balance + " WEI on Polygon"
      })

      etc.eth.getBalance(wallet).then(balance => {
          this.etcBalance = "Address: " + wallet + " has " + balance + " WEI on Ethereum Classic"
      })

      vls.eth.getBalance(wallet).then(balance => {
          this.vlsBalance = "Address: " + wallet + " has " + balance + " WEI on Velas"
      })
    }
  }
};
</script>

<style>
  .main{
    padding: 20px;
  }

  * {
    font-family: "courier" !important;
  }

  h1 {
    text-align: center;
  }

  .v-btn{
    margin: 20px;
  }
</style>
