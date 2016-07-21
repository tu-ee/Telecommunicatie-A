
// Question 1
var pico_watt = 120;
var db_watt = 54;
var micro_volt = 270;
var db_micro_watt = 36;
var watt = 1.5;
var db_nano_volt = 87;

// Question 2
var possible_characters = 110;
var bandwith_in_khz = 3.2;
var s_n_ration_in_db = 20;

// Question 3
var internal_resistor = 75;
var load_resistor = 50;
var power_delivery_in_dbm = -10;
var alternative_load_resistor = 150;

// Question 4
var amplitude = - 0.5 * 1 * Math.pow(10, -4);
var bounded_db = 30;

require('./definitions.js');

console.log(`1.a) ${pico_watt} pW = ${todb(pico_watt * pico / micro)} dBµW`);
console.log(`1.b) ${db_watt} dBW = ${fromdb(db_watt) / kilo} kW`);
console.log(`1.c) ${micro_volt} µV = ${todb(micro_volt * micro) * 2} dBV`);
console.log(`1.d) ${db_micro_watt} dBµW = ${fromdb(db_micro_watt) * micro / milli} mW `);
console.log(`1.e) ${watt} W = ${todb(watt / milli)} dBm`);
console.log(`1.f) ${db_nano_volt} dBnv = ${fromdb(db_nano_volt / 2) * nano / micro} μV`);

console.log('');

var bits = Math.ceil(Math.log2(possible_characters));
var bitrate = Math.log2(fromdb(s_n_ration_in_db) + 1) * bandwith_in_khz * kilo;

var chance_character = 1 / possible_characters;
// Efficient form: Entropy = Math.log2(possible_characters);
var Entropy = possible_characters * chance_character * Math.log2(1/chance_character);

console.log(`2.a) Bits = ${bits}, maximum = ${Math.pow(2, bits)}`);
console.log(`2.b) characters/sec = ${bitrate/bits}`);
console.log(`2.c) Entropy = ${Entropy}`);

console.log('');

var supplied_current = Math.sqrt(fromdb(power_delivery_in_dbm - 30) / load_resistor);
var supplied_voltage = supplied_current * (load_resistor + internal_resistor);
console.log(`3.a) ${todb(supplied_voltage) * 2} dBV`);

var total_current = supplied_voltage / (2 * internal_resistor);
var available_power = total_current * total_current * internal_resistor;
console.log(`3.b) ${todb(available_power)} dBW`);

var current = supplied_voltage / (internal_resistor + alternative_load_resistor);
var alternative_power = current * current * alternative_load_resistor;
console.log(`3.c) ${(alternative_power / available_power) * 100} %`);

console.log('');


var bounded_spectrum_bandwith = Math.abs(Math.log(1 / fromdb(bounded_db)) / amplitude);
var db3_bandwith = Math.abs(Math.log(1 / fromdb(3)) / amplitude);
var equivalent_bandwith = 1 / -amplitude;
var bandwith_99 = Math.abs(Math.log(0.01) / amplitude);

console.log(`4.a) ${bounded_spectrum_bandwith/1000} kHz `);
console.log(`4.b) ${equivalent_bandwith/1000} kHz `);
console.log(`4.c) ${bandwith_99/1000} kHz `);