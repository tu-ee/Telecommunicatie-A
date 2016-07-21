// Question 1
var frequency_in_ghz = 578;
var distance_in_km = 36000;
var power_eirp_in_dbw = 39;

var ground_effective_surface_in_m2 = 10;
var ground_noise_temperature = 120;

var cable_length_in_m = 6.6;
var cable_dampening_in_db_m = 1.5;

var amp_amplification = 160;
var amp_noise_factor = 3.5;

var receiver_amplification_in_db = 20;
var receiver_noise_factor_in_db = 10;
var receiver_equivalent_noise_bandwith_in_mhz = 1.5;

// Question 2
var k1 = 11; 
var k2 = 5; 
var k3 = 3.5; 

var Rimd = 50;

var thd_in_percent = 2;

require('./definitions.js');

var wavelength = lightspeed  / (frequency_in_ghz * giga);

var gain_free_space = Math.pow(wavelength / (4 * Math.PI * distance_in_km * kilo), 2);
var gain_free_space_db = todb(gain_free_space);

var ground_surface = ground_effective_surface_in_m2 / 0.56;
var ground_antenna_power_gain = (7.0 * ground_surface) / (wavelength * wavelength);
var ground_antenna_power_gain_db = todb(ground_antenna_power_gain);

var gain_cable_db = -1 * cable_length_in_m * cable_dampening_in_db_m;
var gain_cable = fromdb(gain_cable_db);

var amp_power_gain_db = todb(amp_amplification);

var receiver_amplification = fromdb(receiver_amplification_in_db);

var power_gain_antenna_output_db = power_eirp_in_dbw + 
	gain_free_space_db + 
	ground_antenna_power_gain_db;

var power_gain_antenna_output = fromdb(power_gain_antenna_output_db);

var power_gain_receiver_input_db = power_gain_antenna_output_db + 
	gain_cable_db +
	amp_power_gain_db;

console.log(`1.a) ${power_gain_receiver_input_db + 30} dBm`);


var F_cable = 1 / fromdb(gain_cable_db);
var F_amp = amp_noise_factor;
var F_rx = fromdb(receiver_noise_factor_in_db);

var F_total = F_cable + 
	(F_amp - 1) / (gain_cable) + 
	(F_rx - 1) / (gain_cable * amp_amplification);

var Te = fromf(F_total);
var Tsyst = ground_noise_temperature + Te;
var N0_antenna_output = k * Tsyst;

console.log(`1.b) ${todb(N0_antenna_output / milli)} dBm`);

var noise_output = N0_antenna_output * 
	gain_cable *
	amp_amplification *
	receiver_amplification * 
	receiver_equivalent_noise_bandwith_in_mhz * mega;

console.log(`1.c) ${todb(noise_output / milli)} dBm`);

var snr = power_gain_antenna_output / 
	(N0_antenna_output * receiver_equivalent_noise_bandwith_in_mhz * mega);

console.log(`1.d) ${todb(snr)} dB`);

var F_alternative_setup = F_amp + 
	(F_cable - 1) / (amp_amplification) + 
	(F_rx - 1) / (gain_cable * amp_amplification);
var N0_alternative_setup = k * 
	(ground_noise_temperature + fromf(F_alternative_setup));

var snr_alternative_setup = power_gain_antenna_output / 
	(N0_alternative_setup * receiver_equivalent_noise_bandwith_in_mhz * mega);

console.log(`1.e) ${todb(snr_alternative_setup)} dB`);


console.log(`2.a) 13 componenten`);

// var A = ;
var A = (
		(4 * k1) / (3 * k3)
	) / (2 * Rimd);
console.log(`2.b) ${todb(A / milli)} dBm`);

var thd = thd_in_percent / 100;
var A0 = Math.sqrt(
	(k1 * thd)/
	((1/4) * k3 - ((3/4)*thd*k3))
);

console.log(`2.c) ${A0 / milli} mV`);