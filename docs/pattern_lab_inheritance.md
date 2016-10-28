# A word on twig template inheritance

- `include`: Dump the contents of that template into this one.
- `extends`: Take the old template and allow me to override blocks defined in the other template - I don't get to redefine everything and I don't get to define new blocks - I just get to suppress the old block definition and redefine it (and then I can dump the parent template's block definition into my definition if I use` {{ parent() }}` – kinda like doing an include just of that one block from the parent template's definition into your child template definition
- `embed`: Include but then override blocks from that include (super useful for layouts).

Here is a set of examples that illustrate the point:

## foo.html.twig

```twig
{% block header %}
  <h1>This is the Title of Foo</h1>
{% endblock %}
{% block section }
  <section>
    Here is some stuff from Foo.
    ...
  </section>
{% endblock %}
```

Produces:
```html
<h1>This is the Title of Foo</h1>
<section>
  Here is some stuff from Foo.
  ...
</section>
```

## bar.html.twig

```twig
{% extends "foo.html.twig" %}

{% block header %}
  <h2>This is Bar's Title</h2>
{% endblock %}
```

Produces:
```html
<h2>This is Bar's Title</h2>
<section>
  Here is some stuff from Foo.
  ...
</section>
```

## baz.html.twig

```twig
<h1>This is the title from Baz</h1>
<h2>We're adding lots of stuff</h2>
{% embed "bar.html.twig" %}
  {% block header %}
    <h3>This is overriding the h2 from Bar and redefining it here in Baz!</h3>
  {% endblock %}
{% endembed %}
<p>And let's just tack on some stuff at the bottom. Just for fun!</p>
```

Produces:
```html
<h1>This is the title from Baz</h1>
<h2>We're adding lots of stuff</h2>
<h3>This is overriding the h2 from Bar and redefining it here in Baz!</h3>
<section>
  Here is some stuff from Foo.
  ...
</section>
<p>And let's just tack on some stuff at the bottom. Just for fun!</p>
```
