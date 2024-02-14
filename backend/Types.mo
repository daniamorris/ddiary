import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";

//needs Date and Timestamp import correct types Motoko

module {

	public type Profile = {
		userPrincipal: Principal;
		alias: Text;
		//addy: Addys;
	};

	public type Addys = {
		ckBTC: Text;
		ckETH: Text;
		icp: Text;
		dear: Text
	};
	
	public type Journal = {
		start: Text;
		tots: Totals
	};
	
	public type Totals = {
		jid: Text;
		entries: Nat;
		tckBTC: Nat;
		tckETH: Nat;
		ticp: Nat;
		tdear: Nat
	};
	
	public type Entry = {
		jid: Text;
		title: Text;
		content: Text;
		//engaged: Feedback;
		time: Int
	};
	
	public type Feedback = {
		like: Nat;
		tip: Nat;
		fav: Nat;
		save: Nat;
		share: Nat
	};
	
	public type Prompt = {
		title: Text;
		content: Text;
		date: Text
	};
	
    public type Elist = {
      name: Text;
      email: Text;
    };

	type Time = Int;
    
};
