---
title:        Solving Wordle
description:  Wordle has taken the world by storm. Here's a program to solve it efficiently.
image:        /img/Wordle_196_example.png
date:         "2022-01-31T00:00:00Z"
layout:       blog
---

# Recreating Wordle For Testing
Here's a class to hold the result of each letter in the guess
```java
@Getter
@RequiredArgsConstructor
class LetterGuess {
    private @NonNull char letter;
    private boolean isInWord;
    private boolean isInWordAndInCorrectLocation;
}
```

The rules behind the game are straightforward. For each letter in the guess, the following rules apply:
- if the letter is in the correct spot, show a 🟩
- if the letter is in the word but not int he correct spot, show a 🟨
- if the letter is not in the word, show a ⬜️

```java
class Wordle {
  private String answer;

  @Getter
  private boolean solved = false;

  public Wordle(String answer) {
    this.answer = answer;
  }

  public List<LetterGuess> guess(String guess) {
    if (answer.equals(guess)) {
      solved = true;
      return null;
    }

    List<LetterGuess> result = new ArrayList<>();

    for (int i = 0; i < guess.length(); i++) {
      char c = guess.charAt(i);
      LetterGuess letterGuess = new LetterGuess(c);

      if (c == answer.charAt(i)) {
          letterGuess.isInWord = true;
          letterGuess.isInWordAndInCorrectLocation = true;
          letterFrequencies.put(c, letterFrequencies.get(c) - 1);
      } else if (letterFrequencies.getOrDefault(c, 0) > 0) {
          letterGuess.isInWord = true;
          letterFrequencies.put(c, letterFrequencies.get(c) - 1);
      }

      result.add(letterGuess);
    }

    return result;
  }
}
```

We can also create a driver program to try out the game:
```java
public static void main(String[] args) {
  Wordle wordle = new Wordle("price");

  Scanner scanner = new Scanner(System.in);
  while (!wordle.isSolved()) {
    String guess = scanner.nextLine();
    List<LetterGuess> result = wordle.guess(guess);

    System.out.println(result.stream().map(l -> {
      if (l.isInWordAndInCorrectLocation) {
        return "🟩";
      } else if (l.isInWord) {
        return "🟨";
      } else {
        return "⬜️";
      }
    }).collect(Collectors.joining()));
  }
}
```

```
Welcome to Wordle. Enter your guess below.
(1/6) > asdflkjasfdbpojaerb
Guess must be 5 characters long
(1/6) > about
⬜️⬜️⬜️⬜️⬜️
(2/6) > prize
🟩🟩🟩⬜️🟩
```

It won't cover cases like guesses that aren't 5 letters or aren't in the dictionary, but for our purposes, this will get the job done.

Before we start implementing a program to solve this, let's define an interface that each type of solver will implement.
```java
interface Solver {
  /**
   * @param wordle the game
   * @return the answer to the game, or null if the game could not be solved
   */
  String solve(Wordle wordle);
}
```

# Brute Force Approach
A naive approach is to check every single 5-letter word in the dictionary until the game is solved. In order to implement this, I've pulled in a dictionary from [dwyl/english-words](https://github.com/dwyl/english-words/blob/master/words_alpha.txt).

```java
class BruteForceSolver implements Solver {
  private Set<String> dictionary = new TreeSet<>();

  public BruteForceSolver() {
    // load the dictionary
  try (InputStream is = BruteForceSolver.class.getResourceAsStream("/words_alpha.txt")) {
    if (is == null) {
      throw new RuntimeException("Could not load file");
    }

    Scanner scanner = new Scanner(is);
    while (scanner.hasNext()) {
      String word = scanner.next();
        if (word.length() != 5) {
          // skip over words that aren't 5 letters long
          continue;
        }

        dictionary.add(word);
      }
    } catch (IOException ioe) {
      ioe.printStackTrace();
      throw new RuntimeException("Error loading dictionary");
    }
  }

  @Override
  String solve(Wordle wordle) {
    for (String word : dictionary) {
        wordle.guess(word);

        if (wordle.isSolved()) {
            return word;
        }
    }

    // couldn't solve the game
    return null;
  }
}
```

Let's test it out.
```java
@Test
void testBruteForce_about() {
  String answer = "about";
  Wordle wordle = new Wordle(answer);
  Solver solver = new BruteForceSolver();
  assertEquals(answer, solver.solve(wordle));
  System.out.println("brute force: " + wordle.getNumGuesses());
}

@Test
void testBruteForce_zorro() {
  String answer = "zorro";
  Wordle wordle = new Wordle(answer);
  Solver solver = new BruteForceSolver();
  assertEquals(answer, solver.solve(wordle));
  System.out.println("brute force: " + wordle.getNumGuesses());
}
```

Guessing `about` took 60 guesses since it was at the start of the dictionary, but guessing `zorro` required 15,907 guesses because this program has to guess almost every word in the dictionary before finding the solution.


# Iterative Approach
We can leverage the result from each guess in order to inform our future guesses.

Thinking back to the rules of the game, we can improve our solution by doing the following:
- If the letter is in the word and and in the correct location (🟩), filter out any words that don't have that letter in that location
- If the letter is in the word but _not_ in the correct location (🟨), filter out any words that don't have that letter in the word
- If the letter is not in the word (⬜️), filter out any words that _do_ have that letter

Let's put this into code.
```java
class IterativeSolver implements Solver {
  @Override
  String solve(Wordle wordle) {
    Set<Character> lettersNotInSolution = new HashSet<>();
    List<Character> lettersInSolution = new ArrayList<>();

    while (!wordle.isSolved && !futureGuesses.isEmpty()) {
      String guess = futureGuesses.iterator().next();
      futureGuesses.remove(guess);

      List<LetterGuess> result = wordle.guess(guess);

      if (wordle.isSolved()) {
          return guess;
      }

      for (int i = 0; i < 5; i++) {
        LetterGuess letter = result.get(i);
        final int finalI = i;

        if (letter.isInWordAndInCorrectLocation) {
          // 🟩
          lettersInSolution.add(letter.letter);
          futureGuesses.removeIf(word -> word.charAt(finalI) != letter.letter);
        } else if (letter.isInWord) {
          // 🟨
          lettersInSolution.add(letter.letter);
          futureGuesses.removeIf(word -> word.charAt(finalI) == letter.letter); // since this letter is in the wrong spot
        } else {
          // ⬜️
          if (!lettersInSolution.contains(letter.letter)) {
            lettersNotInSolution.add(letter.letter);
          }
        }
      }

      if (!lettersInSolution.isEmpty() || !lettersNotInSolution.isEmpty()) {
        futureGuesses.removeIf(word -> {
          Set<Character> lettersInWord = word.chars().mapToObj(i -> (char) i).collect(Collectors.toSet());

          if (lettersInWord.parallelStream().anyMatch(lettersNotInSolution::contains)) {
            return true;
          }

          if (!lettersInWord.containsAll(lettersInSolution)) {
            return true;
          }

          return false;
        });
      }
    }

    // couldn't solve the game
    return null;
  }
}
```

This approach is definitely an improvement from the brute force approach, but there's still an issue&mdash; for some words, like `_ight`, it will still guess in dictionary order. If the solution is `tight`, this will guess the following words after determing the answer ends in `ight`:
- `bight` (a bend in the coast or a loop in a rope)
- `dight` (archaic, past tense of dress?)
- `eight`
- `fight`
- `hight` (archaic, named)
- `light`
- `might`
- `night`
- `pight` (archaic, past tense of pitch)
- `right`
- `sight`
- `tight`

Some of those are reasonable guesses (`light` was the answer to Wordle #226), but it will still take at least 11 guesses to reach "tight" after determing that the answer looks like `_ight`.

# Iterative Approach Using Word Frequency
We can improve on the above solution by guessing more common words first. Peter Norvig, the Director of Research at Google, has compiled a [list](http://norvig.com/ngrams/) of the most common ~300,000 words in English. We can use this list in order to guess more common words prior to guessing obscure, archaic words.

Here is what the beginning of the list looks like:
```
the	23135851162
of	13151942776
and	12997637966
to	12136980858
a	9081174698
in	8469404971
for	5933321709
is	4705743816
on	3750423199
that	3400031103
```


# Elimination Approach
There's another approach that I haven't coded but have thought about. Some people use their second guess to guess a word that has none of the same characters as their first guess in order to get a better sense of what letters are in the answer. If the answer is "about" and their first guess is "tough" (⬜️🟨🟨⬜️⬜️), they would ignore the fact that there's an `ou` in the answer and instead guess something like "races" in order to see if there are common letters like `r` or `s` in the answer.

I'm curious how this approach stacks up against an iterative approach. [Reach out to me](https://twitter.com/ryanrishi) if you or someone else ends up writing a program that uses this approach.

# Importance of a Good Seed
