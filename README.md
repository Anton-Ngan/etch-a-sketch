# Etch-a-sketch

This project was part of The Odin Project <a href="https://www.theodinproject.com/lessons/foundations-etch-a-sketch#assignment">Etch-a-Sketch</a>. I ran into 
trouble with centering the div (half-joking about this). I aimed to go for a minimalistic style after examining what others had created. This was a great opportunity
for me to practise my CSS and flexbox skills. 


Live Site

## Problems

### Problem: Opacity

I wanted to add an opacity mode which would decrease the text content area of the divs/squares/cells. However, I found that using the opacity CSS property also 
makes the everything in the div (including the border) to go opaque.

<details>
<summary>**Solution**</summary>

I had to instead resort to using pattern matching on the RGB values (background-color) of the cells. The only property that I was interested in altering was the 
alpha channel. Decreasing the alpha channel value decreases the opacity of just the text content and not the border of the cell. 

</details>


## Credits
* Icons from https://www.svgrepo.com/

## Inspiration
https://gsytnik.github.io/odin-etch-a-sketch/
https://issakass.github.io/odin-etch-a-sketch/
https://danyapac3.github.io/etch-a-sketch/
