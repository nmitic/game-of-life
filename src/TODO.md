 ## Does not actually scale for the huge universe (grid) size 
 
The most expensive operation in terms of time complexity is game of life algorithm (function advanceGeneration).
It has linear time complexity, which is not bad however, it iterates over the whole universe and check if organism (cell) should be born, stay alive, stay dead or die. This is the number one thing that should be resolved. 

One way we could do this is by checking only the organism which state actually changed, for that we would need to keep track of the change history, which will greatly reduces time but increase space complexity as we would need to store the state for each generation.

## Race conditionals
If from the UI once the game is run, user can click on run again, or run chaos mode, we would have race conditionals happening. I bypass this by disabling buttons, but users can still break this if they chose to. Considering that there are ways of stopping the game, it should not be hard to do certain checks and clear the timer before running new one.

## Data structure - I might reconsider using has object (hash table) to keep track of the state

Initially I wanted to to use 2d array to keep track of the grid and all of its cell, or how I like to call them organism. However, I do not like working with them, they are not easy to read and I find it hard to understand what it going on. I have also though initially, that for the performance reasons having to iterate once is better then two times. But that did not mattered because in the end the number of iterations stayed the same.

Moving away from hash table (or simple object) to array like structure means that there would be no need for iterating over the object and JS actually does not guarantee order of js keys iteration, and order is important when first creating the universe (grid)

## Unit tests

Nothing to add here, just that they are needed, game of life is all about the pure func, they should be easily tested :)

## UI improvements

It is not responsive, and tbh it is very ugly :)

That aside, I would be using canvas to draw the grid and manipulate organisms states, for such CPU heavy tasks manipulation of DOM can be expensive. Using canvas means browsers can make use of GPU as well.

## For large universes (grids) UI is blocking

As already mentioned, checking for each organism is not performant, but that does not mean we should be blocking the UI while the operation is happening. This can be solved by using web worker to offload the main and the only thread we have :)