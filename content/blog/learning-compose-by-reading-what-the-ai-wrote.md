---
title: "Learning Compose by Reading What the AI Wrote"
description: "Using an AI agent to build my coffee app is teaching me Jetpack Compose, and it surprised me by drawing the charts by hand."
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: /img/supermanzer.jpeg
created_at: 2026-10-03
tags:
  - android
  - compose
  - ai
projects:
  - bean-buddy
draft: true
---

## The app is the textbook

A while back I [wrote about][agents] scaffolding a little Android app with AI to replace the notebooks I track my coffee brewing in. I admitted then that the agent had built a number of things in Jetpack Compose that I didn't quite follow yet. That app has since dropped its workout features and become [BrewBuddy][repo], and I've changed how I work on it. I'm no longer just asking for features. I'm using the code it generates as my Compose textbook.

The routine is simple:

1. Ask for a feature and let the agent build it.
2. Read the code it wrote. All of it, not just the summary.
3. When I hit a chunk I can't explain to myself, ask the AI to explain just that chunk.

The third step is the one that matters. "Explain Compose to me" gets me a tutorial I could have found anywhere. "Explain these four lines" gets me an answer about my app, my data, and a decision that was actually made in my code.

## One chunk at a time

Here is the kind of chunk I mean. This is the top of the line chart that shows how my ratings for a bag of coffee change over time:

```kotlin [RatingLineChart.kt]
var selectedIndex by remember(points) { mutableStateOf<Int?>(null) }
```

One line, and there are three Compose ideas in it. `mutableStateOf` holds a value that Compose watches, so changing it recomposes whatever reads it. `remember` keeps that value alive across recompositions, because a composable is just a function that runs again each time it recomposes, and a plain local variable would be reset on every run. And the `points` passed to `remember` works as a key. When I pick a different coffee bag the list of points changes, the remembered value is thrown away, and the selection goes back to nothing. Without that key the old selection would carry over, and the chart would highlight the third brew of a bag I had never tapped.

I would not have picked that last part up from a tutorial. I picked it up because it was sitting in my own code and I asked why it was there.

Here's another one, from the same file:

```kotlin [RatingLineChart.kt]
Canvas(
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .semantics { contentDescription = description }
        .pointerInput(points) {
            detectTapGestures { tap ->
                val xs = pointXs(points, plotLeft(), size.width - plotRight())
                selectedIndex = xs.indices.minByOrNull { abs(xs[it] - tap.x) }
            }
        }
) {
    // drawLine, drawPath, drawCircle...
}
```

This one taught me how much work a `Modifier` chain does. The size, the description a screen reader announces, and the tap handling are all bolted on from the outside, in order, before any drawing happens. The tap handler doesn't know anything about circles on the screen. It works out where each point sits horizontally, finds the one closest to my finger, and stores its index. Because `selectedIndex` is state, the chart redraws with that point highlighted. Nothing tells the chart to redraw. It just reads a value that changed.

Coming from Vue, that clicked for me. It's the same idea as a `ref`: change the data and the view follows.

## The charts were rolled by hand

When I asked for an Insights tab with a line chart of ratings over time and bar charts of average rating by roaster, I assumed the first step would be picking a charting library. That's what I would have done. On the web I reach for a charting package without thinking about it.

Instead the agent looked at the options and came back with two small files and no new dependency. The line chart is about 165 lines drawn on a Compose `Canvas`. The bar chart surprised me more, because it isn't drawn at all:

```kotlin [RatingBarList.kt]
Box(
    modifier = Modifier
        .fillMaxWidth((item.average.toFloat() / MAX_RATING).coerceIn(0f, 1f))
        .fillMaxHeight()
        .background(
            color = barColor,
            shape = RoundedCornerShape(topEnd = 4.dp, bottomEnd = 4.dp)
        )
)
```

A bar is a box whose width is a fraction of its parent. An average of 4.0 out of 5 fills 80% of the row. That's the whole chart. Because the labels are ordinary `Text` and not pixels painted on a canvas, they scale with the system font size and a screen reader can read them, which is something I'd have had to go check with a library.

Having read it, I think it was the right call for this app. I have a handful of chart types, a fixed 1 to 5 scale, and no need for zooming, panning or animation. A library would have given me a lot of features I don't use, its own styling to fight with to match my theme, and one more thing to keep up to date. And I would have learned the library's API instead of learning Compose.

## Is the AI biased against dependencies?

It did make me wonder, though. Was hand-rolling really the best approach, or does the AI just lean that way?

I can think of a few reasons it might:

- **Writing code is nearly free for it.** For me, 165 lines of chart is an evening, so a library is an obvious trade. For an agent it's a minute. The cost that pushes a human toward a dependency mostly isn't there.
- **It can check its own code more easily than someone else's.** `Canvas`, `Box` and `Modifier` are stable and well documented. A third party library's API changes between versions, and an agent that remembers the old one writes code that doesn't compile.
- **A new dependency is a bigger decision than a new file.** It touches the build, the app size and what I have to maintain. An agent that's being careful will tend to avoid making that choice for me.

None of that is the same as hand-rolling being correct. If I needed candlestick charts, pinch to zoom, or a dozen chart types, drawing them myself would be a mistake and I'd want the agent to tell me so. So the lesson I'm taking is not "never add a library". It's that I should ask the question out loud. Next time I'll ask what libraries it considered and why it passed on them, the same way I'd ask a coworker in a code review.

## What I'm taking from this

Reading generated code is slower than accepting it. That's the point. The app gets built either way, but only one of those leaves me able to change it myself later. And asking about small, specific pieces of code that I already have a reason to care about has taught me more Compose than the tutorials I've started and not finished.

[agents]: /blog/working-with-agents
[repo]: https://github.com/supermanzer/manzer-tracker
