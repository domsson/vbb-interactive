var stations = {
	// S41
	"We": {
		name: "Wedding",
		pos: {x:121, y:38}
	},
	"GB": {
		name: "Gesundbrunnen",
		pos: {x:149, y:38}
	},
	"SAL": {
		name: "Schönhauser Allee",
		pos: {x:173, y:38}
	},
	"PLA": {
		name: "Prenzlauer Allee",
		pos: {x:200, y:38}
	},
	"GSS": {
		name: "Greifswalder Straße",
		pos: {x:213, y:42}
	},
	"LST": {
		name: "Landsberger Allee",
		pos: {x:226, y:61}
	},
	"STO": {
		name: "Storkower Straße",
		pos: {x:226, y:73}
	},
	"FAL": {
		name: "Frankfurter Allee",
		pos: {x:226, y:83}
	},
	"OK": {
		name: "Ostkreuz",
		pos: {x:226, y:92}
	},
	"TP": {
		name: "Treptower Park",
		pos: {x:226, y:108}
	},
	"SO": {
		name: "Sonnenallee",
		pos: {x:213, y:124}
	},
	"NK": {
		name: "Neukölln",
		pos: {x:200, y:130}
	},
	"HER": {
		name: "Hermannstraße",
		pos: {x:185, y:130}
	},
	"TF": {
		name: "Tempelhof",
		pos: {x:154, y:130}
	},
	"SK": {
		name: "Südkreuz",
		pos: {x:136, y:130}
	},
	"SG": {
		name: "Schöneberg",
		pos: {x:117, y:130}
	},
	"HEI": {
		name: "Heidelberger Platz",
		pos: {x:68, y:130}
	},
	"HO": {
		name: "Hohenzollerndamm",
		pos: {x:57, y:119}
	},
	"HAL": {
		name: "Halensee",
		pos: {x:54, y:99}
	},
	"WKR": {
		name: "Westkreuz",
		pos: {x:54, y:88}
	},
	"MN": {
		name: "Messe Nord/ICC (Witzleben)",
		pos: {x:54, y:79}
	},
	"WES": {
		name: "Westend",
		pos: {x:54, y:62}
	},
	"JUN": {
		name: "Jungfernheide",
		pos: {x:66, y:42}
	},
	"BEU": {
		name: "Beusselstraße",
		pos: {x:88, y:38}
	},
	// U1
	"WA": {
		name: "Warschauer Straße",
		pos: {x:200, y:90}
	},
	"S": {
		name: "Schlesisches Tor",
		pos: {x:195, y:95}
	},
	"Gr": {
		name: "Görlitzer Bahnhof",
		pos: {x:190, y:97}
	},
	"Kbo": {
		name: "Kottbusser Tor",
		pos: {x:185, y:97}
	},
	"Pr": {
		name: "Prinzenstraße",
		pos: {x:167, y:97}
	},
	"Ho": {
		name: "Hallesches Tor",
		pos: {x:154 , y:97}
	},
	"Mo": {
		name: "Möckernbrücke",
		pos: {x:143, y:97}
	},
	"Go": {
		name: "Gleisdreieck",
		pos: {x:126, y:97}
	},
	"Kus": {
		name: "Kurfürstenstraße",
		pos: {x:120, y:97}
	},
	"Nu": {
		name: "Nollendorfplatz",
		pos: {x:115, y:97}
	},
	"Wt": {
		name: "Wittenbergplatz",
		pos: {x:106, y:97}
	},
	"Kfu": {
		name: "Kurfürstendamm",
		pos: {x:90, y:97}
	},
	"U": {
		name: "Uhlandstraße",
		pos: {x:84, y:97}
	},
	// U3
	"Au": {
		name: "Augsburger Straße",
		pos: {x:95, y:104}
	},
	"Hz": {
		name: "Hohenzollernplatz",
		pos: {x:85, y:114}
	},
	"Fpo": {
		name: "Fehrbelliner Platz",
		pos: {x:81, y:118}
	},
	"Rd": {
		name: "Rüdesheimer Platz",
		pos: {x:64, y:135}
	},
	"Bt": {
		name: "Breitenbachplatz",
		pos: {x:61, y:138}
	},
	"Po": {
		name: "Podbielskiallee",
		pos: {x:57, y:142}
	},
	"Dd": {
		name: "Dahlem-Dorf",
		pos: {x:53, y:146}
	},
	"T": {
		name: "Thielplatz",
		pos: {x:49, y:150}
	},
	"Os": {
		name: "Oskar-Helene-Heim",
		pos: {x:45, y:154}
	},
	"Oth": {
		name: "Onkel Toms Hütte",
		pos: {x:41, y:158}
	},
	"K": {
		name: "Krumme Lanke",
		pos: {x:38, y:161}
	},
	// U4
	"V": {
		name: "Viktoria-Luise-Platz",
		pos: {x:108, y:110}
	},
	"Bpo": {
		name: "Bayerischer Platz",
		pos: {x:108, y:120}
	},
	"RS": {
		name: "Rathaus Schöneberg",
		pos: {x:108, y:124}
	},
	"Ipo": {
		name: "Innsbrucker Platz",
		pos: {x:108, y:130}
	},
	// U9
	"Olo": {
		name: "Osloer Straße",
		pos: {x:126, y:14}
	},
	"Np": {
		name: "Nauener Platz",
		pos: {x:119, y:22}
	},
	"Lpu": {
		name: "Leopoldplatz",
		pos: {x:111, y:28}
	},
	"Am": {
		name: "Amrumer Straße",
		pos: {x:109, y:31}
	},
	"WF": {
		name: "Westhafen",
		pos: {x:105, y:38}
	},
	"Bi": {
		name: "Birkenstraße",
		pos: {x:105, y:46}
	},
	"Tm": {
		mame: "Turmstraße",
		pos: {x:105, y:56}
	},
	"Ha": {
		name: "Hansaplatz",
		pos: {x:104, y:78}
	},
	"Zu": {
		name: "Zoologischer Garten",
		pos: {x:92, y:88}
	},
	"Snu": {
		name: "Spichernstraße",
		pos: {x:90, y:109}
	},
	"Gt": {
		name: "Güntzelstraße",
		pos: {x:90, y:114}
	},
	"Beo": {
		name: "Berliner Straße",
		pos: {x:90, y:119}
	},
	"Bd": {
		name: "Bundesplatz",
		pos: {x:90, y:130}
	},
	"Fw": {
		name: "Friedrich-Wilhelm-Platz",
		pos: {x:90, y:138}
	},
	"Wsg": {
		name: "Walther-Schreiber-Platz",
		pos: {x:90, y:144}
	},
	"Slu": {
		name: "Schloßstraße",
		pos: {x:90, y:150}
	},
	"Rzu": {
		name: "Rathaus Steglitz",
		pos: {x:90, y:158}
	}
};
