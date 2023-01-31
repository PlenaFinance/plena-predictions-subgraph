import { BigInt, dataSource } from "@graphprotocol/graph-ts";
import {
  Bet,
  ClaimPredictionReward
} from "../generated/templates/Wallet/Wallet";
import {
  Transaction,
  Bet as BetSchema,
  Claim as ClaimSchema
} from "../generated/schema";

export function handleBet(event: Bet): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BetSchema.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new BetSchema(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
    transaction.wallet = event.address.toHexString();
    transaction.timestamp = event.block.timestamp;
    transaction.transactionHash = event.transaction.hash.toHexString();
    transaction.transactionEvent = "bet";
  } else {
    transaction.transactionEvent = "bet";
  }

  entity.user = event.params.user;
  entity.epoch = event.params.epoch;
  entity.timestamp = event.block.timestamp;
  entity.amount = event.params.amount;
  entity.token = event.params.token;
  entity.direction = event.params.direction;
  entity.fee = event.params.fee;
  entity.transactionHash = event.transaction.hash.toHexString();
  entity.predictionContract = event.params.predictionContract;
  // Entities can be written to the store with `.save()`
  entity.save();
  transaction.bet = entity.id;
  transaction.save();
}

export function handleClaimPredictionReward(
  event: ClaimPredictionReward
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ClaimSchema.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ClaimSchema(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
    transaction.wallet = event.address.toHexString();
    transaction.timestamp = event.block.timestamp;
    transaction.transactionHash = event.transaction.hash.toHexString();
    transaction.transactionEvent = "claim";
  } else {
    transaction.transactionEvent = "claim";
  }

  entity.user = event.params.user;
  entity.epochs = event.params.epochs;
  entity.timestamp = event.block.timestamp;
  entity.reward = event.params.reward;
  entity.fee = event.params.fee;
  entity.token = event.params.token;
  entity.transactionHash = event.transaction.hash.toHexString();
  entity.predictionContract = event.params.predictionContract;

  // Entities can be written to the store with `.save()`
  entity.save();
  transaction.claim = entity.id;
  transaction.save();
}
