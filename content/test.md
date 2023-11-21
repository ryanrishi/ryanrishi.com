---
title:        test
description:  this is only a test
image:        /img/nope.png
date:         "2021-02-03T00:00:00Z"
tags:
  - test
  - second tag
---

# Headings
# The quick brown fox jumps over the lazy dog
## The quick brown fox jumps over the lazy dog
### The quick brown fox jumps over the lazy dog
#### The quick brown fox jumps over the lazy dog
##### The quick brown fox jumps over the lazy dog
###### The quick brown fox jumps over the lazy dog

# Text Styles
The quick brown fox jumps over the lazy dog

# Code
`The quick brown fox jumps over the lazy dog`

The `quick` brown fox jumps over the `lazy` dog

```shell
$ echo "The quick brown fox jumps over the lazy dog"
$ echo $woof
```

```java
@Annotation
public class HelloWorld {
  private isTrue = false;

  public HelloWorld(String value) {
    super(value);
  }

  String hello() {
    int i = 12345;

    return "hello".split("").stream()
      .collect(Collectors.joining());
  }
}
```

```
Bacon ipsum dolor amet pariatur short ribs culpa shank dolore kevin enim tenderloin sint pork loin meatloaf sirloin buffalo deserunt velit. Magna biltong pork chop porchetta turducken, adipisicing meatball officia doner dolor. Ad pig in et cupim ipsum frankfurter fatback dolore pork loin buffalo sed. Lorem hamburger elit filet mignon prosciutto ham hock corned beef aute burgdoggen jerky dolor ullamco andouille salami pig. Shankle elit pariatur occaecat.
```

# Links
I am a [link](#)

I am a [link with `code`](#)


# Blockquotes
<Blockquote
  name="Foobar Jones"
>
  The quick brown fox jumps over the lazy dog
</Blockquote>

<Blockquote>

  This blockquote has multiple lines.

  See?
</Blockquote>

# Callouts
<Callout type="success">
  This is a success callout
</Callout>

<Callout type="info">
  This is an info callout
</Callout>

<Callout type="warning">
  This is a warning callout
</Callout>

<Callout type="error">
  This is an error callout
</Callout>

# Lists
This is an unordered list:
- item one
- item two
- [This is a link](/)

And this is something after the list

# Branding
### Logo
<div className="flex justify-around">

  <div>

  | <Logo /> |
  | :--: |
  | Logo |

  </div>

  <div className="text-green-600 dark:text-green-200">

  | <span className="text-green-600 dark:text-green-200"><Logo /></span> |
  | :--: |
  | Logo that inherits color |

  </div>

  <div>

  | <Logo width={150} height={80} /> |
  | :--: |
  | Logo w/ custom width

  </div>

</div>

### Favicon
| ![favicon](/img/favicon.ico) |
| :--: |
| favicon |
