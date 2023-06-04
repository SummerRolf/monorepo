// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Contribution extends ethereum.Event {
  get params(): Contribution__Params {
    return new Contribution__Params(this);
  }
}

export class Contribution__Params {
  _event: Contribution;

  constructor(event: Contribution) {
    this._event = event;
  }

  get _sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ContributionWithdrawn extends ethereum.Event {
  get params(): ContributionWithdrawn__Params {
    return new ContributionWithdrawn__Params(this);
  }
}

export class ContributionWithdrawn__Params {
  _event: ContributionWithdrawn;

  constructor(event: ContributionWithdrawn) {
    this._event = event;
  }

  get _contributor(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class FundsClaimed extends ethereum.Event {
  get params(): FundsClaimed__Params {
    return new FundsClaimed__Params(this);
  }
}

export class FundsClaimed__Params {
  _event: FundsClaimed;

  constructor(event: FundsClaimed) {
    this._event = event;
  }

  get _voteOptionIndex(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TallyPublished extends ethereum.Event {
  get params(): TallyPublished__Params {
    return new TallyPublished__Params(this);
  }
}

export class TallyPublished__Params {
  _event: TallyPublished;

  constructor(event: TallyPublished) {
    this._event = event;
  }

  get _tallyHash(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class Voted extends ethereum.Event {
  get params(): Voted__Params {
    return new Voted__Params(this);
  }
}

export class Voted__Params {
  _event: Voted;

  constructor(event: Voted) {
    this._event = event;
  }

  get _contributor(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class FundingRound extends ethereum.SmartContract {
  static bind(address: Address): FundingRound {
    return new FundingRound("FundingRound", address);
  }

  contributorCount(): BigInt {
    let result = super.call(
      "contributorCount",
      "contributorCount():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_contributorCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "contributorCount",
      "contributorCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  coordinator(): Address {
    let result = super.call("coordinator", "coordinator():(address)", []);

    return result[0].toAddress();
  }

  try_coordinator(): ethereum.CallResult<Address> {
    let result = super.tryCall("coordinator", "coordinator():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getAllocatedAmount(_tallyResult: BigInt, _spent: BigInt): BigInt {
    let result = super.call(
      "getAllocatedAmount",
      "getAllocatedAmount(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_tallyResult),
        ethereum.Value.fromUnsignedBigInt(_spent)
      ]
    );

    return result[0].toBigInt();
  }

  try_getAllocatedAmount(
    _tallyResult: BigInt,
    _spent: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getAllocatedAmount",
      "getAllocatedAmount(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_tallyResult),
        ethereum.Value.fromUnsignedBigInt(_spent)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getVoiceCredits(param0: Address, _data: Bytes): BigInt {
    let result = super.call(
      "getVoiceCredits",
      "getVoiceCredits(address,bytes):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromBytes(_data)]
    );

    return result[0].toBigInt();
  }

  try_getVoiceCredits(
    param0: Address,
    _data: Bytes
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getVoiceCredits",
      "getVoiceCredits(address,bytes):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromBytes(_data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isCancelled(): boolean {
    let result = super.call("isCancelled", "isCancelled():(bool)", []);

    return result[0].toBoolean();
  }

  try_isCancelled(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isCancelled", "isCancelled():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isFinalized(): boolean {
    let result = super.call("isFinalized", "isFinalized():(bool)", []);

    return result[0].toBoolean();
  }

  try_isFinalized(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isFinalized", "isFinalized():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  maci(): Address {
    let result = super.call("maci", "maci():(address)", []);

    return result[0].toAddress();
  }

  try_maci(): ethereum.CallResult<Address> {
    let result = super.tryCall("maci", "maci():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  matchingPoolSize(): BigInt {
    let result = super.call(
      "matchingPoolSize",
      "matchingPoolSize():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_matchingPoolSize(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "matchingPoolSize",
      "matchingPoolSize():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  nativeToken(): Address {
    let result = super.call("nativeToken", "nativeToken():(address)", []);

    return result[0].toAddress();
  }

  try_nativeToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("nativeToken", "nativeToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  recipientRegistry(): Address {
    let result = super.call(
      "recipientRegistry",
      "recipientRegistry():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_recipientRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "recipientRegistry",
      "recipientRegistry():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tallyHash(): string {
    let result = super.call("tallyHash", "tallyHash():(string)", []);

    return result[0].toString();
  }

  try_tallyHash(): ethereum.CallResult<string> {
    let result = super.tryCall("tallyHash", "tallyHash():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSpent(): BigInt {
    let result = super.call("totalSpent", "totalSpent():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSpent(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSpent", "totalSpent():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalVotes(): BigInt {
    let result = super.call("totalVotes", "totalVotes():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalVotes(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalVotes", "totalVotes():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userRegistry(): Address {
    let result = super.call("userRegistry", "userRegistry():(address)", []);

    return result[0].toAddress();
  }

  try_userRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall("userRegistry", "userRegistry():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  voiceCreditFactor(): BigInt {
    let result = super.call(
      "voiceCreditFactor",
      "voiceCreditFactor():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_voiceCreditFactor(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "voiceCreditFactor",
      "voiceCreditFactor():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _nativeToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _userRegistry(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _recipientRegistry(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _coordinator(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CancelCall extends ethereum.Call {
  get inputs(): CancelCall__Inputs {
    return new CancelCall__Inputs(this);
  }

  get outputs(): CancelCall__Outputs {
    return new CancelCall__Outputs(this);
  }
}

export class CancelCall__Inputs {
  _call: CancelCall;

  constructor(call: CancelCall) {
    this._call = call;
  }
}

export class CancelCall__Outputs {
  _call: CancelCall;

  constructor(call: CancelCall) {
    this._call = call;
  }
}

export class ContributeCall extends ethereum.Call {
  get inputs(): ContributeCall__Inputs {
    return new ContributeCall__Inputs(this);
  }

  get outputs(): ContributeCall__Outputs {
    return new ContributeCall__Outputs(this);
  }
}

export class ContributeCall__Inputs {
  _call: ContributeCall;

  constructor(call: ContributeCall) {
    this._call = call;
  }

  get pubKey(): ContributeCallPubKeyStruct {
    return changetype<ContributeCallPubKeyStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ContributeCall__Outputs {
  _call: ContributeCall;

  constructor(call: ContributeCall) {
    this._call = call;
  }
}

export class ContributeCallPubKeyStruct extends ethereum.Tuple {
  get x(): BigInt {
    return this[0].toBigInt();
  }

  get y(): BigInt {
    return this[1].toBigInt();
  }
}

export class FinalizeCall extends ethereum.Call {
  get inputs(): FinalizeCall__Inputs {
    return new FinalizeCall__Inputs(this);
  }

  get outputs(): FinalizeCall__Outputs {
    return new FinalizeCall__Outputs(this);
  }
}

export class FinalizeCall__Inputs {
  _call: FinalizeCall;

  constructor(call: FinalizeCall) {
    this._call = call;
  }

  get _totalSpent(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _totalSpentSalt(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class FinalizeCall__Outputs {
  _call: FinalizeCall;

  constructor(call: FinalizeCall) {
    this._call = call;
  }
}

export class PublishTallyHashCall extends ethereum.Call {
  get inputs(): PublishTallyHashCall__Inputs {
    return new PublishTallyHashCall__Inputs(this);
  }

  get outputs(): PublishTallyHashCall__Outputs {
    return new PublishTallyHashCall__Outputs(this);
  }
}

export class PublishTallyHashCall__Inputs {
  _call: PublishTallyHashCall;

  constructor(call: PublishTallyHashCall) {
    this._call = call;
  }

  get _tallyHash(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class PublishTallyHashCall__Outputs {
  _call: PublishTallyHashCall;

  constructor(call: PublishTallyHashCall) {
    this._call = call;
  }
}

export class RegisterCall extends ethereum.Call {
  get inputs(): RegisterCall__Inputs {
    return new RegisterCall__Inputs(this);
  }

  get outputs(): RegisterCall__Outputs {
    return new RegisterCall__Outputs(this);
  }
}

export class RegisterCall__Inputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class RegisterCall__Outputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetMaciCall extends ethereum.Call {
  get inputs(): SetMaciCall__Inputs {
    return new SetMaciCall__Inputs(this);
  }

  get outputs(): SetMaciCall__Outputs {
    return new SetMaciCall__Outputs(this);
  }
}

export class SetMaciCall__Inputs {
  _call: SetMaciCall;

  constructor(call: SetMaciCall) {
    this._call = call;
  }

  get _maci(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMaciCall__Outputs {
  _call: SetMaciCall;

  constructor(call: SetMaciCall) {
    this._call = call;
  }
}

export class SubmitMessageBatchCall extends ethereum.Call {
  get inputs(): SubmitMessageBatchCall__Inputs {
    return new SubmitMessageBatchCall__Inputs(this);
  }

  get outputs(): SubmitMessageBatchCall__Outputs {
    return new SubmitMessageBatchCall__Outputs(this);
  }
}

export class SubmitMessageBatchCall__Inputs {
  _call: SubmitMessageBatchCall;

  constructor(call: SubmitMessageBatchCall) {
    this._call = call;
  }

  get _messages(): Array<SubmitMessageBatchCall_messagesStruct> {
    return this._call.inputValues[0].value.toTupleArray<
      SubmitMessageBatchCall_messagesStruct
    >();
  }

  get _encPubKeys(): Array<SubmitMessageBatchCall_encPubKeysStruct> {
    return this._call.inputValues[1].value.toTupleArray<
      SubmitMessageBatchCall_encPubKeysStruct
    >();
  }
}

export class SubmitMessageBatchCall__Outputs {
  _call: SubmitMessageBatchCall;

  constructor(call: SubmitMessageBatchCall) {
    this._call = call;
  }
}

export class SubmitMessageBatchCall_messagesStruct extends ethereum.Tuple {
  get iv(): BigInt {
    return this[0].toBigInt();
  }

  get data(): Array<BigInt> {
    return this[1].toBigIntArray();
  }
}

export class SubmitMessageBatchCall_encPubKeysStruct extends ethereum.Tuple {
  get x(): BigInt {
    return this[0].toBigInt();
  }

  get y(): BigInt {
    return this[1].toBigInt();
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawContributionCall extends ethereum.Call {
  get inputs(): WithdrawContributionCall__Inputs {
    return new WithdrawContributionCall__Inputs(this);
  }

  get outputs(): WithdrawContributionCall__Outputs {
    return new WithdrawContributionCall__Outputs(this);
  }
}

export class WithdrawContributionCall__Inputs {
  _call: WithdrawContributionCall;

  constructor(call: WithdrawContributionCall) {
    this._call = call;
  }

  get _contributors(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class WithdrawContributionCall__Outputs {
  _call: WithdrawContributionCall;

  constructor(call: WithdrawContributionCall) {
    this._call = call;
  }
}
