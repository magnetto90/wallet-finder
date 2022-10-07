<template>
  <v-app
    :style="'background: linear-gradient(180deg, #'+privateKey.slice(6,12)+' 0%, #'+privateKey.slice(12,18)+' 45%);'"
  >
    <v-container>
      <v-card 
        class="main"
        shaped
      >
        
        <h1 :style="'color: #'+privateKey.slice(18,24)">Wallet Finder</h1>
        <v-divider class="ma-4"></v-divider>

        <v-text-field
          v-model="privateKey"
          :success="privateKey.length == 66"
          :error="privateKey.length != 66"
        >
        </v-text-field>
        <v-btn
          @click="generatePrivateKey()"
          outlined
        >
          Generate Private Key
        </v-btn>
        <v-divider class="ma-4"></v-divider>
        <h3>Wallet:</h3>
        <v-text-field
          v-model="wallet"
        >
        </v-text-field>
        <v-btn
          @click="getBalances(privateKey)"
          outlined
        >
          Get Balance 
        </v-btn>
        <h3>{{totalUSD}} USD</h3>
        <div 
          v-for="chain in chains"
          :key="chain.name"
        >
          <h3>{{chain.balance}} {{chain.symbol}} ({{chain.toUSD}} USD) on <a :href="chain.explorer+wallet" target="_blank">{{chain.name}}</a> (Nonce: {{chain.nonce}})</h3>
          <ul>
            <li 
              v-for="erc20 in chain.ERC20Balances"
              :key="erc20.symbol"
            >
              {{erc20.balance}} {{erc20.symbol}} ({{erc20.toUSD}} USD)
            </li>
          </ul>
        </div>
      </v-card>
    </v-container>

  </v-app>
</template>

<script>
import axios from "axios"
import Web3 from "web3"

export default {
  name: 'App',
  data: () => ({
    privateKey: "",
    wallet:"",
    totalUSD: 0,
    ERC20ABI: [
      {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
      {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
      {"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
      {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
    ],
    chains: {
        clo: {
          name: 'Callisto Network',
          symbol: 'CLO',
          rpc: 'https://rpc.callisto.network/',
          explorer: 'https://explorer.callisto.network/address/',
          gecko: 'callisto',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [
            {
              address: '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
              gecko: 'soy-finance'
            }
          ],
          ERC20Balances: []
        },
        eth: {
          name: 'Ethereum',
          symbol: 'ETH',
          rpc: 'https://rpc.ankr.com/eth',
          explorer: 'https://etherscan.io/address/',
          gecko: 'ethereum',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [
            {
              address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
              gecko: 'tether'
            },
            {
              address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
              gecko: 'wrapped-bitcoin'
            }
          ],
          ERC20Balances: []
        },
        bsc: {
          name: 'Binance Smart Chain',
          symbol: 'BSC',
          rpc: 'https://bsc-dataseed.binance.org/',
          explorer: 'https://bscscan.com/address/',
          gecko: 'binancecoin',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [],
          ERC20Balances: []
        },
        ply: {
          name: 'Polygon',
          rpc: 'https://polygon-rpc.com/',
          symbol: 'MATIC',
          explorer: 'https://polygonscan.com/address/',
          gecko: 'matic-network',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [],
          ERC20Balances: []
        },
        etc: {
          name: 'Ethereum Classic',
          symbol: 'ETC',
          rpc: 'https://www.ethercluster.com/etc',
          explorer: 'https://etcblockexplorer.com/address/',
          gecko: 'ethereum-classic',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [],
          ERC20Balances: []
        },
        ava: {
          name: 'Avalanche',
          symbol: 'AVAX',
          rpc: 'https://api.avax.network/ext/bc/C/rpc',
          explorer: 'https://avascan.info/blockchain/c/address/',
          gecko: 'avalanche-2',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [],
          ERC20Balances: []
        },
        opt: {
          name: 'Optimism',
          symbol: 'ETH',
          rpc: 'https://mainnet.optimism.io',
          explorer: 'https://optimistic.etherscan.io/address/',
          gecko: 'optimism',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [],
          ERC20Balances: []
        },
        gns: {
          name: 'Gnosis',
          symbol: 'xDAI',
          rpc: 'https://rpc.gnosischain.com',
          explorer: 'https://gnosisscan.io/address/',
          gecko: 'gnosis',
          balance: 0,
          toUSD: 0,
          nonce: 0,
          ERC20s: [],
          ERC20Balances: []
        }
    }

  }),
  mounted () {
    this.generatePrivateKey()
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

        this.wallet = new Web3().eth.accounts.privateKeyToAccount(this.privateKey).address

        this.getBalances()
      },
    getBalances: function () {
      this.totalUSD = 0;

      Object.keys(this.chains).forEach(async element => {

        const rpc = new Web3(this.chains[element].rpc)

        rpc.eth.getBalance(this.wallet).then(balance => {
          this.chains[element].balance = rpc.utils.fromWei(balance)
          rpc.eth.getTransactionCount(this.wallet).then(nonce => {
            this.chains[element].nonce = nonce
          })

          axios.get('https://api.coingecko.com/api/v3/coins/'+this.chains[element].gecko)
          .then(res => {
            this.chains[element].toUSD = res.data.market_data.current_price.usd * this.chains[element].balance

            this.totalUSD += this.chains[element].toUSD
          })
          .catch(error => {
            console.error(error);
            //retry if error
            //getPrice(apiID);
          });
        })

        if(this.chains[element].ERC20s.length > 0) {
          this.chains[element].ERC20Balances = []
          this.chains[element].ERC20s.forEach(async erc20 => {
            var contract = new rpc.eth.Contract(this.ERC20ABI, erc20.address);
            let symbol = await contract.methods.symbol().call()
            let name = await contract.methods.name().call()
            let decimals = await contract.methods.decimals().call()
            let balance = (await contract.methods.balanceOf(this.wallet).call())/10**decimals
            let toUSD

            axios.get('https://api.coingecko.com/api/v3/coins/'+erc20.gecko)
            .then(res => {
              toUSD = res.data.market_data.current_price.usd * balance

              this.chains[element].ERC20Balances.push({symbol: symbol, name: name, balance: balance, toUSD: toUSD, decimals: decimals})

              this.totalUSD += toUSD
            })
            .catch(error => {
              console.error(error);
              //retry if error
              //getPrice(apiID);
            });

            

            console.log(this.chains[element].ERC20Balances)
          })
            


        }
      });
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

  .face{
    max-width: 100px;
    display: block;
    margin: 0 auto;
  }
</style>
