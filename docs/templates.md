# Templates

## Base templates and inheritance

It is incredibly easy to succumb to the temptation of copying and pasting templates when you need to make a new one. A better alternative is sticking to a system of inheritance and selective overrides.

When possible, inheriting from a base template is preferable to writing your own. The base templates are built to respond to configuration options available to site builders in the UI (such as the checkbox to display or hide field labels). They also make sure the templates will work with potential changes from modules (via something like a preprocess function).

A base template is the least specific version of an entity template. Examples include:

  - node.html.twig
  - block.html.twig
  - field.html.twig
  - paragraph.html.twig

Any more specific templates should, if possible, inherit from these bases.

## Bear Skin's Twig configuration objects

Many of Bear Skin's base templates have been developed to accept configuration objects as arguments to the `include` or `embed` Twig statements. In these cases, you can pass selective overrides that give you a great deal of control over your output while also maintaining a sane system of inheritance. See each base template for examples of all the available options.

### Example

`field--list.html.twig`

```
{% include 'field.html.twig' with {
  field_wrapper: {
    'element': 'article',
    'classes': ['fancy-list'],
    'attributes': {
      'data-foo': 'bar',
    }
  },
  field_items: {
    'element': 'ul',
    'classes': ['fancy-list__inner'],
  },
  field_item: {
    'element': 'li',
    'classes': ['fancy-list__item'],
  },
} %}
```
