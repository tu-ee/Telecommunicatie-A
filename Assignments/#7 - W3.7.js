// Question 1
var bitrate_in_kbit = 117;
// options: U-NRZ P-NRZ B-RZ U-RZ M-NRZ M-P-NRZ
var code_type = 'U-RZ';
var code_type2 = 'U-NRZ';

// Question 2
var levels = 64;
var roll_off_factor = 0.5;
var x_db = -9;
var x_db_bandwith_in_khz = 30;

// Question 3
var input_decimal = 225;
var input_start = 1;

var output_decimal = 179;
var output_start = 1;



require('./definitions');

/*
	Denpendant on code type:
	Bnull = Bitrate for
		- Unipolar NRZ
		- Polar NRZ
		- Bipolar RZ
	Bnull = 2 * Bitrate for
		- Unipolar RZ
		- Manchester NRZ
	Bnull = bitrate / levels for
		- Multilevel polar NRZ
*/
var Bnull = bitrate_in_kbit * kilo;
if(['U-RZ', 'M-NRZ'].indexOf(code_type) !== -1) {
	Bnull *= 2;
}
console.log(`1.a) ${Bnull/kilo} kHz`);

/*    
	* A :  beperkt beschikbaar vermogen           
	* B :  onbeperkt beschikbaar vermogen    
	* C :  beschikbare bandbreedte beperkt    
	* D :  beschikbare bandbreedte onbeperkt    
	* E :  lage frequenties van het kanaal worden sterk vervormd    
	* F :  klok terugwinning uit het ontvangen signaal dient eenvoudig te zijn.
*/
var choices = null;
switch(code_type2) {
	case 'U-NRZ': 
		choices = ['B', 'C', 'D']; // Checked
		break;
	case 'P-NRZ': 
		choices = ['A', 'B', 'C', 'D'];
		break;
	case 'U-RZ': 
		choices = ['B', 'D', 'F'];
		break;
	case 'B-RZ': 
		choices = ['B', 'C','D', 'E']; // F?, kan wel maar heeft problemen.
		break;
	case 'M-NRZ': 
		choices = ['A','B','D','E']; // Checked
		break;
	default:
		choices = ['Invalid'];
}
console.log(`1.b) ${choices.join('-')} `);

console.log('');

var bits = Math.log2(levels);

var x_db_bandwith = x_db_bandwith_in_khz * kilo;

var x = Math.acos(Math.sqrt(fromdb(x_db) * 4) - 1);
var f0 = (Math.PI * x_db_bandwith) / (x * roll_off_factor * 2+ Math.PI * (1 - roll_off_factor));

// var f0 = 
// 	(x_db_bandwith * Math.PI) /
// 	(
// 		(Math.acos(2 * fromdb(x_db) - 1) * 2 * roll_off_factor) +
// 		(Math.PI * (1 - roll_off_factor))
// 	);


var Babs = (1 + roll_off_factor) * f0;

console.log(`2.a) ${Babs / kilo} kHz`);

var max_baud = 2 * Babs / (1 + roll_off_factor);

console.log(`2.b) ${max_baud / kilo} kbaud`);

var bit_rate = max_baud * bits;

console.log(`2.c) ${bit_rate/kilo} kbit/s`);

console.log('');

var pad = (s, cnt) => {
	while(s.length < cnt) {
		s = '0' + s;
	}
	return s;
};

var input_bits = pad(input_decimal.toString(2), 8);

var i, prev = input_start, cur, res;
var output = '';
for(var i = input_bits.length - 1; i >= 0; i -= 1) {
	cur = parseInt(input_bits[i], 10);
	res = prev ^ cur;
	prev = res;
	output = ('' + res) + output;
}

// console.log(input_bits);
// console.log(output);
console.log(`3.a) ${parseInt(output, 2)}`);

prev = output_start;
input_bits = pad(output_decimal.toString(2), 8);
output = '';
for(i = input_bits.length - 1; i >= 0; i -= 1) {
	cur = parseInt(input_bits[i], 10);
	res = prev ^ cur;
	prev = cur;
	output = ('' + res) + output;
}

console.log(`3.b) ${parseInt(output, 2)}`);
