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
- if the letter is in the word but not in the correct spot, show a 🟨
- if the letter is not in the word, show a ⬜️

Here's a representation of the game. Each game has an answer and provides a way to guess that answer.
```java
class Wordle {
  public static final int WORD_LENGTH = 5;

  private final String answer;

  @Getter
  private int numGuesses = 0;

  @Getter
  private boolean solved;

  public Wordle(String answer) {
    this.answer = answer.toLowerCase();
  }

  /**
   * Something that shouldn't stop the game, just something wrong with your guess.
   */
  static class BadGuessException extends IllegalArgumentException {
    public BadGuessException(String msg) {
      super(msg);
    }
  }

  public List<LetterGuess> guess(String guess) {
    if (guess.length() != WORD_LENGTH) {
      throw new BadGuessException(String.format("Guess must be %d characters long", WORD_LENGTH));
    }

    guess = guess.toLowerCase();
    ++numGuesses;

    if (answer.equals(guess)) {
      // victory
      solved = true;

      return Collections.emptyList();
    }

    // use a map of letter in answer => number of times this letter occurs in the answer
    Map<Character, Integer> letterFrequencies = getLetterFrequencyMap();
    List<LetterGuess> result = new ArrayList<>();

    // handle letters in correct location first
    for (int i = 0; i < guess.length(); i++) {
      char c = guess.charAt(i);
      LetterGuess letterGuess = new LetterGuess(c);

      if (c == answer.charAt(i)) {
        letterGuess.isInWord = true;
        letterGuess.isInWordAndInCorrectLocation = true;
        letterFrequencies.put(c, letterFrequencies.get(c) - 1);
      }

      result.add(letterGuess);
    }

    for (int i = 0; i < 5; i++) {
      char c = guess.charAt(i);

      if (letterFrequencies.getOrDefault(c, 0) > 0) {
        result.get(i).isInWord = true;
        letterFrequencies.put(c, letterFrequencies.get(c) - 1);
      }
    }

    return result;
  }

  private Map<Character, Integer> getLetterFrequencyMap() {
    Map<Character, Integer> letterFrequencies = new HashMap<>();
    for (char c : answer.toCharArray()) {
      letterFrequencies.putIfAbsent(c, 0);
      letterFrequencies.put(c, letterFrequencies.get(c) + 1);
    }

    return letterFrequencies;
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
  System.out.println("brute force - about: " + wordle.getNumGuesses());
}

@Test
void testBruteForce_zorro() {
  String answer = "zorro";
  Wordle wordle = new Wordle(answer);
  Solver solver = new BruteForceSolver();
  assertEquals(answer, solver.solve(wordle));
  System.out.println("brute force - zorro: " + wordle.getNumGuesses());
}
```
```
brute force - about: 60
brute force - zorro: 15907
```

Guessing `about` took 60 guesses since it was at the start of the dictionary, but guessing `zorro` required 15,907 guesses because this program has to guess almost every word in the dictionary before finding the solution.


# Iterative Approach
To improve, we can leverage the result from each guess in order to inform our future guesses.

Thinking back to the rules of the game, we can improve our solution by doing the following:
- If the letter is in the word and in the correct location (🟩), filter out any words that don't have that letter in that location
- If the letter is in the word but _not_ in the correct location (🟨), filter out any words that don't have that letter in the word
- If the letter is not in the word (⬜️), filter out any words that _do_ have that letter

For example, if the answer is `light` and our first guess is `grout` (🟨⬜️⬜️⬜️🟩), we would do the following:
- Filter out any words that don't end in `t` (🟩). This eliminates words like `horse` and `biker` but keeps words like `blast` and `pleat`
- Filter out any words that don't have a `g` (🟨). This eliminates words like `built` and `bulbs` but keeps words like `egret` and `ought`
- Filter out any words that contain letters that aren't in the solution (⬜️). In this example, eliminate any words that contain a `r`, `o`, or `u`
- Guess the first word in the set of remaining words
- Continue using the result of each guess to filter out future guesses

Let's put this into code.
```java
class IterativeSolver implements Solver {
  @Override
  public String solve(Wordle wordle) {
    Set<String> futureGuesses = new LinkedHashSet<>(seeds);
    futureGuesses.addAll(dictionary);
    Set<Character> lettersNotInSolution = new HashSet<>();
    List<Character> lettersInSolution = new ArrayList<>();

    while (!wordle.isSolved() && !futureGuesses.isEmpty()) {
      String guess = futureGuesses.iterator().next();
      futureGuesses.remove(guess);

      List<LetterGuess> result = wordle.guess(guess);

      if (wordle.isSolved()) {
        return guess;
      }

      Set<Character> lettersInSolutionAndInCorrectLocation = result.stream()
              .filter(LetterGuess::isInWordAndInCorrectLocation)
              .map(lg -> lg.letter)
              .collect(Collectors.toSet());

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

      // if solution is "feeds" and guess is "guess", the first "s" will return ⬜️, but there is still an "s" in the answer and in correct location
      lettersNotInSolution.removeAll(lettersInSolutionAndInCorrectLocation);

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

    // couldn't solve the puzzle
    return null;
  }
}
```

I use a `LinkedHashSet` to store future guesses because it provides predictable iteration order; that is, elements are iterated over in the same order in which they were inserted. `LinkedHashSet` also provides [constant-time performance](https://en.wikipedia.org/wiki/Time_complexity) for `add(element)`, `contains(element)`, and `remove(element)` methods, meaning that those methods will take the same amount of time whether the collection has 10 elements or 10 million elements.

```java
@Test
void test20220127_iterative_goodSeed() {
  String answer = "mount";
  Wordle wordle = new Wordle(answer);
  Solver solver = new IterativeSolver(Collections.singletonList("about"));
  assertEquals(answer, solver.solve(wordle));
  System.out.println("2022-01-27 (iterative, good seed): " + wordle.getNumGuesses());
}

@Test
void test20220127_iterative_badSeed() {
  String answer = "mount";
  Wordle wordle = new Wordle(answer);
  Solver solver = new IterativeSolver(Collections.singletonList("adieu"));
  assertEquals(answer, solver.solve(wordle));
  System.out.println("2022-01-27 (iterative, bad seed): " + wordle.getNumGuesses());
}

@Test
void test20220128_iterative_badSeed() {
  String answer = "perky";
  Wordle wordle = new Wordle(answer);
  Solver solver = new IterativeSolver(Collections.singletonList("about"));
  assertEquals(answer, solver.solve(wordle));
  System.out.println("2022-01-28 (iterative, bad seed): " + wordle.getNumGuesses());
}

@Test
void test20220128_iterative_goodSeed() {
  String answer = "perky";
  Wordle wordle = new Wordle(answer);
  Solver solver = new IterativeSolver(Collections.singletonList("pesky"));
  assertEquals(answer, solver.solve(wordle));
  System.out.println("2022-01-28 (iterative, good seed): " + wordle.getNumGuesses());
}
```
```
2022-01-27 (iterative, good seed): 4
2022-01-27 (iterative, bad seed): 5
2022-01-28 (iterative, good seed): 4
2022-01-28 (iterative, bad seed): 7
```

This approach is an improvement from the brute force approach, but there's still an issue&mdash; it will still guess the words in dictionary order If the solution is `tight`, this will guess the following words in this order after determining the answer ends in `ight`:
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

Here is a test case to demonstrate that worst-case scenario.
```java
@Test
void testTight_iterative_badSeed() {
  String answer = "tight";
  Wordle wordle = new Wordle(answer);
  wordle.setDebug(true);
  Solver solver = new IterativeSolver(Collections.singletonList("bight"));
  assertEquals(answer, solver.solve(wordle));
  System.out.println("tight (iterative, bad seed): " + wordle.getNumGuesses());
}
```

I've added some code to print the guess and result to emphasize the problem with this approach.
```
bight
⬜️🟩🟩🟩🟩
dight
⬜️🟩🟩🟩🟩
eight
⬜️🟩🟩🟩🟩
fight
⬜️🟩🟩🟩🟩
hight
⬜️🟩🟩🟩🟩
light
⬜️🟩🟩🟩🟩
might
⬜️🟩🟩🟩🟩
night
⬜️🟩🟩🟩🟩
pight
⬜️🟩🟩🟩🟩
right
⬜️🟩🟩🟩🟩
sight
⬜️🟩🟩🟩🟩
tight
🟩🟩🟩🟩🟩
tight (iterative, bad seed): 12
```

Some of those are reasonable guesses (`light` was the answer in Wordle #226), but some words in there are archaic words that are unlikely to be a Wordle answer.


# Iterative Approach Using Word Frequency
We can improve on the above solution by guessing more common words first. Peter Norvig, the Director of Research at Google, has compiled a [list](http://norvig.com/ngrams/) of the most common ~300,000 words in English. We can use this list in order to guess more common words prior to guessing obscure, archaic words.

Here is what the beginning of the list looks like:
```
about	1226734006
other	978481319
which	810514085
their	782849411
there	701170205
first	578161543
would	572644147
these	541003982
click	536746424
price	501651226
```

We don't care how often a word occurs, but do care about the order in which each word occurs.

Let's modify our iterative approach to try more common words first.
```java
class IterativeApproachWithWordFrequency implements Solver {
  private Collection<String> seeds = Collections.emptySet();
  private LinkedHashSet<String> futureGuesses = new LinkedHashSet<>();

  public IterativeSolverWithWordFrequency(Collection<String> seeds) {
    futureGuesses.addAll(seeds);
    try (InputStream is = IterativeSolverWithWordFrequency.class.getResourceAsStream("/ngrams_count_1w.txt")) {
      if (is == null) {
        throw new RuntimeException("Could not load file");
      }

      Scanner scanner = new Scanner(is);
      while (scanner.hasNext()) {
        String word = scanner.next().split("\\s+")[0];  // extract just the word from each line
        if (word.length() != 5) {
          continue;
        }

        futureGuesses.add(word);
      }
    }
    catch (IOException ioe) {
      ioe.printStackTrace();
      throw new RuntimeException("Error loading ngrams");
    }
  }

  // `solve` method is same as iterative approach
}
```

Let's test it out.
```java
@Test
void testTight_iterativeFrequency_badSeed() {
  String answer = "tight";
  Wordle wordle = new Wordle(answer);
  wordle.setDebug(true);
  Solver solver = new IterativeSolverWithWordFrequency(Collections.singletonList("bight"));
  assertEquals(answer, solver.solve(wordle));
  System.out.println("tight (iterative + frequency, bad seed): " + wordle.getNumGuesses());
}
```
```
light
⬜️🟩🟩🟩🟩
right
⬜️🟩🟩🟩🟩
night
⬜️🟩🟩🟩🟩
might
⬜️🟩🟩🟩🟩
eight
⬜️🟩🟩🟩🟩
fight
⬜️🟩🟩🟩🟩
tight
🟩🟩🟩🟩🟩
tight (iterative + frequency, bad seed): 7
```

Not bad&mdash; taking word frequency into account, we were able to improve a worst-case scenario by almost 50%. It's not enough to win the game in 6 turns, but it's enough to efficiently beat the game for most words.


# Elimination Approach
There's another approach that I haven't coded but have thought about. Some people use their second guess to guess a word that has none of the same characters as their first guess in order to get a better sense of what letters are in the answer. If the answer is `about` and their first guess is `tough` (⬜️🟨🟨⬜️⬜️), they would ignore the fact that there's an `ou` in the answer and instead guess something like `races` in order to see if there are common letters like `r` or `s` in the answer.

I'm curious how this approach stacks up against an iterative approach. [Reach out to me](https://twitter.com/ryanrishi) if you or someone else ends up writing a program that uses this approach.
