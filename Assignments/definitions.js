// definitions
global.todb = val => 10 * Math.log10(val);
global.fromdb = val => Math.pow(10, val / 10);

global.kilo = 1000;			// k
global.mega = kilo * kilo;		// M
global.giga = mega * kilo;		// G

global.deci = 0.1; 			// d
global.centi = deci / 10; 		// c
global.milli = centi / 10; 	// m
global.micro = milli / 1000; 	// μ
global.nano = micro / 1000; 	// n
global.pico = nano / 1000; 	// p
global.lightspeed = 3 * Math.pow(10, 8);
global.t0 = 290;
global.k = 1.38 * Math.pow(10, -23); // Blotzman
global.h = 6.63 * Math.pow(10, -34); // Planck

global.fromf = val => (val - 1) * t0;
global.tof = val => val / t0 + 1;