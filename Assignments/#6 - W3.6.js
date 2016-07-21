require('./definitions.js');

// Question 1
var video_signal_bandwith_in_Mhz = 6.5;
var minimal_snr_in_db = 65;

var average_snr_in_db = 58.5;

var error_probability_given = 34 * Math.pow(10, -6);
var degradation_in_db = 8;

// Question 2
var signal_frequency_in_khz = 10;
var peak_peak_voltage = 3.3;
var nyquist_times = 20;

var receiver_bandwith_in_khz = 28;


var min_sample_frequency = video_signal_bandwith_in_Mhz * 2 * mega;
console.log(`1.a) ${min_sample_frequency / mega} MHz`);
var video_bits = Math.ceil(
	Math.log2(Math.sqrt(fromdb(minimal_snr_in_db) / 3))
);
var video_bitrate = video_bits * min_sample_frequency;
console.log(`1.b) ${video_bits} bits`);
console.log(`1.b) ${video_bitrate / mega} Mbit/s`);

var max = Math.pow(2, video_bits);
var average_snr = fromdb(average_snr_in_db);
var error_probability = 
(max*max - average_snr) /
(4* (max*max - 1) * average_snr); 

console.log(`1.c) ${error_probability / Math.pow(10, -7)} 10^-7 `);

var max_possible_snr = 
(3 * max * max) /
(1 + (4 * error_probability_given * max * max));

console.log(`1.d) ${todb(max_possible_snr)} dB`);

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
*/
var x = 4 * new_max_snr * error_probability_given * (1/3);
var new_video_bits = Math.ceil(Math.log2(Math.sqrt(
	(x - new_max_snr / 3) /
	(x - 1)
)));

console.log(`1.d) ${new_video_bits} bits`);

console.log('');
var signal_frequency = signal_frequency_in_khz * kilo;
var sample_frequency = nyquist_times * 2 * signal_frequency;
var delta = peak_peak_voltage * Math.PI * 
(signal_frequency / sample_frequency);

console.log(`2.a) ${delta/milli} mV`);

var granular_noise = (delta * delta) / (3 * sample_frequency);
console.log(`2.b) ${todb(granular_noise)} dB V^2 / Hz`);

// Corrected :)
var snr = 
	(3 * Math.pow(sample_frequency, 3)) /
	(8 * Math.pow(Math.PI * signal_frequency,2) * receiver_bandwith_in_khz * kilo);

console.log(`2.c) ${todb(snr)} dB`);