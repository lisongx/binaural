## 在开始前

* 请不要在驾车时阅读本页面
* 请佩戴耳机再开始阅读

## 什么是双耳节拍？

// TODO: 是否需要解释什么是正弦波
当人的两只耳朵分别听到纯音正弦波(左右耳各一个)，且两者频率均低于1500Hz、两者的频率之差小于30Hz时：人会听到双耳节拍（**英语**：Binaural beats）。\[来源请求\]

[var name:"freqL" value:415 /]
[var name:"freqR" value:410 /]
[derived name:"freqBeat" value:`Math.abs(freqL - freqR)`/]

[BinauralBeatOne freqL:freqL freqR:freqR amp:amp/]

例如，当你的**左耳**听到[Dynamic value:freqL min:400 max:430 step:0.1/]Hz、**右耳**听到[Dynamic value:freqR min:400 max:430 step:0.1/]Hz的纯音时，你会觉察到除了上述的两个声音之外的第三个音。这第三个音就是双耳节拍，它不是外界真实的声音，而是一种听幻觉（**英语**：Auditory illusion）。在这个例子里你听到的节拍频率是[Dynamic value:freqBeat/]Hz，这是两者频率[Dynamic value:freqL min:400 max:430/]Hz和[Dynamic value:freqR min:400 max:430/]Hz的差值。

## 它真的是幻听吗？你能证明吗

让我试试，首先让我们试试两个声音通过一个耳朵。

## 和脑波关系blahblah

## 其他章节

## 其他章节2

## 参考文献
