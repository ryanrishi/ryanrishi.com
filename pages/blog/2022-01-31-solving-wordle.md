---
title:        Solving Wordle
description:  Wordle has taken the world by storm. Here's a program to solve it efficiently.
image:        /img/Wordle_196_example.png
date:         "2022-01-31T00:00:00Z"
layout:       blog
---

# Reproducing Wordle For Testing
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
        if (word.length() != 5) {
            // skip over words that aren't 5 letters long
            continue;
        }

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

Guessing `about` took 60 guesses since it was at the start of the dictionary, but guessing `zorro` required 15907 guesses because this program has to guess almost every word in the dictionary before finding the solution.

# Iterative Approach
- use feedback from previous guesses

# Importance of a Good Seed
