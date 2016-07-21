require('./definitions.js');

// Question 1
var f_max_in_khz = 5;
var f_sample_in_khz = 11;
var pulse_width_in_micro_second = 69.1;

var f_sample2_in_khz = 15;
var pulse_width2_in_micro_second = 20;

var f_sample3_in_khz = 15;
var pulse_width3_in_micro_second = 50;

// Question 2
var signal_bandwith_in_khz = 29;
var voltage_max = 24;
var word_bits = 22;
var nyquist_times = 2;

var max_quantization_in_mv = 7;

/*// Question 3
var video_signal_bandwith_in_Mhz = 4.8;
var minimal_snr_in_db = 57;
var average_snr_in_db = 46.6;

var error_probability_given = 11 * Math.pow(10, -6);
var degradation_in_db = 9;*/


var t_sample = 1 / (f_sample_in_khz * kilo);
var duty_cycle = (pulse_width_in_micro_second * micro) / t_sample;

var c1 = duty_cycle * ((Math.sin(1 * Math.PI * duty_cycle)) / (1 * Math.PI * duty_cycle));
var c2 = duty_cycle * ((Math.sin(2 * Math.PI * duty_cycle)) / (2 * Math.PI * duty_cycle));
var c3 = duty_cycle * ((Math.sin(3 * Math.PI * duty_cycle)) / (3 * Math.PI * duty_cycle));

console.log(`1.a) c1 = ${c1 / milli} * 10^-3`);
console.log(`1.a) c2 = ${c2 / milli} * 10^-3`);
console.log(`1.a) c3 = ${c3 / milli} * 10^-3`);

var t_sample2 = 1 / (f_sample2_in_khz * kilo);
var duty_cycle2 = (pulse_width2_in_micro_second * micro) / t_sample2;

var c1_2 = duty_cycle2 * ((Math.sin(1 * Math.PI * duty_cycle2)) / (1 * Math.PI * duty_cycle2));
var c2_2 = duty_cycle2 * ((Math.sin(2 * Math.PI * duty_cycle2)) / (2 * Math.PI * duty_cycle2));
// var c3_2 = duty_cycle2 * ((Math.sin(3 * Math.PI * duty_cycle2)) / (3 * Math.PI * duty_cycle2));

console.log('');
console.log(`1.b) c1_2 = ${c1_2 / milli} * 10^-3`);
console.log(`1.b) c2_2 = ${c2_2 / milli} * 10^-3`);
// console.log(`1.b) c3_2 = ${c3_2 / milli} * 10^-3`);

console.log(`1.b) base signal -${f_max_in_khz} kHz until ${f_max_in_khz} kHz `);
console.log(`1.b) peak1 = +/- ${f_sample2_in_khz} kHz`);
console.log(`1.b) peak2 = +/- ${f_sample2_in_khz * 2} kHz`);

var t_sample3 = 1 / (f_sample3_in_khz * kilo);
var duty_cycle3 = (pulse_width3_in_micro_second * micro) / t_sample3;

var c1_3 = duty_cycle3 * ((Math.sin(1 * Math.PI * duty_cycle3)) / (1 * Math.PI * duty_cycle3));
var c2_3 = duty_cycle3 * ((Math.sin(2 * Math.PI * duty_cycle3)) / (2 * Math.PI * duty_cycle3));
// var c3_3 = duty_cycle3 * ((Math.sin(3 * Math.PI * duty_cycle3)) / (3 * Math.PI * duty_cycle3));

console.log('');
console.log(`1.c) c1_3 = ${c1_3 / milli} * 10^-3`);
console.log(`1.c) c2_3 = ${c2_3 / milli} * 10^-3`);
// console.log(`1.c) c3_3 = ${c3_3 / milli} * 10^-3`);

console.log(`1.c) base signal -${f_max_in_khz} kHz until ${f_max_in_khz} kHz `);
console.log(`1.c) peak1 = +/- ${f_sample3_in_khz} kHz`);
console.log(`1.c) peak2 = +/- ${f_sample3_in_khz * 2} kHz`);

console.log('');

var sample_frequency = signal_bandwith_in_khz * nyquist_times * 2 * kilo;
console.log(`2.a) ${sample_frequency / kilo} kHz`);
var bitrate = sample_frequency * word_bits;
console.log(`2.b) ${bitrate / kilo} kbit/s`);
var required_bits = Math.log2((voltage_max * 2) / (2 * max_quantization_in_mv * milli));
console.log(`2.c) ${required_bits | 0} bits`);

console.log('');

/*var min_sample_frequency = video_signal_bandwith_in_Mhz * 2 * mega;
console.log(`3.a) ${min_sample_frequency / mega} MHz`);
var video_bits = Math.ceil(
	Math.log2(Math.sqrt(fromdb(minimal_snr_in_db) / 3))
);
var video_bitrate = video_bits * min_sample_frequency;
console.log(`3.b) ${video_bits} bits`);
console.log(`3.b) ${video_bitrate / mega} Mbit/s`);

var max = Math.pow(2, video_bits);
var average_snr = fromdb(average_snr_in_db);
var error_probability = 
(max*max - average_snr) /
(4* (max*max - 1) * average_snr); 

console.log(`3.c) ${error_probability / Math.pow(10, -7)} 10^-7 `);

var max_possible_snr = 
(3 * max * max) /
(1 + (4 * error_probability_given * max * max));

console.log(`3.d) ${todb(max_possible_snr)} dB`);

var new_max_snr = fromdb(todb(max_possible_snr) - degradation_in_db);

/*
Rewriting snr = (3 * M^2) / (1 + 4 * (M^2 - 1) * Pe)
Results in
n = Log2(sqrt(
	(4 * snr * Pe * (1/3) - snr / 3)
		/
	(4 * snr * Pe * (1/3) - 1)
))

i take x = 4 * snr * Pe * (1/3)
which makes
n = Log2(sqrt(
	(x - snr / 3)
		/
	(x- 1)
))
*
var x = 4 * new_max_snr * error_probability_given * (1/3);
var new_video_bits = Math.ceil(Math.log2(Math.sqrt(
	(x - new_max_snr / 3) /
	(x - 1)
)));

console.log(`3.d) ${new_video_bits} bits`);*/