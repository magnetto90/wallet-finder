<template>
  <v-app
    style="background: linear-gradient(180deg, rgba(74,54,83,1) 0%, rgba(8,0,11,0.9374124649859944) 45%);"
  >
    <v-container>
      <v-card 
        class="main"
        shaped
      >
        
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
          :success="privateKey.length == 66"
          :error="privateKey.length != 66"
        >
        </v-text-field>
        <v-btn
          @click="getBalance(privateKey)"
          outlined
        >
          Get Balance
        </v-btn>
        <h3>Wallet: {{wallet}}</h3>
        <p>{{cloBalance}} WEI on <a :href="'https://explorer.callisto.network/address/'+wallet+'/transactions'" target="_blank">Callisto Network</a></p>
        <p>{{bscBalance}} WEI on <a :href="'https://bscscan.com/address/'+wallet" target="_blank">Binance Smart Chain</a></p>
        <p>{{plyBalance}} WEI on <a :href="'https://polygonscan.com/address/'+wallet" target="_blank">Polygon</a></p>
        <p>{{etcBalance}} WEI on <a :href="'https://etcblockexplorer.com/address/'+wallet" target="_blank">Ethereum Classic</a></p>
        <p>{{vlsBalance}} WEI on <a :href="'https://evmexplorer.velas.com/'+wallet+'/transactions'" target="_blank">Velas</a></p>
        <p>{{avaBalance}} WEI on <a :href="'https://avascan.info/blockchain/c/address/'+wallet" target="_blank">Avalanche</a></p>
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
        vls: 'https://evmexplorer.velas.com/rpc',
        ava: 'https://api.avax.network/ext/bc/C/rpc'
    },
    wallet: "",
    cloBalance: "",
    bscBalance: "",
    plyBalance: "",
    etcBalance: "",
    vlsBalance: "",
    avaBalance: ""
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
      this.cloBalance = ""
      this.bscBalance = ""
      this.plyBalance = ""
      this.etcBalance = ""
      this.vlsBalance = ""
      this.avaBalance = ""

      const clo = new Web3(this.providerRPC.clo);
      const bsc = new Web3(this.providerRPC.bsc);
      const ply = new Web3(this.providerRPC.ply);
      const etc = new Web3(this.providerRPC.etc);
      const vls = new Web3(this.providerRPC.vls);
      const ava = new Web3(this.providerRPC.ava);

      var account = clo.eth.accounts.privateKeyToAccount(this.privateKey).address

      this.wallet = account

      clo.eth.getBalance(account).then(balance => {
          this.cloBalance = balance
      })

      bsc.eth.getBalance(account).then(balance => {
          this.bscBalance = balance
      })

      ply.eth.getBalance(account).then(balance => {
          this.plyBalance = balance
      })

      etc.eth.getBalance(account).then(balance => {
          this.etcBalance = balance
      })

      vls.eth.getBalance(account).then(balance => {
          this.vlsBalance = balance
      })

      ava.eth.getBalance(account).then(balance => {
          this.avaBalance = balance
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

  h3 {
    margin-bottom: 20px;
  }

  p {
    margin-left: 20px;
  }

  .v-btn{
    margin: 20px;
  }
</style>
