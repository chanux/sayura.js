Sayura.js
=========

*Javascript implementation of Sayura transliteration scheme*

With sayura.js you can have the ease of [sayura](http://www.sayura.net/im/) sinhala phonetic input method's awesomeness pretty much anywhere.

Annoyances (I'd hopefully fix)
----------
* The web is full of `contenteditable` fields. Sayura doesn't work on those.
* You can't go back to a place in text and edit there.
* If you type fast enough sayurajs will fall behind. 

How to use?
----------
1. Add sayura to your page.
2. That's it. But if you need a step 2, 'click on a input, textarea field'.

To disable/enable sayura just call `sayura.toggle()` in event of your liking.
Check index.html for an example.

Bookmarklet
-----------
The bookmarklet allows you to make any input or textarea field sayura enabled.
Also you can enable/disable sayura anytime with `ctrl+x` key combo.
Find the bookmarklet on demo page.

Demo
-----
You can see Sayura.js in action [here](http://chanux.github.com/sayura.js).

*Thank you [Anuradha](https://twitter.com/the_hobbit) and everyone who worked on Sayura ever.*

Yada yada
---------
I recently installed Ubuntu 12.04 and realized there is no ibus-sayura build for it.
That's not the only reason for writing this. I was working on a 
[transliterator for tripitaka text](https://github.com/chanux/metta-transliterator)
and had plans to port it ot JS too. I thought implementing sayura.js would be a good 
excercise before actually giving it a go. Also sayura.js will be helpful when I'm not
at my fine setup :)

My JS is rusty. I never properly learned the language (hi jQuery!). So the code may look
funny and fugly at places.
