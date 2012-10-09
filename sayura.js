var buffer = [];
var mark = -1;

consonents = {
// key : [character, mahaprana, sanyaka]
    z : [0xda4, 0x00, 0x00],
	Z : [0xda5, 0x00, 0x00],
	w : [0xdca, 0x00, 0x00],
	W : [0x200c, 0x00, 0x00],
	r : [0xdbb, 0x00, 0x00],
	R : [0xdbb, 0x00, 0x00],
	t : [0xdad, 0xdae, 0x00],
	T : [0xda7, 0xda8, 0x00],
	y : [0xdba, 0x00, 0x00],
	Y : [0xdba, 0x00, 0x00],
	p : [0xdb4, 0xdb5, 0x00],
	P : [0xdb5, 0xdb5, 0x00],
	s : [0xdc3, 0xdc2, 0x00],
	S : [0xdc1, 0xdc2, 0x00],
	d : [0xdaf, 0xdb0, 0xdb3],
	D : [0xda9, 0xdaa, 0xdac],
	f : [0xdc6, 0x00, 0x00],
	F : [0xdc6, 0x00, 0x00],
	g : [0xd9c, 0xd9d, 0xd9f],
	G : [0xd9f, 0xd9d, 0x00],
	h : [0xdc4, 0xd83, 0x00],
	H : [0xdc4, 0x00, 0x00],
	j : [0xda2, 0xda3, 0xda6],
	J : [0xda3, 0xda3, 0xda6],
	k : [0xd9a, 0xd9b, 0x00],
	K : [0xd9b, 0xd9b, 0x00],
	l : [0xdbd, 0x00, 0x00],
	L : [0xdc5, 0x00, 0x00],
	x : [0xd82, 0x00, 0x00],
	X : [0xd9e, 0x00, 0x00],
	c : [0xda0, 0xda1, 0x00],
	C : [0xda1, 0xda1, 0x00],
	v : [0xdc0, 0x00, 0x00],
	V : [0xdc0, 0x00, 0x00],
	b : [0xdb6, 0xdb7, 0xdb9],
	B : [0xdb7, 0xdb7, 0xdb9],
	n : [0xdb1, 0x00, 0xd82],
	N : [0xdab, 0x00, 0xd9e],
	m : [0xdb8, 0x00, 0x00],
	M : [0xdb9, 0x00, 0x00]
}

vowels = {
// key : [single0, double0, single1, double1]
    a : [0xd85, 0xd86, 0xdcf, 0xdcf],
	A : [0xd87, 0xd88, 0xdd0, 0xdd1],
	q : [0xd87, 0xd88, 0xdd0, 0xdd1],
	e : [0xd91, 0xd92, 0xdd9, 0xdda],
	E : [0xd91, 0xd92, 0xdd9, 0xdda],
	i : [0xd89, 0xd8a, 0xdd2, 0xdd3],
	I : [0xd93, 0x00, 0xddb, 0xddb],
	o : [0xd94, 0xd95, 0xddc, 0xddd],
	O : [0xd96, 0x00, 0xdde, 0xddf],
	u : [0xd8b, 0xd8c, 0xdd4, 0xdd6],
	U : [0xd8d, 0xd8e, 0xdd8, 0xdf2],
	Z : [0xd8f, 0xd90, 0xd8f, 0xd90]
}

function isAlphabetical(charCode)
{
    if (charCode >= 65 && charCode <= 90){
        return true
    } else if (charCode >= 97 && charCode <= 122) {
        return true
    } else if (charCode >= 128 && charCode <= 254) {
        return true
    } else {
        return false
    }
}

function isVowel(chr)
{
    /* A E I O U Z
       a e i o u q */
    var vowelCodes = ["65", "69", "73", "79", "85", "90",
                       "97", "101", "105", "111", "117", "113"]; 
    for(var i=0;i<vowelCodes.length;i++){
        if(vowelCodes[i]==chr){return true};
    }
    return false;
}

function isConsonent(chr)
{
    if (isAlphabetical(chr) && ! isVowel(chr)){return true;}
    return false;
}

function specialKeys(e)
{
    if (!e) var e = window.event; //for IE
    var outputDiv = document.getElementById('sayuraOutput');
    if (e.which == 8){
        var textNode = outputDiv.lastChild;
        if (textNode != null) outputDiv.removeChild(textNode);
        buffer.pop();
        if (mark != -1) mark--;
        return;
    }
}

function sayura(e)
{
    if (!e) var e = window.event; //for IE
    var outputDiv = document.getElementById('sayuraOutput'); 
    var value = e.charCode;

    if (isAlphabetical(value)) {
        var chr = String.fromCharCode(value);
        buffer.push(value);
        mark++;
        var newContent = document.createElement('div');

        if(isVowel(value)){
            if(buffer.length == 0 || !isAlphabetical(buffer[mark-1])){
                newContent.innerHTML = String.fromCharCode(vowels[chr][0]);
            } else if(isConsonent(buffer[mark-1])){
                newContent.innerHTML = String.fromCharCode(vowels[chr][2]);
            } else if(value == buffer[mark-1] && isConsonent(buffer[mark-2])){
                outputDiv.removeChild(outputDiv.lastChild);
                newContent.innerHTML = String.fromCharCode(vowels[chr][3]);
            } else if(value == buffer[mark-1]){
                outputDiv.removeChild(outputDiv.lastChild);
                newContent.innerHTML = String.fromCharCode(vowels[chr][1]);
            }

        } else {
            if(value == 71 && isConsonent(buffer[mark-1])){
                //sanyaka
                outputDiv.removeChild(outputDiv.lastChild);
                prevChar = String.fromCharCode(buffer[mark-1]);
                newContent.innerHTML = String.fromCharCode(consonents[prevChar][2]);
            } else if((value == 72 || value == 102) && isConsonent(buffer[mark-1])){
                //mahaprana
                outputDiv.removeChild(outputDiv.lastChild);
                prevChar = String.fromCharCode(buffer[mark-1]);
                newContent.innerHTML = String.fromCharCode(consonents[prevChar][1]);
            } else if((value == 82 || value == 89) && isConsonent(buffer[mark-1])){
                //add al-kirima, zero width joiner and r/y for rakaransaya/yansaya
                newContent.innerHTML = String.fromCharCode(0xdca, 0x200d, consonents[chr][0]);
            } else if(value == 87 && isConsonent(buffer[mark-1])){
                //zero width joineri, al-kirima for bandi-akuru
                newContent.innerHTML = String.fromCharCode(0x200d, 0xdca);
            } else {
                newContent.innerHTML = String.fromCharCode(consonents[chr][0]);
            }
        }

        while(newContent.firstChild){
            outputDiv.appendChild(newContent.firstChild)
        }
    } else if (e.charCode != 0){
        var newContent = document.createElement('div');
        newContent.innerHTML = String.fromCharCode(value);
        buffer.push(String.fromCharCode(value));
        mark++;

        while(newContent.firstChild){
            outputDiv.appendChild(newContent.firstChild)
        }
    }
}

function load()
{
    var input = document.getElementById("sayuraInput");
    input.addEventListener("keypress", sayura, false);
    input.addEventListener("keydown", specialKeys, false);
}

document.addEventListener("DOMContentLoaded", load, false);
