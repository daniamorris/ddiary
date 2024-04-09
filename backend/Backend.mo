import Map "mo:base/HashMap";
import Types "./Types";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import CKBTC "mo:ckbtc-types";
import D "mo:base/Debug";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
// import Buffer "mo:base/Buffer";

actor class Backend() {

  //ckBTC
    // CKBTC "mo:ckbtc-types"; is not actually up to date need to import locally actual working ICRC2 for both minter and ledger
    // ckTESTBTC Minter - ml52i-qqaaa-aaaar-qaaba-cai
    // ckTESTBTC Ledger - mc6ru-gyaaa-aaaar-qaaaq-cai
    // ckTESTBTC Index - mm444-5iaaa-aaaar-qaabq-cai
    // ckTESTBTC Archive - m62lf-ryaaa-aaaar-qaacq-cai
    // using the test canisters
    let ckbtcMinter = actor("ml52i-qqaaa-aaaar-qaaba-cai") : CKBTC.Minter.Service;
    let ckbtcLedger = actor("mc6ru-gyaaa-aaaar-qaaaq-cai") : CKBTC.Ledger.Service;
    let ckbtcIndex = actor("mm444-5iaaa-aaaar-qaabq-cai") : CKBTC.Index.Service;
    let ckbtcArchive = actor("m62lf-ryaaa-aaaar-qaacq-cai") : CKBTC.Archive.Service;

    // these are the live cansiters
    // let ckbtcMinter = actor("mqygn-kiaaa-aaaar-qaadq-cai") : CKBTC.Minter.Service;
    // let ckbtcLedger = actor("mxzaz-hqaaa-aaaar-qaada-cai") : CKBTC.Ledger.Service;
    // let ckbtcIndex = actor("n5wcd-faaaa-aaaar-qaaea-cai") : CKBTC.Index.Service;
    // let ckbtcArchive = actor("nbsys-saaaa-aaaar-qaaga-cai") : CKBTC.Archive.Service;

    // public shared (msg) func getckBTCAddress(owner: ?Principal, subaccount: ?[Nat8]) : async Text {
      // this call works on the live cansiter but errors out in local dev
    public shared (msg) func getckBTCAddress() : async Text {
      D.print("here getting the ckBTC address");
      var baddy = await ckbtcMinter.get_btc_address({ owner = ?msg.caller; subaccount = null });
      D.print(debug_show(baddy));
      baddy
    };

    // https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc/minter
    // send some BTC to the address needs a function to minter update_balance when BTC is sent
    // minter update_balance "(record {subaccount=null;})"
    // update_balance: (record {owner:opt principal; subaccount:opt vec nat8}) → (variant {Ok:vec variant {ValueTooSmall:record {height:nat32; value:nat64; outpoint:record {txid:vec nat8; vout:nat32}}; Tainted:record {height:nat32; value:nat64; outpoint:record {txid:vec nat8; vout:nat32}}; Minted:record {minted_amount:nat64; block_index:nat64; utxo:record {height:nat32; value:nat64; outpoint:record {txid:vec nat8; vout:nat32}}}; Checked:record {height:nat32; value:nat64; outpoint:record {txid:vec nat8; vout:nat32}}}; Err:variant {GenericError:record {error_message:text; error_code:nat64}; TemporarilyUnavailable:text; AlreadyProcessing; NoNewUtxos:record {required_confirmations:nat32; pending_utxos:opt vec record {confirmations:nat32; value:nat64; outpoint:record {txid:vec nat8; vout:nat32}}; current_confirmations:opt nat32}}}) 

    // transfer some ckBTC to your wallet or someone else:
    // ledger icrc1_transfer "(record { to = record { owner = principal "PRINCIPAL" }; amount = AMOUNT; })"

    //ckBTC to BTC
    // ledger icrc2_approve "(record {spender=record{owner=principal \"mqygn-kiaaa-aaaar-qaadq-cai\"}; amount=AMOUNT})"
    // minter retrieve_btc_with_approval "(record {address=\"BTC_ADDRESS\"; amount=AMOUNT;})"
    // retrieve_btc_with_approval: (record {from_subaccount:opt vec nat8; address:text; amount:nat64}) → (variant {Ok:record {block_index:nat64}; Err:variant {MalformedAddress:text; GenericError:record {error_message:text; error_code:nat64}; TemporarilyUnavailable:text; InsufficientAllowance:record {allowance:nat64}; AlreadyProcessing; AmountTooLow:nat64; InsufficientFunds:record {balance:nat64}}}) 
    //amount that you transferred minus the transfer fee of 0.0000001 ckBTC (the equivalent of 10 Satoshi).

    //view status with block retrieved during the retrieve_btc
    // minter retrieve_btc_status "(record { block_index = BLOCK_INDEX; })"

    // public shared (msg) func updateBalance() : async Result.Result<Nat, Text> {
      // need useful returns on all the calls
    public shared (msg) func updateBalance() : async Text {
      var upbal = await ckbtcMinter.update_balance({ owner = ?msg.caller; subaccount = null });
      var myresponse = "Updated the balance";
      myresponse
    };
    
    // public type Account__2 = {
    //   owner : Principal;
    //   subaccount : ?Blob;
    // };

    // public type TransferArgs = {
    //   amount : Nat;
    //   created_at_time : ?Nat64;
    //   fee : ?Nat;
    //   from_subaccount : ?[Nat8];
    //   memo : ?[Nat8];
    //   to : Account__2
    // };

    public shared (msg) func transferckBTC(to: Principal, amount : Nat) : async Text {
      // var upbal = await ckbtcLedger.icrc1_transfer({to = record {owner = to;}; amount = amount});
      var myresponse = "transferred ckBTC";
      myresponse
    };

    // ledger icrc2_approve "(record {spender=record{owner=principal \"mqygn-kiaaa-aaaar-qaadq-cai\"}; amount=AMOUNT})"
    public shared (msg) func icrc2Approve(spender: Principal, amount : Nat) : async Text {
      // icrc2_approve: (record {fee:opt nat; memo:opt vec nat8; from_subaccount:opt vec nat8; created_at_time:opt nat64; amount:nat; expected_allowance:opt nat; expires_at:opt nat64; spender:record {owner:principal; subaccount:opt vec nat8}}) → (variant {Ok:nat; Err:variant {GenericError:record {message:text; error_code:nat}; TemporarilyUnavailable; Duplicate:record {duplicate_of:nat}; BadFee:record {expected_fee:nat}; AllowanceChanged:record {current_allowance:nat}; CreatedInFuture:record {ledger_time:nat64}; TooOld; Expired:record {ledger_time:nat64}; InsufficientFunds:record {balance:nat}}}) 
      // var upbal = await ckbtcLedger.icrc2_approve({spender = record {owner = spender;}; amount = amount});
      var myresponse = "aprove transfer to BTC";
      myresponse
    };
    
    // minter retrieve_btc_with_approval "(record {address=\"BTC_ADDRESS\"; amount=AMOUNT;})"
    public shared (msg) func retrieveBTC(address: Text, amount : Nat64) : async Text {
      // retrieve_btc_with_approval: (record {from_subaccount:opt vec nat8; address:text; amount:nat64}) → (variant {Ok:record {block_index:nat64}; Err:variant {MalformedAddress:text; GenericError:record {error_message:text; error_code:nat64}; TemporarilyUnavailable:text; InsufficientAllowance:record {allowance:nat64}; AlreadyProcessing; AmountTooLow:nat64; InsufficientFunds:record {balance:nat64}}}) 
    //  record {from_subaccount:opt vec nat8; address:text; amount:nat64}
      // var upbal = await ckbtcMinter.retrieve_btc_with_approval({address = address; amount = amount});
      var myresponse = "retrieve transfer to BTC";
      myresponse
    };
    
    //view status with block retrieved during the retrieve_btc
    // minter retrieve_btc_status "(record { block_index = BLOCK_INDEX; })"
    public shared (msg) func retrieveBTCstatus(block_index: Nat64) : async Text {
      var statusBTC = await ckbtcMinter.retrieve_btc_status({block_index = block_index;});
      var myresponse = "status report";
      myresponse
    };
    
    public shared (msg) func getDepositeFee() : async Nat64 {
      var depo = await ckbtcMinter.get_deposit_fee();
      D.print(debug_show(depo));
      depo
    };

  //Profile CRUD
    var profiles = Map.HashMap<Text, Types.Profile>(5, Text.equal, Text.hash);
    var principalProfiles = Map.HashMap<Text, Principal>(5, Text.equal, Text.hash);
    var journals = Map.HashMap<Text, Types.Journal>(5, Text.equal, Text.hash);
    var entries = Map.HashMap<Text, Types.Entry>(5, Text.equal, Text.hash);
    var prompts = Map.HashMap<Text, Types.Prompt>(5, Text.equal, Text.hash);
    var emailList = Map.HashMap<Text, Types.Elist>(5, Text.equal, Text.hash);
    // let buffer = Buffer.Buffer<Nat>(3); // Creates a new Buffer
    
    stable var profileIdCount: Nat = 0;
    // var profileIdCount: Nat = 0;
    stable var entryIdCount: Nat = 0;
    //var entryIdCount: Nat = 0;
    stable var promptIdCount: Nat = 0;
    //var promptIdCount: Nat = 0;
    stable var elistCount: Nat = 0;

    public query func hasProfile (proPrinc: Principal) : async Text {
      // var pairs = "";
      var keys = "";
      for ((key, value) in principalProfiles.entries()) {
        if (value != proPrinc){
          //do nothings
        } else {
        keys := key # keys;
        }
      };
      return keys;
    };

    public query func listProfiles() : async Text {
      var pairs = "";
      for ((key, value) in principalProfiles.entries()) {
        pairs := "(" # key # ", " # Principal.toText(value) # ") " # pairs
      };
      pairs
    };
    
    public query func listProfilIds() : async Text {
      var myprofileIds = "";
      for ((key, value) in principalProfiles.entries()) {
        myprofileIds := "{id: " # key # ", pid: "  # key # "}," # myprofileIds
      };
      myprofileIds
    };

    public func createProfile (profile : Types.Profile) : async Text {
      let id: Nat = profileIdCount;
      let stringId: Text = Nat.toText(profileIdCount);
      profileIdCount+=1;
      profiles.put(stringId, profile);
      principalProfiles.put(stringId, profile.userPrincipal);
      let now = Time.now();

      let totals : Types.Totals = {
			jid = stringId;
			entries = 0;
			tckBTC = 0;
			tckETH = 0;
			ticp = 0;
			tdear = 0
      	};
  	
		let journal : Types.Journal = {
        start = Int.toText(now);
        tots = totals;
      	};
      journals.put(stringId, journal);
      stringId;
    };

    public query func readProfile (stringId : Text) : async ?Types.Profile {
      let profileResult : ?Types.Profile = profiles.get(stringId);
      profileResult;
    };

    public func updateProfile (stringId : Text, profile : Types.Profile) : async () {
      let profileResult : ?Types.Profile = profiles.get(stringId);
          let updatedProfile : Types.Profile = {
            userPrincipal = profile.userPrincipal;
			alias = profile.alias;
			//addy = profileResult.addy;
          };

        profiles.put(stringId, updatedProfile);
    };

    public func deleteProfile (stringId : Text) : async ?Types.Profile {
      let profileResult : ?Types.Profile = profiles.get(stringId);
      profiles.remove(stringId);
    };  

	//Entry CRUD

    public func createEntry (entry : Types.Entry) : async Text {
      let id: Nat = entryIdCount;
      let stringId: Text = Nat.toText(entryIdCount);
      entryIdCount+=1;
      entries.put(stringId, entry);
      stringId;
    };

    public query func readEntry (stringId : Text) : async ?Types.Entry {
      let entryResult : ?Types.Entry = entries.get(stringId);
      entryResult;
    };

    public func updateEntry (stringId : Text, entry : Types.Entry) : async () {
      let entryResult : ?Types.Entry = entries.get(stringId);
          let updatedEntry : Types.Entry = {
			jid = entry.jid;
			title = entry.title;
			content = entry.content;
			//engaged = entry.engaged;
			time = entry.time;
          };

        entries.put(stringId, updatedEntry);
    };

    public func deleteEntry (stringId : Text) : async ?Types.Entry {
      let entryResult : ?Types.Entry = entries.get(stringId);
      entries.remove(stringId);
    }; 

    public func get_numbers(a: [Nat]) : async [Nat] {
      let a2 : [Nat] = [0, 1, 2, 3];
      return a2;
    };

    public func listEntries () : async [(Text, Types.Entry)] {
      let entryRes = Iter.toArray<(Text, Types.Entry)>(entries.entries());
      entryRes
    };
    
    // public func listEntriesByProfile (profileID: Text) : async [(Text, Types.Entry)] {
    //   let entryRes = Iter.toArray<(Text, Types.Entry)>(entries.entries());
    //   let map2 =
    //     Map.HashMap.mapFilter<Text, Types.Entry>(
    //       entries,
    //       Text.equal,
    //       Text.hash,
    //       func (k, v) = if (v != profileID) { null } else { ?(v)}
    //   );
    //   map2
    // };

	//Prompt CRUD

    public func createPrompt (prompt : Types.Prompt) : async Text {
      let id: Nat = promptIdCount;
      let stringId: Text = Nat.toText(promptIdCount);
      promptIdCount+=1;
      prompts.put(stringId, prompt);
      stringId;
    };

    public query func readPrompt (stringId : Text) : async ?Types.Prompt {
      let promptResult : ?Types.Prompt = prompts.get(stringId);
      promptResult;
    };

    public func updatePrompt (stringId : Text, prompt : Types.Prompt) : async () {
      let promptResult : ?Types.Prompt = prompts.get(stringId);
          let updatedPrompt : Types.Prompt = {
			title = prompt.title;
			content = prompt.content;
			date = prompt.date;
          };

        prompts.put(stringId, updatedPrompt);
    };

    public func deletePrompt (stringId : Text) : async ?Types.Prompt {
      let promptResult : ?Types.Prompt = prompts.get(stringId);
      prompts.remove(stringId);
    }; 

	//Elist CR
    public func betaList (blist : Types.Elist) : async Text {
      let id: Nat = elistCount;
      let stringId: Text = Nat.toText(elistCount);
      elistCount+=1;
      emailList.put(stringId, blist);      
      (stringId);
    };

    public query func readBetaList (stringId : Text) : async ?Types.Elist {
      let elistResult : ?Types.Elist = emailList.get(stringId);
      elistResult;
    };
  
  //Default Counter
    stable var counter = 0;

    // Get the current count
    public query func get() : async Nat {
      counter;
    };

    // Increment the count by one
    public func inc() : async () {
      counter += 1;
    };

    // Add `n` to the current count
    public func add(n : Nat) : async () {
      counter += n;
    };

  //Default whoami
    public shared query (msg) func whoami() : async Principal {
      msg.caller
    };
  
};
