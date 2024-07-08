# franzmuezner.com

my little website, everything in lowercase because ~~i'm lazy~~ it looks good

i'm happy about any recommendations or pull requests

## development

```
git clone https://github.com/jurifm2406/website
cd website
pnpm i
pnpm run dev
```

website should be available at `localhost:5173`

## roadmap

-   [x] migrate `/graph` and `Farbenglitschen` from d3 created dom elements to svelte created dom elements

## caveats

### rendering of "farbenglitschen"

the graph rendering of the "farbenglitschen" section on the cards page is excruciatingly slow when rendering big numbers of cards/players, because svelte has to create a line for every turn of every player. some sort of workaround for faster rendering or (my personal favourite) a real-time rendering from left to right so the waiting time seems shorter would be greatly appreciated!
