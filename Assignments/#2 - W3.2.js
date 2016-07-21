// Question 1
var conductance_in_mh = 410;
var resistance_in_kilo_ohm = 73;

var frequency_in_khz = 210;
var percentage_power_to_resistor = 70;

// Question 2
var amplitude = -2 * 17 * Math.pow(10, -5);
var bounded_db = 32;



// Definitions
var todb = val => 10 * Math.log(val) / Math.log(10);
var fromdb = val => Math.pow(10, val / 10);
var kilo = 1000;			// k
var deci = 0.1; 			// d
var centi = deci / 10; 		// c
var milli = centi / 10; 	// m
var micro = milli / 1000; 	// μ
var nano = micro / 1000; 	// n
var pico = nano / 1000; 	// p

// var db3 = (Math.pow(0.5, -1) - 1) * (resistance_in_kilo_ohm * kilo) / (conductance_in_mh * milli * 2 * Math.PI);

// https://en.wikipedia.org/wiki/RL_circuit
var f_cutoff = (resistance_in_kilo_ohm * kilo) / (2 * Math.PI * conductance_in_mh * milli);
// http://analog.intgckts.com/equivalent-noise-bandwidth/
var equivalent_noise_bandwith = (Math.PI / 2) * f_cutoff;

var angular_speed = 2 * Math.PI * frequency_in_khz * kilo;
var percentage_div_100 = percentage_power_to_resistor / 100;

/*
Beq = f / sqrt(percentage) = pi / 2 * B3db
Why must Beq = f / sqrt(percentage) not clear.
*/
var requested_conductance = 
(
	resistance_in_kilo_ohm * kilo *
	Math.sqrt(percentage_div_100)
) / (4 * frequency_in_khz * kilo);

// console.log(db3);
console.log(`1.a) ${f_cutoff/1000} kHz`);
console.log(`1.b) ${equivalent_noise_bandwith/1000} kHz`);

console.log(`1.c) ${requested_conductance / milli} mH`);

var bounded_spectrum_bandwith = Math.abs(Math.log(1 / fromdb(bounded_db)) / amplitude);
var db3_bandwith = Math.abs(Math.log(1 / fromdb(3)) / amplitude);
// TODO: why 1.44
// var equivalent_bandwith = (1.44 * db3_bandwith);
var equivalent_bandwith = 1 / -amplitude;

var bandwith_99 = Math.abs(Math.log(0.01) / amplitude);

console.log(`2.a) ${bounded_spectrum_bandwith/1000} kHz `);
console.log(`2.b) ${equivalent_bandwith/1000} kHz `);
// console.log(` ${1/-amplitude} `);
console.log(`2.c) ${bandwith_99/1000} kHz `);