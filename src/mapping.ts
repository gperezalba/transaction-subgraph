import { BigInt, EthereumTransaction } from "@graphprotocol/graph-ts"
import { Contract, Transfer } from "../generated/Contract/Contract"
import { Transaction, Holder } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let txId = generateTxId(event);
  let tx = new Transaction(txId);
  tx.from = event.params.sender;
  tx.to = event.params.receiver;
  tx.amount = event.params.amount;
  tx.concept = event.params.concept;
  tx.eventAddress = event.address.toHexString();
  tx.timestamp = event.block.timestamp;

  tx.save();

  let holderFrom = Holder.load(event.params.sender.toHexString());

  if (holderFrom == null) {
    holderFrom = new Holder(event.params.sender.toHexString());
  }

  let contract = Contract.bind(event.address)
  holderFrom.balance = contract.balanceOf(event.params.sender);

  holderFrom.save();
}

function generateTxId(event: Transfer): string {
  return event.transaction.hash.toHexString().concat('-').concat(event.address.toHexString());
}