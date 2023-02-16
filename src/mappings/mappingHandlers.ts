import { NearActionEntity, NearTxEntity } from "../types";
import {NearTransaction, NearAction, FunctionCall} from "@subql/types-near";

export async function handleTransaction(transaction: NearTransaction): Promise<void> {
  logger.info(`Handling transaction at ${transaction.block_height}`);

  const transactionRecord = NearTxEntity.create({
    id: `${transaction.block_hash}-${transaction.result.id}`,
    block: transaction.block_height,
    signer: transaction.signer_id,
    receiver: transaction.receiver_id,
  });

  await transactionRecord.save();
}

export async function handleAction(action: NearAction<FunctionCall>): Promise<void> {
  logger.info(`Handling action at ${action.transaction.block_height}`);

  const actionRecord = NearActionEntity.create({
    id: `${action.transaction.result.id}-${action.id}`,
    block: action.transaction.block_height,
    sender: action.transaction.signer_id,
    receiver: action.transaction.receiver_id,
    token_id: (action.action as FunctionCall).args.toJson().token_id.toString(),
    nft_contract_id: (action.action as FunctionCall).args.toJson().nft_contract_id.toString(),
    ft_token_id: (action.action as FunctionCall).args.toJson().ft_token_id.toString(),
    price: BigInt((action.action as FunctionCall).args.toJson().price.toString()),
  });

  await actionRecord.save();
}
