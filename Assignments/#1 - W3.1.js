
// Question 1
var interval_in_ms = 3.8;
var possible_messages = 328;
var bandwith_in_hz = 830;

// Question 2
var pico_watt = 129;
var db_watt = 36;
var micro_volt = 572;
var db_micro_watt = 42;
var watt = 347;
var db_nano_volt = 104;

// Question 3
var internal_resistor = 230;
var load_resistor = 60;
var load_voltage = 17.4;
var alternative_load_resistor = 160;


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

var bits = 0;
for(var i = 0; i < 32; i ++) {
	if(Math.pow(2, i) > possible_messages) {
		bits = i;
		break;
	}
}
var bitrate = Math.round(bits / (interval_in_ms / 1000));
var s_n_ratio = Math.pow(2, bitrate / bandwith_in_hz) - 1;

console.log(`No thousand seperators.`);

console.log(`1.a) Bits = ${bits}, maximum = ${Math.pow(2, bits)}`);
console.log(`1.b) kbit/sec = ${bitrate/1000}`);
console.log(`1.c) S/N = ${s_n_ratio}`);
console.log('');

console.log(`2.1) ${pico_watt} pW = ${todb(pico_watt * pico / micro)}dBµW`);
console.log(`2.2) ${db_watt} dBW = ${fromdb(db_watt) / kilo} kW`);
console.log(`2.3) ${micro_volt} µV = ${todb(micro_volt * micro) * 2} dBV`);
console.log(`2.4) ${db_micro_watt} dBµW = ${fromdb(db_micro_watt) * micro / milli} mW `);
console.log(`2.5) ${watt} W = ${todb(watt / milli)} dBm`);
console.log(`2.6) ${db_nano_volt} dBnv = ${fromdb(db_nano_volt / 2) * nano / micro} μV`);
console.log('');

var supplied_current = (load_voltage / load_resistor);
var supplied_voltage = supplied_current * (load_resistor + internal_resistor);
console.log(`3.a) ${todb(supplied_voltage) * 2} dBV`);

var total_current = supplied_voltage / (2 * internal_resistor);
var available_power = total_current * total_current * internal_resistor;
console.log(`3.b) ${todb(available_power)} dBW`);

var current = supplied_voltage / (internal_resistor + alternative_load_resistor);
var alternative_power = current * current * alternative_load_resistor;
console.log(`3.c) ${(alternative_power / available_power) * 100} %`);