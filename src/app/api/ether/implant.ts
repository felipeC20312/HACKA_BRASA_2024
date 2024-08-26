const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  // Use a URL da API do Alchemy que você forneceu
  const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/uhAEzDVGmpeMloI6RYfSUdnXwAhn4Xe5");

  // Substitua 'YOUR_PRIVATE_KEY' pela sua chave privada da sua Wallet
  const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

  // Carregue a ABI e o bytecode do contrato que foi compilado
  const abi = fs.readFileSync("../../../../build/ReceivableToken_sol_ReceivableToken.abi", "utf8");
  const bytecode = fs.readFileSync("../../../../build/ReceivableToken_sol_ReceivableToken.bin", "utf8");

  // Crie uma instância da fábrica de contratos
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  // Implante o contrato com os parâmetros necessários
  const contract = await factory.deploy(
    "ReceivableToken",          // Nome do token
    "RTK",                      // Símbolo do token
    1000000,                    // Suprimento inicial
    1700000000,                 // Data de início (Unix timestamp)
    1800000000,                 // Data de vencimento (Unix timestamp)
    "0xYourUSDTTokenAddress"    // Endereço do contrato USDT (substitua pelo endereço real na Sepolia)
  );

  // Aguarde a confirmação da transação
  await contract.deployed();
  console.log("Contrato implantado no endereço:", contract.address);
}

main().catch(console.error);