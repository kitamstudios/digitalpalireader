function toMyanmar(input,type) {
	var vowel = [];
	vowel['a'] = "အ";
	vowel['i'] = "ဣ";
	vowel['u'] = "ဥ";
	vowel['ā'] = "အာ";
	vowel['ī'] = "ဤ";
	vowel['ū'] = "ဦ";
	vowel['e'] = "ဧ";
	vowel['o'] = "ဩ";

	var myanr = [];

//	myanr['ā'] = 'ā'; // later
	myanr['i'] = 'ိ';
	myanr['ī'] = 'ီ';
	myanr['u'] = 'ု';
	myanr['ū'] = 'ူ';
	myanr['e'] = 'ေ'; 
//	myanr['o'] = 'ေā'; // later
	myanr['ṃ'] = 'ံ';
	myanr['k'] = 'က';
	myanr['kh'] = 'ခ';
	myanr['g'] = 'ဂ';
	myanr['gh'] = 'ဃ';
	myanr['ṅ'] = 'င';
	myanr['c'] = 'စ';
	myanr['ch'] = 'ဆ';
	myanr['j'] = 'ဇ';
	myanr['jh'] = 'ဈ';
	myanr['ñ'] = 'ဉ';
	myanr['ṭ'] = 'ဋ';
	myanr['ṭh'] = 'ဌ';
	myanr['ḍ'] = 'ဍ';
	myanr['ḍh'] = 'ဎ';
	myanr['ṇ'] = 'ဏ';
	myanr['t'] = 'တ';
	myanr['th'] = 'ထ';
	myanr['d'] = 'ဒ';
	myanr['dh'] = 'ဓ';
	myanr['n'] = 'န';
	myanr['p'] = 'ပ';
	myanr['ph'] = 'ဖ';
	myanr['b'] = 'ဗ';
	myanr['bh'] = 'ဘ';
	myanr['m'] = 'မ';
	myanr['y'] = 'ယ';
	myanr['r'] = 'ရ';
	myanr['l'] = 'လ';
	myanr['ḷ'] = 'ဠ';
	myanr['v'] = 'ဝ';
	myanr['s'] = 'သ';
	myanr['h'] = 'ဟ';
	
	var cons = [];
	
	cons['k'] = 'က';
	cons['g'] = 'ဂ';
	cons['ṅ'] = 'င';
	cons['c'] = 'စ';
	cons['j'] = 'ဇ';
	cons['ñ'] = 'ဉ';
	cons['ṭ'] = 'ဋ';
	cons['ḍ'] = 'ဍ';
	cons['ṇ'] = 'ဏ';
	cons['t'] = 'တ';
	cons['d'] = 'ဒ';
	cons['n'] = 'န';
	cons['p'] = 'ပ';
	cons['b'] = 'ဗ';
	cons['m'] = 'မ';
	cons['y'] = 'ယ';
	cons['r'] = 'ရ';
	cons['l'] = 'လ';
	cons['ḷ'] = 'ဠ';
	cons['v'] = 'ဝ';
	cons['s'] = 'သ';
	cons['h'] = 'ဟ';

	
	var spec = []; // takes special aa
	spec['kh'] = 1;
	spec['g'] = 1;
	spec['dh'] = 1;
	spec['p'] = 1;
	spec['v'] = 1; 
	
	var im, i0, i1, i2, i3
	var output = '';
	var i = 0;

	input = input.replace(/\&quot;/g, '`');

	while (i < input.length) {
		im = input.charAt(i-2);
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		
		if (vowel[i1]) {
			if (i == 0 || i0 == 'a') output += vowel[i1];
			else if (i1 == 'ā') {
				if (spec[i0] || spec[im+i0]) { output += 'ါ'; }
				else { output += 'ာ'; };
			}
			else if (i1 == 'o') {
				if (spec[i0] || spec[im+i0]) { output += 'ေါ'; }
				else { output += 'ော'; };
			}
			else if (i1 != 'a') {
				output += myanr[i1];
			}
			i++;
		}		
		else if (myanr[i1+i2] && i2 == 'h') {		// two character match
			output += myanr[i1+i2];
			i += 2;
			if(cons[i3]) output += '္';
		}					
		else if (myanr[i1] && i1 != 'a') {		// one character match except a
			output += myanr[i1];
			i++;
			if(cons[i2]) output += '္';
		}					
		else if (!myanr[i1]) {
			output += i1;
			i++;				
			if (vowel[i2]) {  // word-beginning vowel marker
				if (vowel[i2+i3]) {
					output += vowel[i2+i3];
					i += 2;	
				}
				else { 
					output += vowel[i2];
					i++;
				}
			}
		}
		else i++;
	}

	// fudges
	
	output = output.replace(/ဉ္ဉ/g, 'ည');
	output = output.replace(/္ယ/g, 'ျ');
	output = output.replace(/္ရ/g, 'ြ');
	output = output.replace(/္ဝ/g, 'ွ');
	output = output.replace(/္ဟ/g, 'ှ');
	output = output.replace(/သ္သ/g, 'ဿ');
	output = output.replace(/င္/g, 'င်္');

	output = output.replace(/\`+/g, '"');
	return output;
}	
	


function todeva(input,type) {
	var vowel = [];
	vowel['a'] = " अ";
	vowel['i'] = " इ";
	vowel['u'] = " उ";
	vowel['ā'] = " आ";
	vowel['ī'] = " ई";
	vowel['ū'] = " ऊ";
	vowel['e'] = " ए";
	vowel['o'] = " ओ";
	
	var devar = [];

	devar['ā'] = 'ा';
	devar['i'] = 'ि';
	devar['ī'] = 'ी';
	devar['u'] = 'ु';
	devar['ū'] = 'ू';
	devar['e'] = 'े';
	devar['o'] = 'ो';
	devar['ṃ'] = 'ं';
	devar['k'] = 'क';
	devar['kh'] = 'ख';
	devar['g'] = 'ग';
	devar['gh'] = 'घ';
	devar['ṅ'] = 'ङ';
	devar['c'] = 'च';
	devar['ch'] = 'छ';
	devar['j'] = 'ज';
	devar['jh'] = 'झ';
	devar['ñ'] = 'ञ';
	devar['ṭ'] = 'ट';
	devar['ṭh'] = 'ठ';
	devar['ḍ'] = 'ड';
	devar['ḍh'] = 'ढ';
	devar['ṇ'] = 'ण';
	devar['t'] = 'त';
	devar['th'] = 'थ';
	devar['d'] = 'द';
	devar['dh'] = 'ध';
	devar['n'] = 'न';
	devar['p'] = 'प';
	devar['ph'] = 'फ';
	devar['b'] = 'ब';
	devar['bh'] = 'भ';
	devar['m'] = 'म';
	devar['y'] = 'य';
	devar['r'] = 'र';
	devar['l'] = 'ल';
	devar['ḷ'] = 'ळ';
	devar['v'] = 'व';
	devar['s'] = 'स';
	devar['h'] = 'ह';
	
	var i0 = '';
	var i1 = '';
	var i2 = '';
	var i3 = '';
	var i4 = '';
	var i5 = '';
	var output = '';
	var cons = 0;
	var i = 0;
	
	input = input.replace(/\&quot;/g, '`');

	while (i < input.length) {
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		i4 = input.charAt(i+3);
		i5 = input.charAt(i+4);
		
		if (i == 0 && vowel[i1]) { // first letter vowel
			output += vowel[i1];
			i += 1;
		}		
		else if (i2 == 'h' && devar[i1+i2]) {		// two character match
			output += devar[i1+i2];
			if (i3 != '' && !vowel[i3] && i2 != 'ṃ') {
				output += '्';
			}
			i += 2;
		}					
		else if (devar[i1]) {	// one character match except a
			output += devar[i1];
			if (i2 != '' && !vowel[i2] && !vowel[i1] && i1 != 'ṃ') {
				output += '्';
			}
			i++;
		}
		else if (i1 != 'a') {
			output += i1;
			i++;
			if(vowel[i2]) {
				output+=vowel[i2];
				i++;
			}
		}
		else i++; // a
	}
	output = output.replace(/\`+/g, '"');
	return output;
}	

function thaiconv(input) {
	var vowel = [];
	vowel['a'] = '1';
	vowel['ā'] = '1';
	vowel['i'] = '1';
	vowel['ī'] = '1';
	vowel['iṃ'] = '1';
	vowel['u'] = '1';
	vowel['ū'] = '1';
	vowel['e'] = '2';
	vowel['o'] = '2';


	var thair = [];
	thair['a'] = 'อ';
	thair['ā'] = 'า';
	thair['i'] = 'ิ';
	thair['ī'] = 'ี';
	thair['iṃ'] = 'ึ';
	thair['u'] = 'ุ';
	thair['ū'] = 'ู';
	thair['e'] = 'เ';
	thair['o'] = 'โ';
	thair['ṃ'] = 'ํ';
	thair['k'] = 'ก';
	thair['kh'] = 'ข';
	thair['g'] = 'ค';
	thair['gh'] = 'ฆ';
	thair['ṅ'] = 'ง';
	thair['c'] = 'จ';
	thair['ch'] = 'ฉ';
	thair['j'] = 'ช';
	thair['jh'] = 'ฌ';
	thair['ñ'] = 'ญ';
	thair['ṭ'] = 'ฏ';
	thair['ṭh'] = 'ฐ';
	thair['ḍ'] = 'ฑ';
	thair['ḍh'] = 'ฒ';
	thair['ṇ'] = 'ณ';
	thair['t'] = 'ต';
	thair['th'] = 'ถ';
	thair['d'] = 'ท';
	thair['dh'] = 'ธ';
	thair['n'] = 'น';
	thair['p'] = 'ป';
	thair['ph'] = 'ผ';
	thair['b'] = 'พ';
	thair['bh'] = 'ภ';
	thair['m'] = 'ม';
	thair['y'] = 'ย';
	thair['r'] = 'ร';
	thair['l'] = 'ล';
	thair['ḷ'] = 'ล';
	thair['v'] = 'ว';
	thair['s'] = 'ส';
	thair['h'] = 'ห';

	var i0 = '';
	var i1 = '';
	var i2 = '';
	var i3 = '';
	var i4 = '';
	var i5 = '';
	var output = '';
	var cons = 0;
	var i = 0;
	
	input = input.replace(/\&quot;/g, '`');

	while (i < input.length) {
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		i4 = input.charAt(i+3);
		i5 = input.charAt(i+4);
		
		if (vowel[i1]) {
			cons = 0;
			if (i1 == 'o' || i1 == 'e') {
				output += thair[i1] + thair['a'];
				i++;
			}
			else {
				if (i == 0 || i0 == 'a') {
					output += thair['a'];
					if (i1 != 'a') { output += thair[i1]; }
				}	
				else if (i1 == 'i' && i2 == 'ṃ') { // special i.m character
					output += thair[i1+i2];
					i++;				
				}
				else if (i1 != 'a') { output += thair[i1]; }
				i++;
			}
		}		
		else if (thair[i1+i2] && i2 == 'h') {		// two character match
			cons++;
			if (i2 == 'm') cons = 0 // exception for .m
			if (cons > 1) output += 'ฺ';
			if (i3 == 'o' || i3 == 'e') {
				output += thair[i3];
				i++;
				cons = 0;
			}	
			output += thair[i1+i2];
			i = i + 2;
		}					
		else if (thair[i1] && i1 != 'a') {		// one character match except a
			cons++;
			if (cons > 1) output += 'ฺ';
			if (i2 == 'o' || i2 == 'e') {
				output += thair[i2];
				i++;
				cons = 0;
			}	
			output += thair[i1];
			i++;
		}					
		else if (!thair[i1]) {
			cons = 0;
			output += i1;
			i++;				
			if (i2 == 'o' || i2 == 'e') {  // long vowel first
				output += thair[i2];
				i++;
				cons = 0;
			}
			if (vowel[i2]) {  // word-beginning vowel marker
				output += thair['a']; 
			}
		}
		else { // a
			cons = 0;
			i++;
		}
	}
	output = output.replace(/\`+/g, '"');
	return output;
}	

var script = 0;	


function changeScript() {
	script = document.form.translits.selectedIndex;
	setMiscPref('script',script);
	changenikaya();
}

function translit(data) {
	switch (script) {
		case 0:
			output = data;
		break;
		case 1:
			output = thaiconv(data.toLowerCase());
		break;
		case 2:
			output = todeva(data.toLowerCase());
		break;
		case 3:
			output = toMyanmar(data.toLowerCase());
		break;
	}
	return output;
}