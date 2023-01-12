const cracoModuleFederation = require('craco-module-federation');
const FederatedTypesPlugin = require('@module-federation/typescript');

module.exports = {
    plugins: [{
        plugin: cracoModuleFederation,
        options: { useNamedChunkIds:true } //THIS LINE IS OPTIONAL
      },{
        plugin:FederatedTypesPlugin
      }
    ]
}