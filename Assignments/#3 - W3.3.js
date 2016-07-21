// Question 1
var frequency_antenna_in_ghz = 6.3;
var signal_power_in_mw = 180;
var diameter_antenna_in_m = 1.8;

var distance_in_km = 3.6;

// Question 2
var system_1_frequency_in_ghz = 2.4;
var system_1_diameter_antenna_in_m = 1.4;

var system_2_cable_dampning_in_db_per_km = 15;
var systems_distance_in_km = 3.7;
var systems_sendpower_in_w = 29;

// Question 3
var amplifier_profit_in_db = 20;
var amplifier_noise_number_in_db = 9;
var amplifier_beq_in_mhz = 21;
var resistor_in = 180;
var resistor_temperature = 110;

require('./definitions.js');


var wavelength = lightspeed  / (frequency_antenna_in_ghz * giga);
var radius_antenna = diameter_antenna_in_m / 2;
// Page 621 Couch 8th edition
var effective_surface_parabola = Math.PI * radius_antenna * radius_antenna / 0.56;
var power_gain_parabola = (7.0 * effective_surface_parabola) / (wavelength * wavelength);
var power_gain_dipole = 1.64;


console.log(`1.a.1) ${todb(power_gain_parabola)} dB`);
console.log(`1.a.2) ${todb(power_gain_dipole)} dB`);

var send_power = signal_power_in_mw * milli * power_gain_parabola;
console.log(`1.b) ${todb(send_power / milli)} dBm`);

var gain_free_space = Math.pow(wavelength / (4 * Math.PI * distance_in_km * kilo), 2);
var receive_power = send_power * gain_free_space * power_gain_dipole;
console.log(`1.c.1) ${todb(receive_power / milli)} dBm`);

var power_gain_parabola_half_size = (7.0 * effective_surface_parabola / 4) / (wavelength * wavelength);
var receive_power_parabola = send_power * gain_free_space * power_gain_parabola_half_size;
console.log(`1.c.2) ${todb(receive_power_parabola / milli)} dBm`);

/*
var effective_surface_parabola = Math.PI * radius_antenna * radius_antenna / 0.56;
var power_gain_parabola = (7.0 * effective_surface_parabola) / (wavelength * wavelength);
*/
var s1_wavelength = lightspeed  / (system_1_frequency_in_ghz * giga);
var s1_radius = system_1_diameter_antenna_in_m / 2;
var s1_effective_surface_parabola = Math.PI * s1_radius * s1_radius / 0.56;
var s1_power_gain_parabola = (7.0 * s1_effective_surface_parabola) / (s1_wavelength * s1_wavelength);
var s1_gain_free_space = Math.pow(s1_wavelength / (4 * Math.PI * systems_distance_in_km * kilo), 2);

var s1_receive_power = systems_sendpower_in_w * s1_power_gain_parabola * s1_gain_free_space * s1_power_gain_parabola;

console.log(`2.a.1) ${todb(s1_receive_power / milli)} dBm`);

var s2_receive_power = systems_sendpower_in_w / (fromdb(system_2_cable_dampning_in_db_per_km * systems_distance_in_km));

console.log(`2.a.2) ${todb(s2_receive_power / milli)} dBm`);

var distance = todb(systems_sendpower_in_w / s1_receive_power) / system_2_cable_dampning_in_db_per_km;
console.log(`2.b) ${distance}`);

console.log(`2.c) Het propagatieverlies in de vrije ruimte neemt kwadratisch met de afstand toe terwijl het verlies in de kabel exponentieel met de afstand toe neemt`);


/*
3360
-162.5
-52.23
*/

// var pao = fromdb(amplifier_noise_number_in_db) * k * t0 * amplifier_beq_in_mhz * mega * fromdb(amplifier_profit_in_db);
var effective_noise_temperature = t0  * (fromdb(amplifier_noise_number_in_db) - 1);
console.log(`3.a) ${effective_noise_temperature} K`);

var resistor_temperature_in_kelvin = resistor_temperature + 273;
var equivalent_noise_dbm_hz = (effective_noise_temperature + resistor_temperature_in_kelvin) * k;
console.log(`3.b) ${todb(equivalent_noise_dbm_hz / milli)} dBm/Hz`);

var output_noise_power = equivalent_noise_dbm_hz * amplifier_beq_in_mhz * mega * fromdb(amplifier_profit_in_db);
console.log(`3.c) ${todb(output_noise_power / milli)}`);